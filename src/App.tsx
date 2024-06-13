import React, { useState, useEffect, useRef } from 'react';
// import logo from './logo.svg';
import './App.css';
import { motion, useCycle } from 'framer-motion'
import { useDimensions } from './framer-motion/dimensions';

// custom types
import type { Book } from './custom-types/book';

// Graphql 
import { useQuery, gql } from "@apollo/client";

// components
import SearchAppBar from './components/SearchBar';
import NestedList from './components/NestedList';
import BookCard from './components/BookCard';
import Manucho from './components/Manucho';

const overlay = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 40px 40px)",
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

function App() {
  const { loading, error, data } = useQuery(BOOKS_QUERY, {
    pollInterval: 500
  });
  const [bookState, setBookState] = useState<Book[]>(data?.books);
  const [isBookClick, setIsBookClick] = useState(false)
  const [openSuggestionList, setOpenSuggestionList] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [deleteCount, setDeleteCount] = useState(0);



  let curBookList: Book[] = []

  let bookStorage = localStorage.getItem('bookList')
  if (bookStorage != null) {
    curBookList = JSON.parse(bookStorage) as unknown as Book[]
  }
  useEffect(() => {
  }, [deleteCount])




  useEffect(() => {
    if (searchTerm === '') {
      return setBookState(data?.books)
    }
    setBookState(data?.books)
    const newBookState = bookState?.filter((book) => book.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    if (newBookState) {

      setBookState([...newBookState])
    }

  }, [searchTerm])

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>Error: {error.message}</h1>
  }
  return (
    <div className="App" style={{ position: 'relative' }}>

      <SearchAppBar setOpenSuggestionList={setOpenSuggestionList} setSearchTerm={setSearchTerm} toggleOpen={toggleOpen} />
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className="view container"
      >
        <motion.div
          onClick={() => toggleOpen()}
          variants={overlay}
          className="view-employee"
        >

          <Manucho />
        </motion.div>
      </motion.div>
      {
        openSuggestionList && <NestedList bookState={bookState} setOpenSuggestionList={setOpenSuggestionList} />
      }
      <div className="book-grid">


        {
          curBookList.map((storedBook) => <BookCard book={storedBook} deleteCount={deleteCount} setDeleteCount={setDeleteCount} />)
        }

      </div>
    </div>
  );
}

export default App;


const BOOKS_QUERY = gql`
  query Books {
     books {
        author
        coverPhotoURL
        readingLevel
        title
    }
}
`;