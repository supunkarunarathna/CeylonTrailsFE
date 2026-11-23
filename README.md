# Ceylon Trails — Frontend

A React (Vite) frontend for Ceylon Trails, a boutique Sri Lanka travel
website with a custom **"Create Your Own Itinerary"** planner. This project
is the UI only — it talks to the separate `ceylon-trails-backend` Node/Express
API for all data and authentication.

The visual design (deep indigo + terracotta on a warm cream background,
serif display headings) is intentionally different from typical green/gold
Sri Lanka tourism templates.

## Tech stack

- React 18 + Vite
- React Router v6
- Axios (with a JWT auth interceptor)
- Plain CSS with design tokens (no UI framework) — see `src/styles/theme.css`

## Project structure

```
ceylon-trails-frontend/
├── src/
│   ├── api/
│   │   ├── client.js         # Axios instance, attaches JWT, normalizes errors
│   │   └── endpoints.js      # One function per backend endpoint
│   ├── context/
│   │   └── AuthContext.jsx   # Login/register/logout + current user state
│   ├── components/           # Navbar, Footer, cards, ProtectedRoute, etc.
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx / DestinationDetail.jsx
│   │   ├── Tours.jsx / TourDetail.jsx
│   │   ├── Hotels.jsx / HotelDetail.jsx
│   │   ├── About.jsx, Contact.jsx, Gallery.jsx
│   │   ├── Blog.jsx / BlogPost.jsx
│   │   ├── Login.jsx / Register.jsx
│   │   ├── CreateItinerary.jsx   # The 6-step "Create Your Own Itinerary" wizard
│   │   ├── ItineraryResults.jsx  # Shows the 5 matched sample itineraries
│   │   ├── Dashboard.jsx         # Logged-in user's saved itinerary requests
│   │   └── NotFound.jsx
│   ├── styles/
│   │   ├── theme.css          # Design tokens, buttons, forms, cards
│   │   └── layout.css         # Navbar, footer, hero, wizard, results styling
│   ├── App.jsx                 # Route definitions
│   └── main.jsx                 # Entry point
├── index.html
├── vite.config.js
├── .env.example
└── package.json
```

## 1. Prerequisites

- Node.js 18+
- The backend API running (see `ceylon-trails-backend/README.md`) — by
  default expected at `http://localhost:5000/api`

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API, e.g. `http://localhost:5000/api` |

## 4. Run the dev server

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## 5. Build for production

```bash
npm run build
npm run preview   # serve the production build locally to verify it
```

## Feature overview

- **Home** — hero, popular destinations, featured tours, itinerary planner CTA, testimonials
- **Destinations** — filterable by region, with a detail page per destination
- **Tours** — filterable ready-made packages with day-by-day itineraries
- **Hotels** — filterable boutique stays with amenities
- **About / Contact / Gallery / Blog** — supporting content pages; Contact submits to the backend `/api/contact` inquiry endpoint
- **Login / Register** — JWT-based auth; the token is stored in `localStorage` and attached to API requests automatically
- **Create Your Own Itinerary** — a 6-step wizard collecting:
  1. Name
  2. Head count (adults & children)
  3. Whether the traveller holds a valid driving license
  4. Preferred location types (coastal, hill country, traditional — multi-select)
  5. Travel mode (public transport, tuk tuk, car, van)
  6. Budget per person (USD)

  On submit, it posts to `POST /api/itineraries/build` and is taken to
  **Itinerary Results**, which shows the 5 best-matching sample itineraries
  (each with a match score, description, price and an expandable
  day-by-day plan). Works for guests; if logged in, results are saved to
  the user's account and visible later from **My Trips** (`/dashboard`).
- **Dashboard ("My Trips")** — protected route; lists all of the logged-in
  user's past itinerary requests and their matches.

## Notes

- This project was not `npm install`-ed inside the generation sandbox (no
  package registry access there); run `npm install` in your own environment.
  Every source file was verified for syntax with the TypeScript compiler's
  transpiler before delivery.
- Update `CLIENT_URL` in the backend's `.env` to match wherever this
  frontend is served from, so CORS allows requests through.
