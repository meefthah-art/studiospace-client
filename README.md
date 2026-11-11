# StudioSpace

Peer-to-peer marketplace for creative workspaces: book photo studios, sound stages, podcast rooms, music suites and art workshops by the hour, or host your own.

**Live site:** https://YOUR-VERCEL-URL.vercel.app
**Server repo:** https://github.com/YOUR-USERNAME/studiospace-server

## Features
- Hero slider, featured studios (top 6 from MongoDB), category browsing and a four-step booking guide
- Explore page with search, category and price filters, sorting and pagination
- Studio details with gallery carousel, amenities, host details and reviews
- Booking modal with live price, Pending / Confirmed / Completed / Cancelled status and cancel for pending slots
- Double-booking prevention: overlapping times against Confirmed bookings are rejected with a clear message
- Add, update and delete studios with confirmation modals, plus imgbb photo upload
- Email/password and Google login, JWT in HTTPOnly cookies, and protected private routes that survive reloads
- Light and dark theme toggle, skeleton loaders, empty states and a custom 404 page
- Extras: PDF booking invoice, saved-studios wishlist, host dashboard for confirming bookings

## Tech stack
Next.js 14 (App Router), JavaScript, Tailwind CSS + DaisyUI, BetterAuth (MongoDB adapter), Swiper, Sonner, jsPDF, react-icons. Server: Express, MongoDB, JWT.

## Local setup
1. `git clone <this repo>` and `cd studiospace-client`
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in the values (`INTERNAL_SECRET` must match the server's)
4. Start the server repo first (`npm run dev` on port 5000)
5. `npm run dev` and open http://localhost:3000

## Examiner test credentials
- Email: `examiner@studiospace.com`
- Password: `Examiner123`
(Register this account once on your live site before submitting.)
