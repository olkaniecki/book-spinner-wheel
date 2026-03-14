// BookList.js
import React, { useState } from "react";
import { useBooks } from "../context/BooksContext";

export default function BookList() {
  const { books, updateBook, removeBook } = useBooks();
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCover, setEditCover] = useState("");

  const startEdit = (book) => {
    setEditingId(book.id);
    setEditTitle(book.title);
    setEditCover(book.cover || "");
  };

  const saveEdit = () => {
    updateBook(editingId, { title: editTitle, cover: editCover || null });
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div style={{ marginBottom: "2rem" }}>
      {books.map((book) => (
        <div
          key={book.id}
          style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
        >
          {editingId === book.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />
              <input
                value={editCover}
                onChange={(e) => setEditCover(e.target.value)}
                placeholder="Cover URL"
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ marginRight: 8 }}>{book.title}</span>
              <button onClick={() => startEdit(book)}>Edit</button>
              <button onClick={() => removeBook(book.id)} style={{ marginLeft: 4 }}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}