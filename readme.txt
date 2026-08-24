# Maurizio Girlando — Portfolio

A single-page, animation-heavy portfolio site showcasing my skills, projects, and background as a full-stack developer.

**Live site:** *(https://mauriziodev.be/)*
**Stack:** HTML5, CSS3, vanilla JS + jQuery — no build step, no framework

## Features

- 🧩 **Interactive "About" section** — a draggable puzzle-piece animation next to the intro text
- ⭐ **Auto-scrolling skills marquee** — infinite-loop ticker of hard skills, driven by `requestAnimationFrame` for smooth continuous motion
- ☢️ **"Atom" project showcase** — an orbiting, rotating SVG diagram where each arm reveals a project on hover/click
- 🃏 **Flip/expand "Key Strengths" cards** — five clickable cards, each revealing a short description when selected
- 📱 **Responsive navigation** — hamburger menu for mobile, smooth-scroll anchor links to each section
- 🌌 **Custom visuals** — custom favicon set, Font Awesome icons, Google Fonts (Changa One + Roboto)

## Project Structure

```
Projet/
├── index.html            # Single-page site: About, Hard Skills, Projects, Key Strengths, Footer
├── css/
│   └── style.css          # All styling: layout, animations, responsive rules
├── js/
│   ├── main.js              # Entry point — calls all feature functions on document ready
│   ├── functions.js          # Feature implementations (see below)
│   └── jquery-4.0.0.min.js
└── images/
    ├── backgroundStars.avif
    ├── negatif.jpg / positif.jpg
    ├── hearth-puzzle.png
    ├── free-heart-3d-icon-png-download-12283313.webp
    └── favicon/               # Favicon set
```

### `functions.js` breakdown

| Function | Purpose |
|---|---|
| `marquee()` | Drives the infinitely-scrolling hard-skills ticker |
| `magicCard()` / `moveCard()` | Handles the click-to-reveal behavior of the Key Strengths cards |
| `dragPuzzle()` / `randomMovementPuzzle()` / `randomMovement()` | Powers the draggable, randomly-drifting puzzle piece in the About section |
| `atomDrawer()` / `atomProjectCases()` | Renders and animates the orbiting "atom" project selector |
| `hamburgerNav()` | Toggles the mobile navigation menu |
| `isMobile()` | Helper used to adjust behavior (e.g. drag interactions) on mobile |

## Sections

1. **Header / Nav** — sticky nav with links to each section, collapses to a hamburger menu on mobile.
2. **About Me** — short intro with an interactive puzzle-piece visual.
3. **Hard Skills** — scrolling marquee of technologies.
4. **Projects** — orbiting diagram linking out to live projects (currently: **Diogenes** CMS and the **Kanban** board; Mobile Games, 3D Games, AI, and Blender entries are marked "Coming soon").
5. **Key Strengths** — five clickable trait cards.
6. **Footer** — copyright, back-to-top link, LinkedIn and email contact.

## Running Locally

No build step or dependencies required — it's static HTML/CSS/JS.

```bash
# from the project root
python -m http.server 8000
```
Then open `http://localhost:8000`.

Or simply open `index.html` directly in a browser (note: a local server is recommended so relative asset paths and any future fetch/AJAX calls behave the same as in production).

## Deployment

This is a static site — host it anywhere that serves static files (GitHub Pages, Netlify, Vercel, or your own web server). No server-side processing is required for the portfolio itself.

## Notes

- The **Projects** section links to `/projects/kanban/index.php`, which points to a path on the deployed server rather than a relative path — update this if the portfolio is hosted at a different location or domain than the Kanban project.
- Several "Coming soon" project slots (Mobile Games, 3D Games, AI, Blender) are placeholders for future work.
- Contact links (LinkedIn, email) are in the footer.

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/) — Changa One, Roboto
- jQuery 4.0.0

## License

No license specified yet.