var editor = grapesjs.init({
  container: "#gjs2",
  height: "100%",
  fromElement: true,
  assetManager: {
    embedAsBase64: true,
  },
  selectorManager: { componentFirst: true },
  plugins: ["gjs-blocks-basic"],
  layerManager: {
    appendTo: "#layers-container",
  },
  blockManager: {
    appendTo: "#blocks",
  },
  pluginsOpts: {
    "gjs-blocks-basic": { flexGrid: true },
    "grapesjs-preset-webpage": {
      showStylesOnChange: 0,
      modalImportTitle: "Import Template",
      modalImportLabel:
        '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
      modalImportContent: function (editor) {
        return editor.getHtml() + "<style>" + editor.getCss() + "</style>";
      },
      devices: [
        [
          { id: "desktop", name: "Desktop", width: "" },
          { id: "tablet", name: "Tablet", width: "770px", widthMedia: "992px" },
          {
            id: "mobileLandscape",
            name: "Mobile landscape",
            width: "568px",
            widthMedia: "768px",
          },
          {
            id: "mobilePortrait",
            name: "Mobile portrait",
            width: "320px",
            widthMedia: "480px",
          },
        ],
      ],
    },
  },
  styleManager: {
    appendTo: "#style-manager-container",
    sectors: [
      {
        name: "General",
        open: false,
        buildProps: [
          "float",
          "display",
          "position",
          "top",
          "right",
          "left",
          "bottom",
        ],
      },
      {
        name: "Dimension",
        open: false,
        buildProps: [
          "width",
          "height",
          "max-width",
          "min-height",
          "margin",
          "padding",
        ],
      },
      {
        name: "Typography",
        open: false,
        buildProps: [
          "font-family",
          "font-size",
          "font-weight",
          "letter-spacing",
          "color",
          "line-height",
          "text-align",
          "text-shadow",
        ],
      },
      {
        name: "Decorations",
        open: false,
        buildProps: [
          "border-radius-c",
          "background-color",
          "border-radius",
          "border",
          "box-shadow",
          "background",
        ],
      },
      {
        name: "Extra",
        open: false,
        buildProps: ["opacity", "transition", "perspective", "transform"],
        properties: [
          {
            type: "slider",
            property: "opacity",
            defaults: 1,
            step: 0.01,
            max: 1,
            min: 0,
          },
        ],
      },
    ],
  },
  selectorManager: {
    appendTo: "#selectors-container",
  },
  traitManager: {
    appendTo: "#traits-container",
  },
  panels: {
    defaults: [
      {
        id: "layers",
        el: "#layers",
        resizable: {
          tc: 0,
          cr: 1,
          bc: 0,
          keyWidth: "flex-basis",
        },
      },
      {
        id: "styles",
        el: "#style-manager",
        resizable: {
          tc: 0,
          cr: 0,
          cl: 1,
          bc: 0,
          keyWidth: "flex-basis",
        },
      },
      {
        id: "basic-actions",
        el: "#basic-actions",
        buttons: [
          {
            id: "visibility",
            active: true, // Active by default
            command: "sw-visibility", // Built-in command
            className: "fa fa-regular fa-square",
          },
          {
            id: "preview",
            command: "preview",
            context: "preview",
            attributes: { title: "Preview" },
            className: "fa fa-eye", // Font Awesome icon
          },
          {
            id: "fullscreen",
            command: "core:fullscreen",
            context: "fullscreen",
            attributes: { title: "Fullscreen" },
            className: "fa fa-arrows-alt",
          },
          {
            id: "view-code",
            command: {
              run(editor, sender, opts = {}) {
                // Custom logic to view the generated code
                const code = editor.getHtml();
                console.log("Generated Code:", code);
              },
            },
            context: "view-code",
            attributes: { title: "View Code" },
            className: "fa fa-code", // Font Awesome icon for code
          },
          {
            id: "undo",
            attributes: { title: "Undo" },
            className: "fa fa-undo", // Font Awesome icon for undo
            command: {
              run(editor, sender, opts = {}) {
                editor.UndoManager.undo();
              },
            },
          },

          // Add the "Redo" button
          {
            id: "redo",
            attributes: { title: "Redo" },
            className: "fa fa-repeat", // Font Awesome icon for redo
            command: {
              run(editor, sender, opts = {}) {
                editor.UndoManager.redo();
              },
            },
          },
          // ... other buttons ...
        ],
      },
    ],
  },
  commands: {
    preview: {
      run(editor, sender, opts = {}) {
        // Add your custom preview logic here
        console.log("Preview clicked");
      },
    },
    // "view-code": {
    //   run(editor, sender, opts = {}) {
    //     // Add your custom code to view the generated code
    //     const code = editor.getHtml();
    //     console.log("Generated Code:", code);
    //   },
    // },
    showBlocksPanel: {
      run(editor, sender, options = {}) {
        const openBlocksBtn = editor.Panels.getButton("views", "open-blocks");
        openBlocksBtn.set("active", 1);
        editor.trigger("views", "openBlocksPanel", options);
      },
      stop(editor, sender, options = {}) {
        const openBlocksBtn = editor.Panels.getButton("views", "open-blocks");
        openBlocksBtn.set("active", 0);
        editor.View.trigger("stop");
      },
    },
  },
  buttons: [
    {
      id: "show-blocks",
      run: function (editor) {
        editor.execCommand("showBlocksPanel");
      },
      className: "fa fa-plus",
      attributes: { title: "Show Blocks" },
    },
  ],
  canvas: {
    styles: ["/assets/boostrap/bootstrap5-3-2.css"],
    scripts: [
      "/assets/boostrap/bootstrap5-3-2.min.js",
      "/assets/boostrap/bootstrap.bundle.min.js",
    ],
  },
});

// Get the block button element
const blockButton = document.getElementById("block-icon");
const blocks = document.getElementById("blocks");
const blockIcon = document.getElementById("block-icon");

// Function to change the device view
function changeDevice(deviceId) {
  editor.setDevice(deviceId);
}

// Create a dropdown for selecting devices
const container = document.getElementById("basic-actions");
const deviceDropdown = document.createElement("select");
deviceDropdown.classList.add("form-select");
deviceDropdown.classList.add("form-select-sm");
deviceDropdown.classList.add("custom-select");
// Add options to the dropdown based on available devices
editor.Devices.getAll().forEach((device) => {
  const option = document.createElement("option");
  option.value = device.attributes.id;
  option.text = device.attributes.name;
  deviceDropdown.appendChild(option);
});
deviceDropdown.addEventListener("change", function () {
  const selectedDevice = this.value;
  changeDevice(selectedDevice);
});

// Add the dropdown to the page

container.insertBefore(deviceDropdown, container.firstChild);

let isCross = false;

blockButton.addEventListener("click", function () {
  if (blocks.style.display === "none" || blocks.style.display === "") {
    blocks.style.display = "block";
    blocks.animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
      {
        duration: 500,
        easing: "ease-out",
      }
    );
  } else {
    blocks.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
      {
        duration: 500,
        easing: "ease-out",
      }
    );
    setTimeout(() => {
      blocks.style.display = "none";
    }, 500);
  }

  // Toggle between plus and cross sign with smooth rotation
  isCross = !isCross;
  blockIcon.classList.toggle("rotate", isCross);
});

const bm = editor.BlockManager;
const panelManager = editor.Panels;
panelManager.addButton("options", {
  id: "open-info",
  className: "fa fa-question-circle",
  command: function () {
    editor.runCommand("open-info");
  },
  attributes: {
    title: "About",
    "data-tooltip-pos": "bottom",
  },
});

editor.runCommand("sw-visibility");
editor.on("load", function () {
  var $ = grapesjs.$;

  // Add and beautify tooltips
  // [
  //   ["sw-visibility", "Show Borders"],
  //   ["preview", "Preview"],
  //   ["fullscreen", "Fullscreen"],
  //   ["export-template", "Export"],
  //   ["undo", "Undo"],
  //   ["redo", "Redo"],
  //   ["gjs-open-import-webpage", "Import"],
  //   ["canvas-clear", "Clear canvas"],
  // ].forEach(function (item) {
  //   panelManager.getButton("options", item[0]).set("attributes", {
  //     title: item[1],
  //     "data-tooltip-pos": "bottom",
  //   });
  // });
  // [
  //   ["open-sm", "Style Manager"],
  //   ["open-layers", "Layers"],
  //   ["open-blocks", "Blocks"],
  // ].forEach(function (item) {
  //   panelManager.getButton("views", item[0]).set("attributes", {
  //     title: item[1],
  //     "data-tooltip-pos": "bottom",
  //   });
  // });

  editor.on("load", () => {
    editor.BlockManager.render([
      bm.get("column1").set("category", ""),
      bm.get("column2").set("category", ""),
      bm.get("column3").set("category", ""),
      bm.get("text").set("category", ""),
      bm.get("image").set("category", ""),
      bm.get("video").set("category", ""),
    ]);
  });

  // tooltip
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  Blocks(editor);
});
