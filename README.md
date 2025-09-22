# Image Search App — Next Level (React + Express + MongoDB)

## What you get
- Login & Register (JWT auth)
- Home page with search (Unsplash API), download button, and heart button
- Favorites page (shows images where you clicked heart)
- Downloads page (shows images you've downloaded, tracked per-user)
- Per-user separation using MongoDB
- Clean UI with centered title and nav buttons (Home, Favorites, Downloads)

## Prerequisites
- Node.js 18+
- MongoDB running locally (or Atlas)
- Unsplash API access key (free) — create at https://unsplash.com/developers

---
## 1) Setup the backend (Express)
```bash
cd server
cp .env.example .env
# edit .env and set:
# MONGO_URI=mongodb://localhost:27017/image_search_app
# JWT_SECRET=some-long-random-string
# CLIENT_URL=http://localhost:5173
# UNSPLASH_ACCESS_KEY=your-unsplash-access-key
npm install
npm run dev
```
The server runs on http://localhost:5000 (change PORT in `.env` if needed).

### Routes (summary)
- `POST /auth/register` → { token, user }
- `POST /auth/login` → { token, user }
- `GET /search?q=cat` → { results: [ { imageId, url, thumb, author } ] }
- `GET /favorites` (auth) → { items: [...] }
- `POST /favorites` (auth) → body: { imageId, url, thumb, author, source }
- `DELETE /favorites/:imageId` (auth)
- `GET /downloads` (auth) → { items: [...] }
- `POST /downloads` (auth) → upserts + increments count

> Note: The download button triggers a browser download using the image's URL **and** calls `/downloads` to track it.
> Some providers require special download endpoints; for basic usage Unsplash full URL works.

---
## 2) Setup the frontend (React + Vite)
```bash
cd client
cp .env.example .env
# by default VITE_API_BASE=http://localhost:5000
npm install
npm run dev
```
Visit the app at http://localhost:5173

### Pages
- **Login / Register** → creates token, stored in localStorage
- **Home** → top-center title, nav buttons below, search bar, results grid with heart + download
- **Favorites** → shows saved items, can remove with heart
- **Downloads** → shows previously downloaded items

---
## 3) How data is stored
- `users` → `{ name, email, passwordHash }`
- `favorites` → `{ userId, imageId, url, thumb, author, source }` (unique per user+image)
- `downloads` → `{ userId, imageId, url, thumb, author, source, count, lastDownloadedAt }` (upsert & increment)

---
## 4) Switching image provider (optional)
- This build uses **Unsplash**. If your old HTML used Pexels/Pixabay, you can adjust `server/src/routes/search.js` to call that API and map fields to `{ imageId, url, thumb, author }`.

---
## 5) Deploy notes
- Set proper `CLIENT_URL` and CORS in the server.
- Use environment variables for all secrets.
- For production image downloads, consider proxying downloads through your server if the provider requires it, and always follow the provider's API guidelines.

---
## 6) Common issues
- **CORS blocked** → ensure `CLIENT_URL` in `server/.env` matches your frontend URL.
- **Login works but requests fail** → make sure the `Authorization: Bearer <token>` header is present; handled by axios interceptor in the frontend.
- **Search returns empty** → verify `UNSPLASH_ACCESS_KEY` in `server/.env`.
