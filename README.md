# CASE 11 — No Original

Three-page HTML/CSS web collage (JavaScript only where the interaction needs it).

A future archive unit, **ARU-07**, is given incomplete 1968 London records and asked to reconstruct **Evelyn Vale**, a fictional performance artist / photographer who disappeared. The site is not a detective game. It is about what an archive can index, what a machine can invent, and how a coherent person can still be false.

Live site: [https://luyufan2026.github.io/android-human-patterns/](https://luyufan2026.github.io/android-human-patterns/)

## How to open it locally

From this folder:

```bash
python3 -m http.server 8900
```

Then open [http://127.0.0.1:8900/index.html](http://127.0.0.1:8900/index.html).

No build step. No React. Files are static: `index.html`, `reconstruction.html`, `no-original.html`, `css/style.css`, `js/script.js`.

## What the three pages do

The layout is always **machine (left) / archive (center) / subject (right)**. Clicking a record should move all three: the fragment opens, the machine writes a reading, Evelyn’s model updates.

1. **Build her** (`index.html`) — CSS Grid: three-column board + city strip. Identity starts at 08% / UNKNOWN. Each fragment adds a layer (VISUAL, SELF, INSTITUTION, WITNESS). Medical language and diary/witness language can conflict.
2. **Think about her** (`reconstruction.html`) — CSS Grid: asymmetrical (machine | evidence + combination well | evolving model). Combine 2–3 records. The machine forms a hypothesis, then **revises** it when new evidence arrives (example: ticket + letter = planned departure 72%; add medical → 49% / crisis 31% / unknown 20%). Relationship lines mean belief, not decoration.
3. **Break her apart** (`no-original.html`) — CSS Grid: machine column + three branching paths. The same objects (especially the wet coat) support three Evelyns: patient, missing victim, artist who erased herself. **Compare all** overlays them. End state: reconstruction complete, truth unknown, original unresolved.

## CSS Grid (assignment)

Each page uses a different grid, on purpose:

- Page 1 `.board` — `0.82fr / 1.35fr / 0.88fr` plus a bottom city row
- Page 2 `.board-think` — narrower machine, wide relational center, subject column
- Page 3 `.board-break` — `machine + three equal paths`

Nested grids handle the 4×3 fragment board, the 6-column evidence strip, and the comparison strip.

## JavaScript (only for interaction)

`js/script.js` is one file. The hard part is `reason()` / `drawLines()` on page 2: combinations change hypotheses, confidence, and line states (solid / dashed / conflict / rejected). Page 1 stores the identity model in `sessionStorage` so page 2 can inherit it. The left-hand analysis log types line by line.

## Fonts

Loaded from Google Fonts: **IBM Plex Mono** (machine captions), **Special Elite** (typewriter), **Caveat** (hand notes).

## Media

Evelyn Vale, the hospital file, the police note, and CASE 11 are fictional. No real patient record was used.

**Found (credited on each page footer and in `images/credits.json`):**

- `images/archive/london-street.jpg` — Métneki János dr. / Fortepan, [Old Compton Street](https://commons.wikimedia.org/wiki/File:Old_Compton_Street._Fortepan_85093.jpg), Wikimedia Commons, CC BY-SA 3.0
- `images/archive/tape-recorder.jpg` — [Tape recorder, c. 1960](https://commons.wikimedia.org/wiki/File:Tape_recorder,_c._1960_-_Wisconsin_Historical_Museum_-_DSC03247.JPG), Wikimedia Commons (see file page for license)

**Made for this project (AI-generated stills, Cursor image tools):** ARU-07 profile, Evelyn portrait and crops, contact sheet, diary, medical form, police note, flyer, ticket, room, Thames night reconstruction, evidence objects (coat, letter, map, witnesses, hand). These are not photographs of a real missing person.

## Tools used

| Tool | Where it was used |
| --- | --- |
| **Cursor** (agent in the project folder) | HTML/CSS/JS, layout, interaction, GitHub Pages deploy |
| **Cursor GenerateImage** | Analog stills listed above (unit, portrait, documents, Thames night) |
| **Google Fonts** | IBM Plex Mono, Special Elite, Caveat |
| **GitHub Pages** | Hosting from the `main` branch of this repo |
| **Wikimedia Commons / Fortepan** | Found London street and tape-recorder files |

No other frameworks or copied UI kits.

## Example prompts (AI)

Used in Cursor while building the collage (paraphrased from the working session):

> Redesign the three-page site as a speculative historical archive: a future unit reconstructing a fictional 1968 London artist named Evelyn Vale. Page 1 indexes fragments. Page 2 connects them and must revise hypotheses. Page 3 reuses the same evidence under multiple models.

> Keep aged paper, black-and-white photography, typewriter text. Do not use neon cyberpunk, a robot mascot, or a gamer HUD. The android should exist through its process of reasoning.

> Left = machine cognition, center = archive fragments, right = subject model. Every click must update all three. Identity starts incomplete (about 08%). When medical language contradicts the diary, show CONFLICT DETECTED.

> Generate a graphite analog profile of a reconstruction unit, skull opened, no blue glow. Generate a damaged 1960s print of the Thames at night with St Paul’s.

## File map

```
index.html
reconstruction.html
no-original.html
css/style.css
js/script.js
images/archive/     photographs and documents
images/evidence/    coat, letter, map, witnesses, hand
images/unit/        ARU-07 stills
images/credits.json
```
