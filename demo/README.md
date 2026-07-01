# Demo

Short demo media (GIF / video) that shows Bestie in motion — the single most
convincing asset for this project, since the delight is in the animation.

## Recommended: a Goal-celebration GIF

`bestie-goal.gif` — tap **Goal** on the companion screen and capture the full
sequence: Bestie thinks → jumps with confetti + the full-screen "GOAL!" → the
speech bubble types her reaction. ~3–5 seconds is plenty.

Other nice-to-haves: `bestie-idle.gif` (the mascot breathing/blinking) and
`personalities.gif` (switching modes changes her look).

## How to record

1. Open the [live app](https://bestie-world-cup-ai.vercel.app/) in a phone-sized viewport (or on your phone).
2. Record the screen:
   - **macOS:** `Cmd+Shift+5` → Record Selected Portion.
   - **Windows:** Xbox Game Bar (`Win+G`) or the Snipping Tool's record mode.
   - **iPhone/Android:** built-in screen recorder.
3. Convert the clip to a GIF (keep it small — target < 5 MB, ~600px wide):
   - Online: ezgif.com (video → GIF, then optimize).
   - CLI (if you have ffmpeg + gifski): `ffmpeg -i clip.mov -vf "fps=15,scale=600:-1" frames/%03d.png && gifski -o bestie-goal.gif frames/*.png`
4. Save the GIF into this folder.

## Wire it into the README

Add it near the top of the root [`README.md`](../README.md):

```md
![Bestie goal celebration](demo/bestie-goal.gif)
```

> Meanwhile, the README already shows a live-animating mascot via
> [`assets/bestie-hero.svg`](../assets/bestie-hero.svg) (an SVG that animates on GitHub),
> so the front page moves even before a GIF is added.
