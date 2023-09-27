import { Outlet } from "react-router-dom";

import FolderList from "/src/components/FolderList/FolderList";
import BookmarkList from "/src/components/BookmarkList";

import styles from "./Manage.module.css";
import dummyData from "/src/assets/dummydata/Folders.json";

const Manage = () => {
  return (
    <>
      <Outlet />

      <div className={styles.container}>
        <aside className={styles.aside}>
          <FolderList />
          <div className="border-solid border-2">
            설정
          </div>
        </aside>
        <main className={styles.main}>
          <article>
            <BookmarkList />
          </article>
        </main>
      </div>
    </>
  );
};

export default Manage;

export async function loader() {
  // const [foldersResponse, bookmarksResponse] = await Promise.all([
  //   fetch(import.meta.env.VITE_APP_SERVER + "/api/v1/manage/folders"),
  //   fetch(import.meta.env.VITE_APP_SERVER + "/api/v1/manage/bookmarks"),
  // ]);
  // const [foldersData, bookmarskData] = await Promise.all([
  //   foldersResponse.json(),
  //   bookmarksResponse.json(),
  // ]);
  return {
    // foldersData: foldersData.data,
    foldersData: dummyData,
    bookmarksData: null,
    // bookmarksData: bookmarskData.data,
  };
}
