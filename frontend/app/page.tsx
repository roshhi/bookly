"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Book = {
  title: string;
  author_name?: string[];
  rating: string | null;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`http://localhost:3001/api/books?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch {
      setBooks([]);
    }
    setLoading(false);
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bookly</h1>
      <p className={styles.subtitle}>Search for books and discover their ratings</p>

      <form onSubmit={search} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <p className={styles.status}>Fetching books...</p>}

      {!loading && searched && books.length === 0 && (
        <p className={styles.status}>No books found.</p>
      )}

      {books.length > 0 && (
        <ul className={styles.list}>
          {books.map((book, i) => (
            <li key={i} className={styles.card}>
              <div>
                <h2 className={styles.bookTitle}>{book.title}</h2>
                <p className={styles.author}>
                  {book.author_name?.[0] || "Unknown author"}
                </p>
              </div>
              <span className={styles.rating}>
                {book.rating ? `★ ${book.rating}` : "No rating"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
