import React from "react";

const data = [
  {
    name: "Open All(new tab)",
    cmd: "copy",
    tips: "",
    separate: true,
    disabled: false,
    selectedTag: true,
    extend: [],
  },
  {
    name: "New",
    cmd: "new",
    tips: "",
    separate: false,
    disabled: false,
    selectedTag: false,
    extend: [
      {
        name: "Folder",
        cmd: "folder",
        tips: "",
        separate: true,
        disabled: false,
        selectedTag: false,
        extend: [],
      },
      {
        name: "Bookmark",
        cmd: "bookmark",
        tips: "",
        separate: false,
        disabled: false,
        selectedTag: false,
        extend: [],
      },
    ],
  },
  {
    name: "Rename",
    cmd: "rename",
    tips: "",
    separate: false,
    disabled: true,
    selectedTag: false,
    extend: [],
  },
  {
    name: "Delete",
    cmd: "delete",
    tips: "",
    separate: false,
    disabled: false,
    selectedTag: false,
    extend: [],
  },
];

export default function RightClickMenu() {
  let ctxmRes = {};
  document.addEventListener(
    "contextmenu",
    function (evte) {
      evte.preventDefault();
      ctxmRes = Contextmenu.render(document.getElementById("contextmenu-container"), data, {
        hyphen: ":",
        clickCallback(res) {
          console.log(res);
          Contextmenu.hidden(ctxmRes.$el);
        },
      });
      Contextmenu.show(ctxmRes.$el, {
        left: evte.clientX,
        top: evte.clientY,
      });
    },
    false
  );

  document.addEventListener(
    "click",
    function (evte) {
      Contextmenu.hidden(ctxmRes.$el);
    },
    false
  );
  return <div id="contextmenu-container" style={{ position: "fixed", display: "none" }}></div>;
}
