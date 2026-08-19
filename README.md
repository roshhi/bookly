# Bookly

Small app for searching books. Titles come from Open Library, ratings from the Google Books API.

`backend/` is Express. `frontend/` is Next.js. You need both running.

## Backend

```bash
cd backend
npm install
```

Put your Google Books key in `backend/.env`:

```
GOOGLE_BOOKS_API_KEY=your_key_here
```

Start it:

```bash
npx tsx src/index.ts
```

That listens on [http://localhost:3001](http://localhost:3001). Search endpoint is `/api/books?q=...`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Notes

Open Library wants at least 3 characters in the query. Multi-word titles are fine.

The first search can feel slow because we look up a rating for each result.
