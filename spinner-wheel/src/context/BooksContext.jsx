import React, {createContext, useContext, useState, useEffect} from "react";

const BooksContext = createContext();

export function BooksProvider ({ children }) {
    const [books, setBooks] = useState(() => {
        const stored = localStorage.getItem("books");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    const addBook = (book) => setBooks((prev) => [...prev, book]);
    const updateBook = (id, updatedFields) =>
        setBooks((prev) =>
            prev.map((b) => (b.id === id ? { ...b, ...updatedFields} : b))
        );
    const removeBook = (id) =>
        setBooks((prev) => prev.filter((b) => b.id !== id));

    return (
        <BooksContext.Provider value={{ books, addBook, updateBook, removeBook}}>
            {children}
        </BooksContext.Provider>

    );
}

export const useBooks = () => useContext(BooksContext);