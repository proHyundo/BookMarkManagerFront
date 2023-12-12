// libraries import
import { useEffect, useState } from "react";
import { BsFolder } from "react-icons/bs";
import axios from "axios";
// import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// local import
import FolderList from "/src/components/FolderList/FolderList";
import BookmarkList from "/src/components/BookmarkList/BookmarkList";
import RightClickMenu from "/src/components/RightClickMenu/RightClickMenu";
// style import
import styles from "./Manage.module.css";

const Manage = () => {
    const {
        isLoading,
        error,
        data: treeData,
    } = useQuery({
        queryKey: ["foldersAndBookmarksData"],
        // queryFn: () => axios.get(import.meta.env.VITE_APP_SERVER + "/api/v1/manage/folders-bookmarks/tree"),
        queryFn: async () =>
            axios.get(`/dummydata/folders-bookmarks.json`).then((res) => {
                return res.data.data;
            }),
    });

    const [currentFolderSeq, setCurrentFolderSeq] = useState(null);
    const handleCurrentFolderSeq = (folderSeq) => {
        setCurrentFolderSeq(folderSeq);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
    };

    return (
        <div className={styles.container}>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error...😰</div>}
            <aside className={styles.aside}>
                <FolderList treeData={treeData} handleCurrentFolderSeq={handleCurrentFolderSeq} />
                <div className="border-solid border-2">설정</div>
            </aside>

            <main className={styles.main}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center w-">
                        <BsFolder className="text-2xl" />
                        <p className="text-2xl font-bold ml-3">폴더 명</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <form onSubmit={onSubmitHandler} className="flex justify-center">
                            <input
                                type="text"
                                className="w-8/12 p-2 outline-none border bg-slate-100 text-gray-500 rounded-l-lg"
                            />
                            <button type="submit" className="bg-sky-200 rounded-r-lg w-20">
                                검색
                            </button>
                        </form>
                        <button className="border w-20 h-11 rounded-lg bg-sky-200">정렬</button>
                    </div>
                </div>
                <section>
                    <BookmarkList
                        treeData={treeData}
                        handleCurrentFolderSeq={handleCurrentFolderSeq}
                        currentFolderSeq={currentFolderSeq}
                    />
                </section>
            </main>
            <RightClickMenu />
        </div>
    );
};

export default Manage;
