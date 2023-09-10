import { useLoaderData } from "react-router-dom";

import Folder from "/src/components/Folder";

const FolderList = () => {
  const {foldersData, bookmarksData} = useLoaderData() || {};
  console.log(foldersData);
  const folders = [
    {
      id: 1,
      folderName: "backend-folder",
      folderCaption: "folder1Caption",
      folderRegDate: "2021-09-01",
    },
    {
      id: 2,
      folderName: "nginx-folder",
      folderCaption: "folder2Caption",
      folderRegDate: "2021-09-02",
    },
  ];

  return (
    <>
      {folders.length > 0 && (
        <ul>
          {folders.map((folder) => (
            <Folder
              key={folder.id}
              id={folder.id}
              folderName={folder.folderName}
              folderCaption={folder.folderCaption}
              folderRegDate={folder.folderRegDate}
            />
          ))}
        </ul>
      )}
      {folders.length === 0 && bookmarks.length === 0 && (
        <div style={{ textAlign: "center", color: "darkblue" }}>
          <h3>There are no folder or Bookmark yet.</h3>
          <p>start adding some!</p>
        </div>
      )}
    </>
  );
};

export default FolderList;
