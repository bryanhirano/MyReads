import "./App.css";
import * as BookAPI from "./BooksAPI";
import {useState, useEffect} from "react";
import { Route, Routes, Link } from "react-router-dom";
import Read from "./Read.js"
import Search from "./Search";

function App() {

  const [currentlyReading, setCurrentlyReading] = useState([])
  const [wantToRead, setWantToRead] = useState([])
  const [read, setRead] = useState([])
  const [updated, setUpdated] = useState(true)
  const [books, setBooks] = useState([])

  const  whichShelfIsBookLocatedAt = (bookId) => {
    var shelf = "none"
    // identify if the bookID is on any of the books on the shelf
    books.map((result) => {

    if(result.id === bookId){
      shelf = result.shelf; 
 
    }
    return shelf;
   })

   return shelf;

  }


  const updateBookShelf = async (book,shelf) => {
     await BookAPI.update(book,shelf);
     
      setUpdated(true);

      
  }
  
  
  useEffect(()=>{
    if(updated){
     
      const getBooks = async () => {
        const result = await BookAPI.getAll()
            setCurrentlyReading(result.filter(data => data.shelf === "currentlyReading"));
            setWantToRead(result.filter(data => data.shelf === "wantToRead"));
            setRead(result.filter(data => data.shelf === "read"));
            setBooks(result);
      
      }
      getBooks();
      return (() => { setUpdated(false);
      })
      
    }
  })
  



  return (
    <div className="app">
         
     <Routes>
        <Route path="" element={
          <div>
             <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
                {
                  // If a shelf is empty it won`t show the component
                }
                {(currentlyReading.length > 0) && 
                <Read whichShelfIsBookLocatedAt={whichShelfIsBookLocatedAt} title="Currently Reading" update={updateBookShelf} books={currentlyReading}></Read>}

                {(wantToRead.length > 0) && 
                <Read whichShelfIsBookLocatedAt={whichShelfIsBookLocatedAt} key="wantToRead" title="Want to read" update={updateBookShelf} books={wantToRead}></Read>}

                {(read.length > 0) && 
                <Read whichShelfIsBookLocatedAt={whichShelfIsBookLocatedAt} key="read" title="Read" update={updateBookShelf} books={read}></Read>}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }/>
              <Route exact path="/search" element={
                  <div>
                  <Search whichShelfIsBookLocatedAt={whichShelfIsBookLocatedAt} update={updateBookShelf} books={books}></Search>
                  </div>
                }/>
              
      </Routes>
    </div>
       
  );
}

export default App;
