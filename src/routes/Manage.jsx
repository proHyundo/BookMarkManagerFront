import { Outlet } from "react-router-dom";

import FolderList from "/src/components/FolderList";
import BookmarkList from "/src/components/BookmarkList";

const Manage = () => {
  return (
    <>
      <Outlet />
      <main>
        <FolderList />
        <BookmarkList />
      </main>
    </>
  );
};

export default Manage;

export async function loader() {
  // const response = await fetch("http://localhost:9090/api/v1/manage/folders");
  // const data = await response.json();
  // return resData.data;

  const [foldersResponse, bookmarksResponse] = await Promise.all([
    fetch("http://localhost:9090/api/v1/manage/folders"),
    fetch("http://localhost:9090/api/v1/manage/bookmarks"),
  ]);
  const [foldersData, bookmarskData] = await Promise.all([
    foldersResponse.json(),
    bookmarksResponse.json(),
  ]);
  return {
    foldersData: foldersData.data,
    bookmarksData: bookmarskData.data,
  };
}
