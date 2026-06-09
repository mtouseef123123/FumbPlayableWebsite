# My Playables Showcase (Improved v2)

A clean and **very easy** way to host your HTML5 playables with automatic QR codes, mobile fullscreen, and desktop testing.

## New Easy Workflow (Recommended)

Adding a new playable is now much simpler:

### Step-by-step to Add a New Playable

1. **Create a folder** inside `playables/` with any name you want  
   Example: `playables/my-awesome-game/`

2. **Create `index.html`** inside that folder and put **only your game content**.

   You can use this minimal template:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>My Game Name</title>
   </head>
   <body style="margin:0; background:#111113; color:white;">

       <!-- ============================================ -->
       <!-- PUT YOUR ENTIRE GAME HERE -->
       <!-- ============================================ -->
       <div id="game-content" style="width:100%; height:100vh;">
           <!-- Your canvas, buttons, UI etc. -->
           <h1 style="text-align:center; padding-top:40px;">My Game Goes Here</h1>
       </div>

       <!-- This line adds the top bar + mobile/desktop logic automatically -->
       <script src="../_shared/playable-wrapper.js"></script>
   </body>
   </html>
   ```

3. **Register it** in the main `index.html` (only place you need to edit for titles):

   Open `index.html` → find the `playables` array and add:

   ```js
   {
       id: "my-awesome-game",           // ← must match folder name
       title: "My Awesome Game",
       desc: "Short description shown on the card",
       icon: "🎮",
       color: "#22c55e",
       category: "Action"
   }
   ```

That's it! The shared wrapper automatically adds:
- Top control bar (Portrait / Landscape / Fullscreen / Close)
- Mobile fullscreen detection
- Desktop phone frame with rotation
- All the smart behavior

---

## Folder Structure

```
my-playables-site/
├── index.html                 ← Main page (edit the array here for titles)
├── playables/
│   ├── _shared/
│   │   └── playable-wrapper.js   ← Shared logic (don't edit)
│   │
│   ├── demo-bitcoin-miner/
│   │   └── index.html            ← Your game file (replace content)
│   │
│   ├── demo-wire-fix/
│   │   └── index.html
│   │
│   └── my-new-playable/          ← Create folders like this
│       └── index.html            ← Put your game here + 1 script line
│
└── README.md
```

## How to Update Title / Description

You only change it in **one place** — the `playables` array inside the main `index.html`.

No need to touch individual playable folders for metadata.

## Running Locally

Use **Live Server** in VS Code (recommended):

1. Right-click `index.html` → **Open with Live Server**
2. Make sure `BASE_URL` at the top of `index.html` matches your Live Server URL:
   ```js
   const BASE_URL = "http://127.0.0.1:5500/";
   ```

## Hosting Online (Best for QR Codes)

Upload the entire folder to:
- Netlify (easiest — just drag & drop)
- GitHub Pages
- Vercel

After uploading, update `BASE_URL` once with your live domain.

---

This new structure makes it very fast to add and update playables. You mostly just replace the `index.html` inside each playable folder with your actual game.

Need help converting one of your existing playables to this new format? Just share the code and I’ll help you set it up cleanly.