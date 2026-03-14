import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useBooks } from './context/BooksContext'
import SpinnerWheel from './components/SpinnerWheel'
import AddBook from './components/AddBook'
import './App.css'

function App() {
  const {books} = useBooks();

  return (
    <div>
      <h1>Spinner Wheel</h1>
      <AddBook/>
      <SpinnerWheel books={books} />
    </div>
  );
}

export default App
