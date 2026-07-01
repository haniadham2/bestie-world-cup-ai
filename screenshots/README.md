# Screenshots

Product screenshots used in the root README and docs. **These files are not yet
added** — follow the steps below to capture them from the live app.

## Files the README expects

| Filename | Screen | What to show |
| --- | --- | --- |
| `landing.png` | Landing (`/`) | The hero with the auto-playing demo + "Start Watching" |
| `matches.png` | Match selection (`/matches`) | The two match cards |
| `companion.png` | Companion (`/companion/…`) | Scoreboard + Bestie + a typed reply in the speech bubble |
| `goal.png` | Goal celebration | Bestie mid-jump with confetti / the "GOAL!" moment |

Keep names lowercase; PNG preferred. A **portrait / phone aspect ratio** (~390×844)
looks best since the app is mobile-first.

## How to capture

1. Open the [live app](https://bestie-world-cup-ai.vercel.app/) (or run it locally).
2. Put the browser in a phone-sized viewport:
   - **Chrome/Edge:** DevTools (`Cmd/Ctrl+Option/Shift+I`) → toggle device toolbar (`Cmd/Ctrl+Shift+M`) → pick e.g. iPhone 14.
   - **Or** just capture on your actual phone.
3. Capture each screen:
   - **macOS:** `Cmd+Shift+4` (drag to select), or `Cmd+Shift+5` for options.
   - **Windows:** `Win+Shift+S` (Snip & Sketch).
   - **iPhone:** press Side + Volume Up. **Android:** Power + Volume Down.
4. Save the PNGs into this folder using the names in the table above.

## Wire them into the README

Replace the placeholder cells in the root [`README.md`](../README.md) "Screenshots"
table with real images, e.g.:

```md
| Landing | Companion | Goal celebration |
| :---: | :---: | :---: |
| ![Landing](screenshots/landing.png) | ![Companion](screenshots/companion.png) | ![Goal](screenshots/goal.png) |
```

> Tip: keep each image under ~1–2 MB so the repo stays light. If you'd like, ask
> Claude to wire the images in once they're here.
