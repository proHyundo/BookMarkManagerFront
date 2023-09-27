import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import Folder from "/src/components/Folder/Folder";
import styles from "./FolderList.module.css";

const FolderList = () => {
  const { foldersData, bookmarksData } = useLoaderData() || {};
  console.log("foldersData", foldersData);
  return (
    <div className={styles.folderListContainer }>
      {foldersData != null && <Folder item={foldersData} key={foldersData.folderSeq} />}
      {foldersData == null && (
        <div style={{ textAlign: "center", color: "darkblue" }}>
          <h3>There are no folder or Bookmark yet.</h3>
          <p>start adding some!</p>
        </div>
      )}
    </div>
  );
};

export default FolderList;
