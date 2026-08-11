# NutriTrack 飲食紀錄 - App Summary

Daily meal & dining logger with Supabase cloud sync (Google login).

## Overview

| Field | Value |
|-------|-------|
| App name | NutriTrack 飲食紀錄 |
| App ID | `daily-meal-tracker` |
| Entry file | `tools/daily_meal_tracker.html` |
| Dashboard entry | `apps.json` (category: 實用工具, color `emerald`, featured) |
| Live URL | https://codeguy0425.github.io/toolkit/tools/daily_meal_tracker.html |
| Storage | Supabase (Postgres) - no localStorage |
| Language | English UI (Traditional Chinese description) |

---

## Tech Stack

- Single-file static HTML (Vanilla JS, no build tools)
- Tailwind CSS CDN (`https://cdn.tailwindcss.com`)
- Google Fonts: Figtree + DM Sans + Noto Sans TC (+ Roboto Mono for code)
- Font Awesome (icons)
- Chart.js (calorie trend / diet composition charts)
- Supabase JS SDK v2 - **vendored locally** at `tools/lib/supabase.js` (CDN is blocked on the user's network; the UMD build declares a global `var supabase`, so the app names its client instance `supabaseClient`)

---

## Features

- Monthly calendar view with per-day meal dots and totals
- Meal logging: date, type (Breakfast/Lunch/Dinner/Snack), name, source (Home / Restaurant), restaurant, calories, health rating (Healthy / Moderate / Treat), notes
- Daily summary pills: total calories, meal count, dining-out count
- Daily water tracker (glasses per day, out of 8)
- Monthly summary: total meals, restaurant visits, home-cooked %, avg daily calories
- Diet composition chart (dining origin + health rating distribution)
- Daily calorie intake trend chart
- Monthly restaurant & takeout log (searchable)
- JSON backup export / import (settings menu)
- Demo data loader (manual only, from settings menu)
- Reset all meal data (current user only)

---

## Supabase Integration

### Project

- URL: `https://xtpgjavohkefonexjejy.supabase.co`
- Anon (publishable) key: `sb_publishable_15v8eICjPVo_KCOAwUNKAA_wPteXJDJ`
  - Safe to ship in the app (client-side, RLS-protected).
  - **NEVER** put the `service_role` key in the app.

The key / URL constants live in the app at `tools/daily_meal_tracker.html` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).

### Auth

- Google OAuth (PKCE flow) via `supabaseClient.auth.signInWithOAuth()`
- `redirectTo` is overridden to `window.location.origin + window.location.pathname` so sign-in returns to the app URL (works on GitHub Pages)
- Auth state changes trigger `location.reload()` (SIGNED_IN / SIGNED_OUT / TOKEN_REFRESHED)
- Access gate: `#auth-gate` overlay shows a "Sign in with Google" button when logged out; `#user-chip` in the header shows the logged-in email; settings menu shows "Signed in as <email>" + "Sign Out"
- Only email addresses on the RLS allowlist can use the app / touch data

### DB Helpers (in app)

| Function | Purpose |
|----------|---------|
| `dbLoadAll()` | Load all meals + water for current user |
| `dbUpsertMeal(meal)` | Insert/update one meal (`onConflict: 'id'`) |
| `dbBulkUpsertMeals(meals)` | Bulk upsert meals (`onConflict: 'id'`) |
| `dbDeleteMeal(id)` | Delete one meal |
| `dbUpsertWater(date, glasses)` | Upsert water (`onConflict: 'user_id,date'`) |
| `dbClearAll()` | Delete current user's meals + water |

Meal IDs are UUIDs generated client-side by `newUuid()` (`crypto.randomUUID()` with a v4 fallback). Demo seed data uses fixed valid UUIDs so re-seeding is idempotent.

---

## Database Schema

Setup SQL: `docs/supabase_setup.sql` (gitignored - run in Supabase Dashboard → SQL Editor).

### `public.meals`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | default `gen_random_uuid()` |
| `user_id` | uuid NOT NULL | references `auth.users(id)` |
| `date` | date NOT NULL | |
| `type` | text NOT NULL | Breakfast / Lunch / Dinner / Snack |
| `name` | text NOT NULL | |
| `source` | text NOT NULL | default `'Home'` |
| `restaurant` | text | nullable |
| `calories` | int NOT NULL | default 0 |
| `health_rating` | text NOT NULL | default `'Healthy'` |
| `notes` | text | nullable |
| `created_at` | timestamptz | default `now()` |

Indexes: `idx_meals_date`, `idx_meals_user`.

### `public.water`

| Column | Type | Notes |
|--------|------|-------|
| `user_id` | uuid NOT NULL | references `auth.users(id)` |
| `date` | date NOT NULL | |
| `glasses` | int NOT NULL | default 0 |

Composite PK: `(user_id, date)`.

---

## Row Level Security (email allowlist)

Both tables have RLS enabled with a `FOR ALL` policy gated on email allowlist:

```sql
create policy "allow_meals_own" on public.meals
  for all
  using (auth.email() in ('you@gmail.com', 'partner@gmail.com'))
  with check (auth.email() in ('you@gmail.com', 'partner@gmail.com'));

create policy "allow_water_own" on public.water
  for all
  using (auth.email() in ('you@gmail.com', 'partner@gmail.com'))
  with check (auth.email() in ('you@gmail.com', 'partner@gmail.com'));
```

> Update `docs/supabase_setup.sql` with the real allowlisted email(s) and re-run before/after adding users.

---

## Google OAuth (Google Cloud Console)

| Setting | Value |
|---------|-------|
| Authorized JavaScript origins | `https://codeguy0425.github.io` (add `http://localhost:3000` / `http://localhost:5500` for local dev) |
| Authorized redirect URIs | `https://xtpgjavohkefonexjejy.supabase.co/auth/v1/callback` |

### Supabase URL Configuration (Authentication → URL Configuration)

| Setting | Value |
|---------|-------|
| Site URL | `https://codeguy0425.github.io/toolkit/` |
| Redirect URLs | `https://codeguy0425.github.io/toolkit` (+ localhost URLs for local testing) |

---

## Data Flow

1. App loads → `initAuth()` → `supabaseClient.auth.getSession()`
2. If logged in: `dbLoadAll()` fetches meals + water from Supabase (no demo data auto-seed)
3. Meal edits / water changes call the DB helpers immediately (per-operation sync)
4. Settings menu: Load Demo Data (manual), Export / Import JSON backup, Reset All Meal Data, Sign Out

Import behavior: **upsert/merge** by `id` - backup rows overwrite matching IDs; DB rows not in the backup are kept (not a full wipe).

---

## File Structure

```
tools/
├── daily_meal_tracker.html   (NutriTrack app - single file)
└── lib/
    └── supabase.js           (vendored Supabase SDK v2 UMD)
docs/
└── supabase_setup.sql        (DB schema + RLS, gitignored)
```

---

## Related Files

| File | Description |
|------|-------------|
| `tools/daily_meal_tracker.html` | The app itself |
| `tools/lib/supabase.js` | Vendored Supabase SDK (global `var supabase` - do not redeclare) |
| `docs/supabase_setup.sql` | Schema + RLS SQL (gitignored) |
| `apps.json` | Dashboard registration (id `daily-meal-tracker`) |
| `AGENTS.md` | Project conventions |
| `DESIGN.md` | TouchFlow design system |

---

## Deployment

Push to `main` → GitHub Actions "pages build and deployment" auto-deploys to GitHub Pages. The built HTML is served with `Cache-Control: max-age=600` (~10 min browser cache), so hard refresh (Ctrl+Shift+R) when testing after a deploy.
