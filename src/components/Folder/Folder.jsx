// libraries import
import React, { useState } from "react";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import { VscBlank } from "react-icons/vsc";
import { FaFolderTree } from "react-icons/fa6";
// local import
import image from "/src/assets/folder_icon.png";
import moduleName from "module";
// style import
import styles from "./Folder.module.css";

const Folder = ({ item, handleCurrentFolderSeq, depth = 0 }) => {

    const [folded, setFold] = useState(() => (depth === 0 ? true : false));
    const foldIcon = folded ? <BiSolidDownArrow /> : <BiSolidRightArrow />;
    const treefolderIcon = <FaFolderTree />;
    const toggleCollapse = () => {
        setFold((prevValue) => !prevValue);
    };

    const folderClickHandler = () => {
        if (folded === true) {
            toggleCollapse();
        } else {
            toggleCollapse();
        }
        // TODO: call API to get bookmarks in this folder
    };

    const onClickHandlerFolderName = (e) => {
        e.stopPropagation();
        handleCurrentFolderSeq(item.folderSeq);
    };

    if (item) {
        return (
            <>
                <div className={styles.folder} style={{ paddingLeft: depth * 16 }} onClick={folderClickHandler}>
                    {item.folderRootFlag === "y" ? treefolderIcon : foldIcon}
                    <p onClick={onClickHandlerFolderName}>
                        [{depth}]{item.folderName}
                    </p>
                </div>
                <div
                    className={styles.folderChildsContainer}
                    style={folded ? { display: "block" } : { display: "none" }}
                >
                    {item.includedFolders != null &&
                        item.includedFolders.length > 0 &&
                        item.includedFolders.map((child) => (
                            <Folder
                                item={child}
                                key={child.folderSeq}
                                depth={depth + 1}
                                handleCurrentFolderSeq={handleCurrentFolderSeq}
                            />
                        ))}
                </div>
            </>
        );
    } else {
        return (
            <div className={styles.folder} style={{ paddingLeft: depth * 16 }} onClick={folderClickHandler}>
                <VscBlank />[{depth}]{item.folderName}
            </div>
        );
    }
};

export default Folder;
