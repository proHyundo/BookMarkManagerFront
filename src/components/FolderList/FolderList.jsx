// librairies import
import React, { useState, useEffect } from "react";
// import { useLoaderData } from "react-router-dom";
// local import
import Folder from "/src/components/Folder/Folder";
// style import
import styles from "./FolderList.module.css";

const FolderList = ({ treeData, handleCurrentFolderSeq }) => {
    return (
        <div className={styles.folderListContainer}>
            {treeData && (
                <Folder item={treeData} key={treeData.folderSeq} handleCurrentFolderSeq={handleCurrentFolderSeq} />
            )}

            {treeData && treeData.includedBookmarks.length < 1 && items.includedFolders == null && (
                <div style={{ textAlign: "center", color: "darkblue" }}>
                    <h3>There are no folder or Bookmark yet.</h3>
                    <p>start adding some!</p>
                </div>
            )}
        </div>
    );
};

export default FolderList;
