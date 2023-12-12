// libraries import
import React, { useState, useEffect } from "react";
// import { useLoaderData } from "react-router-dom";
// local import
// style import
import styles from "./BookmarkList.module.css";

const BookmarkList = ({ treeData, currentFolderSeq }) => {
    const [targetFolder, setTargetFolder] = useState(null);

    useEffect(() => {
        const findFolder = (data, targetSeq) => {
            if (data.folderSeq === targetSeq) {
                return data;
            }
            if (data.includedFolders === null) {
                return null;
            }

            for (let i = 0; i < data.includedFolders.length; i++) {
                let result = findFolder(data.includedFolders[i], targetSeq);
                if (result !== null) {
                    return result;
                }
            }
            return null;
        };

        let targetFolderSeq = treeData && treeData.folderSeq; // default : root folder seq
        if (currentFolderSeq) {
            targetFolderSeq = currentFolderSeq;
        }
        console.log("targetFolderSeq: ", targetFolderSeq);

        const targetFolder = treeData && findFolder(treeData, targetFolderSeq);
        setTargetFolder(targetFolder);
        console.log("targetFolder: ", targetFolder);
        // setFoldersData((prev) => prev == targetFolder);
    }, [treeData, currentFolderSeq]);

    return (
        <section className="flex flex-col p-4">
            <ul>
                {targetFolder &&
                    targetFolder.includedBookmarks.length > 0 &&
                    targetFolder.includedBookmarks.map((item) => (
                        <li className="flex items-center space-x-2 p-2 border-b border-gray-200" key={item.bookmarkSeq}>
                            <h1>{item.folderName}</h1>
                            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                            <div className="flex-grow">
                                <a href={item.bookmarkUrl}>
                                    <h2 className="font-bold text-lg">{item.bookmarkTitle}</h2>
                                </a>

                                <p>{item.bookmarkCaption}</p>
                                <p>Created: {item.bookmarkRegDate}</p>
                                <p>Last Modified: {item.bookmarkModDate}</p>
                            </div>
                            <button className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                            <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                        </li>
                    ))}
            </ul>
        </section>
    );
};

export default BookmarkList;
