
(function (root, factory){    
    if( typeof exports === 'object' && exports ){
        factory( exports )
    }else{         
        const Contextmenu = {}         
        factory( Contextmenu )
        if( typeof define === 'function' && define.amd ){
            define( Contextmenu )
        }else{
            root.Contextmenu = Contextmenu
        }     
    } 
}(this, function ( Contextmenu ){
    'use strict'      

    if( !window ){
        console.error( `Script is only supported to be called in browser.` )
        return
    }
     
    /* version */
    Contextmenu.version = 'v1.0.1'
    /* utils & manger */
    const utils = {}
    const manger = {}
    const config = {
        zIndexBase: 20201994,
        hyphen: ':',
        left: 0,
        top: 0,
        /**
         * the value here is the same as in the style sheet.
         * 
         * .ctxmenu-item-extend { left: calc(container-width - config.extendOffsetLength) }
         * */
        extendOffsetLength: 6
    }
    const hook = {
        clickCallback: new Function
    }

    /**
     * Initialization contextmenu
     * @param {String} containerId ID of the container node
     * @param {Object} data Menu model data
     * */ 
    Contextmenu.render = function(
        containerElement,
        data,
        option = {}
    ){
        /**
         * operation platform detection.
         * 
         * this script can only run on the browser platform.
         * */
        if( !utils.isElement( containerElement ) ){
            utils.debug.error( `The passed in container node parameter must be an element node.` )
            return undefined
        }
        const profile = {
            ...hook,
            ...config,
            ...option
        }
        manger.setContainerHidden( containerElement )
        /**
         * insert html-string to container element.
         * */
        manger.insertHtmlString(
            containerElement, 
            data,
            profile
        )
        /**
         * get BoundingRect of container element.
         * */
        config.rect = manger.getContainerBoundingRect( containerElement )

        /**
         * remove events bound to container node.
         * 
         * prevent duplicate binding events.
         * */
        manger.rmBindEvent( containerElement )        
        /**
         * bind event group.
         * */
        manger.bindEvent(
            containerElement, 
            function( state ){
                const extendElement = this.querySelector( '.ctxmenu-item-extend' )

                if( !extendElement ){
                    return
                }
                if( state === 'show' ){
                    manger.setExtendWrapperShow(extendElement, this)
                }else if( state === 'hide' ){
                    manger.setExtendWrapperHidden(extendElement, this)
                }
            },
            function(){
                const textElement = this.querySelector( `.ctxmenu-item-text` )
                profile.clickCallback({text: textElement.getAttribute( `data-cmd` )})
            }
        )

        /**
         * return an object.
         * 
         * throw out the container node.
         * */  
        return {
            $el: containerElement
        }
    }
    
    Contextmenu.hidden = function(
        containerElement
    ){
        if( !utils.isElement( containerElement ) ){
            return
        }
        manger.setContainerHidden( containerElement )

        /**
         * add a macrotask to clean up the node in the next event-cycle.
         * */
        window.setTimeout(()=>{
            manger.clearContainer( containerElement )
        })
    }


    Contextmenu.show = function(
        containerElement,
        option
    ){
        if( !utils.isElement( containerElement ) ){
            return
        }
        let left = +option.left || config.left
        let top = +option.top || config.top
        const pageViewClientWidth = document.documentElement.clientWidth
        const pageViewClientHeight = document.documentElement.clientHeight

        /**
         * parameter boundary verification.
         * 
         * cannot overflow container from viewport.
         * */
        if( left <= 0 ){
            left = 0
        }
        if( top <= 0 ){
            top = 0
        }
        if( left + config.rect.width >= pageViewClientWidth ){
            left = pageViewClientWidth - config.rect.width
        }
        if( top + config.rect.height >= pageViewClientHeight ){
            top = pageViewClientHeight - config.rect.height
        }
        manger.setContainerPosition(
            containerElement,
            left,
            top
        )
        manger.setContainerShow( containerElement )        
    }



    /**
     * a collection of executive logic.
     * */
    manger.bindEvent = function(
        containerElement,
        hoverHook = new Function,
        clickPointerHook = new Function
    ){
        /**
         * bind mouseover, mouseout event for list element.
         * */
        const ctxmenuItemEl = containerElement.querySelectorAll( `.ctxmenu-item` )      
        Array.from( ctxmenuItemEl ).forEach((item, index)=>{
            item.addEventListener('mouseover', function( evte ){
                if( this.children.length >= 2 ){
                    this.children[0].classList.add( 'ctxmenu-item-content-hover' )
                    hoverHook && hoverHook.call(this, 'show')                                    
                }else{
                    this.children[0].classList.remove( 'ctxmenu-item-content-hover' )
                    hoverHook && hoverHook.call(this, 'hide')
                }
            }, false)
            item.addEventListener('mouseout', function( evte ){
                this.children[0].classList.remove( 'ctxmenu-item-content-hover' )
                hoverHook && hoverHook.call(this, 'hide')
            }, false)
        })

        /**
         * bind mouseover, event for container element.
         * */
        containerElement.addEventListener('mouseover', manger.containerElementMouseoverEvent, false)

        /**
         * bind click for container element.
         * */
        containerElement.addEventListener('click', manger.containerElementClickEvent, false)

        /**
         * bind contextmenu for container element.
         * */
        containerElement.addEventListener('contextmenu', manger.containerElementContextmenuEvent, false)

        /**
         * bind click event for element that has tag class-name.
         * */
        const ctxmenuItemPointer = containerElement.querySelectorAll( `.ctxmenu-item-pointer` )
        Array.from( ctxmenuItemPointer ).forEach((item, index)=>{
            item.addEventListener('click', function( evte ){
                evte.preventDefault()
                if( !this.classList.contains( 'ctxmenu-item-content-disabled' ) ){
                    clickPointerHook && clickPointerHook.call( this )
                }                
            }, false)
        })
    }

    manger.rmBindEvent = function(
        containerElement
    ){
        containerElement.removeEventListener(`mouseover`, manger.containerElementMouseoverEvent)
        containerElement.removeEventListener(`click`, manger.containerElementClickEvent)
        containerElement.removeEventListener(`contextmenu`, manger.containerElementContextmenuEvent)
    }

    manger.insertHtmlString = function(
        containerElement,
        data,
        option
    ){    
        containerElement.innerHTML = `${utils.createContextmenuWrapper(data, option)}`
    }  
    
    manger.setContainerPosition = function(
        containerElement,
        left,
        top
    ){
        containerElement.style.left = `${left}px`
        containerElement.style.top = `${top}px`
    }
    manger.setContainerHidden = function(
        containerElement
    ){
        containerElement.style.display = 'none'
    }
    manger.setContainerShow = function(
        containerElement
    ){
        containerElement.style.display = 'block'
    }
    manger.clearContainer = function(
        containerElement
    ){
        containerElement.innerHTML = ``
    }

    manger.getContainerBoundingRect = function(
        containerElement
    ){
        /**
         * get the coordinate dimensions of the container by forcing the layout to synchronize.
         * */
        containerElement.style.visibility = `hidden`
        containerElement.style.opacity = 0
        containerElement.style.display = `block`
        const rect = containerElement.getBoundingClientRect()
        containerElement.style.display = `none`
        containerElement.style.visibility = `initial`
        containerElement.style.opacity = 1

        return rect
    }

    manger.containerElementClickEvent = function( evte ){
        evte.preventDefault()
        evte.stopPropagation()
    }
    manger.containerElementMouseoverEvent = function( evte ){
        evte.preventDefault()
        evte.stopPropagation()
    }
    manger.containerElementContextmenuEvent = function( evte ){
        evte.preventDefault()
        evte.stopPropagation()
    }

    manger.setExtendWrapperShow = function(
        extendWrapperElement,
        parentElement
    ){
        let left = 0
        let top = 0
        let isSetLeft = false
        let isSetTop = false
        const pageViewClientWidth = document.documentElement.clientWidth
        const pageViewClientHeight = document.documentElement.clientHeight
        const parentRect = parentElement.getBoundingClientRect()

        extendWrapperElement.style.visibility = `hidden`
        extendWrapperElement.style.opacity = 0
        extendWrapperElement.style.display = `block`
        const extendRect = extendWrapperElement.getBoundingClientRect()
        extendWrapperElement.style.display = `none`
        extendWrapperElement.style.visibility = `initial`
        extendWrapperElement.style.opacity = 1

        if( extendRect.left + extendRect.width >= pageViewClientWidth ){
            left = -1 * ( extendRect.width )  
            isSetLeft = true
        }        
        if( extendRect.top + extendRect.height >= pageViewClientHeight ){
            top = -1 * ( extendRect.height - parentRect.height )    
            isSetTop = true
        } 
        if( isSetLeft ){
            extendWrapperElement.style.left = `${left}px`
        }
        if( isSetTop ){
            extendWrapperElement.style.top = `${top}px`
        }
        extendWrapperElement.style.display = `block`
    }
    manger.setExtendWrapperHidden = function(
        extendWrapperElement
    ){
        extendWrapperElement.style.display = `none`
    }


    /**
     * a collection of tools and methods.
     * */
    utils.createContextmenuWrapper = function(
        array = [],
        option = {},
        cmkPrefix = ''
    ){
        let htmlString = `
            <div class="contextmenu-wrapper" style="z-index: ${option.zIndexBase++}"><ul class="ctxmenu-ulist">
        `

        for( let i = 0; i < array.length; i++ ){
            let item = array[i]

            if( item.extend && item.extend.length ){                
                htmlString += `
                    <li class="ctxmenu-item ${item.separate ? 'ctxmenu-item-separate' : ''}" title="${item.name}">
                        <div class="ctxmenu-item-content ${item.disabled ? 'ctxmenu-item-content-disabled' : ''}">
                            <div class="ctxmenu-item-tag"></div>
                            <div class="ctxmenu-item-text" data-cmd="${cmkPrefix ? ( cmkPrefix + option.hyphen + item.cmd ) : item.cmd}">${item.name}</div>
                            <div class="ctxmenu-item-tips">${item.tips}</div>
                        </div>
                        <i class="ctxmenu-item-extend-icon"></i>
                        <div class="ctxmenu-item-extend" style="z-index: ${option.zIndexBase++}; display: none;">
                            ${utils.createContextmenuWrapper(item.extend, option, cmkPrefix ? ( cmkPrefix + option.hyphen + item.cmd ) : item.cmd)}
                        </div>
                    </li>
                `
            }else{
                htmlString += `
                    <li class="ctxmenu-item ${item.separate ? 'ctxmenu-item-separate' : ''}" title="${item.name}">
                        <div class="ctxmenu-item-content ${item.disabled ? 'ctxmenu-item-content-disabled' : ''} ctxmenu-item-pointer">
                            <div class="ctxmenu-item-tag">${item.selectedTag ? '<div class="ctxmenu-item-tag-selected"></div>' : ''}</div>
                            <div class="ctxmenu-item-text" data-cmd="${cmkPrefix ? ( cmkPrefix + option.hyphen + item.cmd ) : item.cmd}">${item.name}</div>
                            <div class="ctxmenu-item-tips">${item.tips}</div>
                        </div>
                    </li>
                `
            }
        }
        htmlString += `</ul></div>`

        return htmlString
    }

    utils.debug = {
        error( e ){
            console.error(  e)
        },
        warn( e ){
            console.warn(  e)
        },
        log( e ){
            console.log(  e)
        }
    }

    utils.isElement = function(
        el
    ){
        return el && el.nodeType === 1
    }
}))
