import React, { useState } from "react";

import image from "/src/assets/folder_icon.png";
import moduleName from "module";
import styles from "./Folder.module.css";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import { VscBlank } from "react-icons/vsc";

const Folder = ({ item, depth = 0 }) => {
  const [folded, setFold] = useState(() =>  depth === 0 ? true : false );
  const foldIcon = folded ? <BiSolidDownArrow /> : <BiSolidRightArrow />;
  const toggleCollapse = () => {
    setFold((prevValue) => !prevValue);
  };

  const folderClickHandler = () => {
    if(folded === true){
      toggleCollapse();
    }else{
      toggleCollapse();
      console.log("folderClickHandler", item.folderSeq);
    }
    // TODO: call API to get bookmarks in this folder
  };



  if (item.childFolderList.length > 0) {
    return (
      <>
        <div
          className={styles.folder}
          style={{ paddingLeft: depth * 16 }}
          onClick={folderClickHandler}
        >
          {foldIcon}
          [{depth}]{item.folderName}
        </div>
        <div className={styles.folderChildsContainer} style={
          folded ? { display: "block" } : { display: "none" }
        }>
          {item.childFolderList.length > 0 &&
            item.childFolderList.map((child) => (
              <Folder item={child} key={child.folderSeq} depth={depth + 1} />
            ))}
        </div>
      </>
    );
  } else {
    return (
      <div
        className={styles.folder}
        style={{ paddingLeft: depth * 16 }}
        onClick={folderClickHandler}
      >
        <VscBlank />
        [{depth}]{item.folderName}
      </div>
    );
  }
};

export default Folder;
