# Pong WASM + Supabase

Minimal Pong game written in C++ and compiled to WebAssembly with Emscripten. Supabase is used for auth and the leaderboard.

## 1) Prereqs

- Emscripten SDK (emsdk) installed and activated in your shell
- A Supabase project (free tier)

## 2) Supabase setup

1. Create a new Supabase project.
2. In Supabase SQL editor, run `supabase/schema.sql`.
3. For new progress/rating features, run `supabase/migrations/20260228_progress_features.sql`.
4. In Supabase Auth settings, enable Email/Password (default).
5. Copy your project URL and anon key.
6. Optional: use custom auth emails from `supabase/email_templates/` (see `supabase/email_templates/README.md`).

## 3) Configure the frontend

1. Copy `web/config.example.js` to `web/config.js` and fill in:

```js
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

## 4) Build

```bash
./build.sh
```

This produces static files in `dist/`.

## 5) Run locally

You must serve with a local web server:

```bash
python3 -m http.server 8080 --directory dist
```

Open `http://localhost:8080`.

## 6) Deploy on GitHub Pages (free)

1. Create a GitHub repo and push the project.
2. In repo settings, enable GitHub Pages.
3. Choose `Deploy from a branch`.
4. Set the branch to `gh-pages` and folder to `/` (root).
5. Every time you rebuild, commit and push the updated `dist/`.

### Optional auto-deploy (included)

This repo includes `.github/workflows/deploy-pages.yml` which publishes `dist/` to the `gh-pages` branch only when:
- you run it manually from GitHub Actions (`workflow_dispatch`);
- or you push a release tag like `v1.0.0`.

Example release:
```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Pages will give you a free subdomain like `https://username.github.io/repo-name/`.

## Notes

- You can change the UI in `web/` and rebuild.
- Game logic is in `src/main.cpp`.
- JS Supabase integration is in `web/app.js`.
- Controls: A/D for left paddle, Up/Down for right paddle.
- Modes: Vs Neural Net (AI) and Two Players (PVP).
- Leaderboard keeps the best score per user (updates only when you beat your record).
- Weekly seasons: a separate leaderboard is kept per week (Monday start, UTC).
- Season summary: on a new week, players see a short recap of their last-week best.
- FX: bounce ripple waves and victory particle burst.
- Visual polish: parallax background, speed-reactive glow, subtle grain.
- Extra FX: impact flash + neon trail.
- HUD: live mode, speed, and rally counter.
- Match rules: first to 7 points, serve after each goal.
- AI levels: press 1/2/3 in Neural Net mode (easy/normal/hard).
- Scoring: style score scales with speed + rally; leaderboard uses final match score in Ranked only.
- Ranked: fixed AI level (Hard) and score submission.
- Ranked rating: ELO-style rating is stored in `ranked_stats` and shown in the `Рейтинг / Rating / 评级` tab.
- Profile panel: streaks, badges/titles, and daily challenge progress (`player_progress`).
- Match history: latest games with result and rating delta (`match_history`).
- Start flow: sign in or continue as guest (guest progress is not saved). Ranked requires login.
- Pause: Space (desktop) or Pause button (mobile).
- Mobile: on-screen touch controls for both paddles.
- Visual extras: code-rain backdrop, terminal status line, glitch pulse on goals, rank/combos.
- Audio: synth blips on hits, low thump on goals.
- HUD badges: sync/ledger/tx mini status indicators.
- HUD metrics: latency/hash rate/entropy.
- Sound toggle in HUD.
- Achievements: ZERO LATENCY / PERFECT DEFLECT toasts.
- Ambient audio bed reacts to pause/match state.
- Match mods: fast ball / big ball / narrow paddles (apply & restart).
- Themes: Neon / Ghost / Circuit.
- Audio profiles: Soft / Arcade / Techno.
- Start screen: initial match setup (mods/theme/audio) before choosing mode.
# ping-pong-wasm.
# ping-pong-wasm.
# ping-pong-wasm
