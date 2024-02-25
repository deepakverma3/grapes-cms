const importCode = (editor) => {
  const modal = editor.Modal;
  const cmdm = editor.Commands;
  const codeViewer = editor.CodeManager.getViewer("CodeMirror").clone();
  const container = document.createElement("div");
  const title = document.createElement("div");
  title.innerHTML = "Paste here your HTML/CSS and click Import";
  const btnEdit = document.createElement("button");

  codeViewer.set({
    codeName: "htmlmixed",
    readOnly: 0,
    theme: "hopscotch",
    autoBeautify: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    lineWrapping: true,
    styleActiveLine: true,
    smartIndent: true,
    indentWithTabs: true,
  });

  btnEdit.innerHTML = "Import";
  btnEdit.className = "gjs-btn-prim gjs-btn-import " + "btn-import";
  btnEdit.onclick = function () {
    const code = codeViewer.editor.getValue();
    editor.DomComponents.getWrapper().set("content", "");
    editor.setComponents(code.trim());
    modal.close();
  };

  cmdm.add("html-import", {
    run: function (editor, sender) {
      sender?.set("active", 0);
      let viewer = codeViewer.editor;
      modal.setTitle("Edit code \n Paste here your HTML/CSS and click Import");

      if (!viewer) {
        const txtarea = document.createElement("textarea");
        container.appendChild(txtarea);
        container.appendChild(btnEdit);
        codeViewer.init(txtarea);
        viewer = codeViewer.editor;
      }
      const htmlContent = editor.getHtml();
      modal.setContent("");
      modal.setContent(container);
      codeViewer.setContent(htmlContent);
      modal.open();
      viewer.refresh();
    },
  });
};
