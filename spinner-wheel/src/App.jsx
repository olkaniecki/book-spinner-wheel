import { useBooks } from './context/BooksContext'
import SpinnerWheel from './components/SpinnerWheel'
import AddBook from './components/AddBook'
import BookList from './components/BookList'
import styled from 'styled-components'
import { DotPattern } from 'components/components/ui/dot-pattern'
import { SparklesText } from 'components/components/ui/sparkles-text'
import { LightRays } from 'components/components/ui/light-rays'
import './App.css'

const AppContainer = styled.div`
  display: flex;
  height: 100vh; /* full page */
  gap: 20px;
  padding: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto; /* allow scroll on smaller screens */
  }
`;

/* LEFT SIDE: Spinner */
const LeftPane = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* RIGHT SIDE: Add/Edit boxes */
const RightPane = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const TopRightBox = styled.div`
  flex: 1; /* smaller top box */
  background-color: #ffe5ec;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const BottomRightBox = styled.div`
  flex: 2; /* bigger bottom box for list */
  background-color: #fff0f5;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow-y: auto; /* scroll if list is long */
`;

function App() {
  const {books, setBooks} = useBooks();

  return (
    <AppContainer>
      <LightRays />
       <DotPattern
        width={20}
        height={20}
        glow={true}
        className="opacity-50"
      />
      <LeftPane>
        <div>
          <SparklesText>Book Spinner Wheel</SparklesText>
          <SpinnerWheel books={books} />
        </div>
      </LeftPane>
      <RightPane>
        <TopRightBox>
          <h3>Add a book</h3>
          <AddBook/>
        </TopRightBox>
        <BottomRightBox>
          <h3>Book list</h3>
          <BookList books={books} setBooks={setBooks} />
        </BottomRightBox>
      </RightPane>
    </AppContainer>
  );
}

export default App
