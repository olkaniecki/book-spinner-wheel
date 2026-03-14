import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useBooks } from './context/BooksContext'
import SpinnerWheel from './components/SpinnerWheel'
import AddBook from './components/AddBook'
import BookList from './components/BookList'
import './App.css'

function App() {
  const {books, setBooks} = useBooks();

  return (
    <div>
      <h1>Spinner Wheel</h1>
      <AddBook/>

      <BookList books={books} setBooks={setBooks} />
      <SpinnerWheel books={books} />
    </div>
  );
}

export default App
