function Blocks(editor) {
  // Add the custom block to GrapesJS
  editor.BlockManager.add("navbar", {
    label: "Navbar",
    category: "Custom Blocks",
    attributes: { class: "fa fa-bars" },
    content: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
     `,
  });

  // Example: Custom Bootstrap Card Block
  editor.BlockManager.add("card", {
    label: "Card",
    category: "Custom Blocks",
    attributes: { class: "fa fa-address-card-o" },
    content: `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Card Title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `,
  });

  editor.BlockManager.add("button", {
    label: "Button",
    media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"></path><path d="M4 11.5h16v1H4z"></path></svg>`,
    category: "Basic",
    content: `
    <button type="button" class="btn btn-primary">Primary</button>
    `,
  });

  // Define additional styles for the block preview
  let style = document.createElement("style");
  style.innerHTML = `
    .navbar-preview {
        background-color: #f8f9fa;
        padding: 15px;
        margin: 10px 0;
    }
`;
  document.head.appendChild(style);
  importCode(editor);
}
