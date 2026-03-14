import React, {useState} from "react";
import { useBooks } from "../context/BooksContext";

function AddBook() {
    const { addBook } = useBooks();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const [genre, setGenre] = useState("");
    const [pages, setPages] = useState("");
    const [format, setFormat] = useState("");

    const searchBook = async () => {
        if (!query) return;

        const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`
        );

        const data = await res.json();

        const books = data.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title,
            cover: item.volumeInfo.imageLinks?.thumbnail || "",
        }));

        setResults(books || []);
    };

    const handleAddBook = () => {
        addBook({
            id: selectedBook.id,
            title: selectedBook.title,
            cover: selectedBook.cover,
            genre,
            pages,
            format,
        });
        
        setSelectedBook(null);
        setQuery("");
        setResults([]);
    };

    return  (
        <div>
            <h2>Add Book</h2>

            <input  
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books"
                />
            
            <button onClick={searchBook}>Search</button>

            <div>
                {results.map((book) => (
                    <div key={book.id} onClick={() => setSelectedBook(book)}>
                        <img src={book.cover} width={80} />
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>

            {selectedBook && (
                <div>
                    <h3>{selectedBook.title}</h3>

                    <select onChange={(e) => setGenre(e.target.value)}>
                        <option value="">Genre</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Classic">Classic</option>
                        <option value="Literary Fiction">Literary Fiction</option>
                        <option value="Contemporary Fiction">Contemporary Fiction</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Short Story">Short Story</option>
                    </select>

                    <select onChange={(e) => setPages(e.target.value)}>
                        <option value="">Pages</option>
                        <option value="100-199">100-199</option>
                        <option value="200-299">200-299</option>
                        <option value="300-399">300-399</option>
                        <option value="400-499">400-499</option>
                        <option value="500-599">500-599</option>
                        <option value="600-699">600-699</option>
                        <option value="700-799">700-799</option>
                        <option value="800+">800+</option>
                    </select>

                    <select onChange={(e) => setFormat(e.target.value)}>
                        <option value="">Format</option>
                        <option value="Paperback">Paperback</option>
                        <option value="Hardcover">Hardcover</option>
                        <option value="eBook">eBook</option>
                        <option value="Audiobook">Audiobook</option>
                        <option value="ARC">ARC</option>
                    </select>

                    <button onClick={handleAddBook}>
                        Add Book
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddBook;