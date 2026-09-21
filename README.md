# CASE 11 — NO ORIGINAL

A three-page speculative historical web collage.

A future android archival system, **ARU-07 (Archive Reconstruction Unit)**, is given a test: reconstruct a coherent human identity from incomplete records. The case it receives is **Evelyn Vale**, a fictional performance artist and photographer who disappears from London in 1968.

The site is not a detective game and not a fan page. It is an artwork about archives: what remains, how fragments get connected, and how a complete story can still be false.

## Pages

1. **Archive** (`index.html`) — What data remains? The unit is confident. More data should mean more truth.
2. **Reconstruction** (`reconstruction.html`) — What happened? The unit builds a night sequence. Witnesses contradict each other. Three hypotheses stay locked.
3. **No Original** (`no-original.html`) — Which version is real? The same evidence is reused under four models. Coherence is not verification.

Evelyn Vale is fictional. Late-1960s London (underground art, analog records, institutions, tube travel) is used as speculative historical context, not as a claim that this person existed.

## Ideas

- archive vs truth
- evidence vs interpretation
- identity vs representation
- probability vs truth
- a coherent reconstruction can still be false

The hidden design logic (not stated as fact on the site): Evelyn’s last work may have been to destroy the consistency of her own archive so that no system could recover a single original.

## Technologies

HTML, CSS Grid (a different grid on each page), JavaScript, GitHub Pages.

No React. No framework.

## AI tools

Cursor and ChatGPT were used for:

- story development
- layout planning
- HTML / CSS / JavaScript assistance
- interaction prototyping
- debugging
- refinement of system text

Example prompts:

> Redesign the three-page site as a speculative historical archive: a future unit reconstructing a fictional 1968 London artist named Evelyn Vale. Page 1 indexes fragments. Page 2 connects them into an unstable night. Page 3 reuses the same evidence under multiple models.

> Do not make a Detroit: Become Human fan page or a generic AI dashboard. Analog past examined by a digital future. Credits must not invent source URLs.

## Media

Found photographs from Wikimedia Commons are credited in each page footer and in `images/credits.json`.

Other stills and documents were AI-generated for this fictional case (identity portraits, ephemera, forms). No real patient’s medical record was used.

## Local preview

```bash
python3 -m http.server 8899
```

Then open `http://127.0.0.1:8899/`.
