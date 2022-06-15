import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI"
import PropTypes from "prop-types"

const Search = ({update, whichShelfIsBookLocatedAt}) => {

  // the text that will be searched
  const [entry,setEntry] = useState("")

  const [books, setBooks] = useState([])


  useEffect(() => {
   
    let mounted = true
    if(entry.trim().length !== 0 && mounted){


    const search = async () => {
      const result = await BooksAPI.search(entry,50);
      setBooks(result);
    } 

 
    search();
   
  }

  return (() => {
    mounted = false;
    setBooks([]);  

  })

  },[entry])



    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={(event) => {setEntry(event.target.value)}
              }
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {(books.length > 0 && entry.trim().length >0) &&
           books.map((book,index) => (
           <Book whichShelfIsBookLocatedAt={whichShelfIsBookLocatedAt} key={index} book={book} update={update}></Book> )
           )}
          </ol>
        </div>
      </div>);
}

Search.propTypes = {
  update: PropTypes.func.isRequired,
  whichShelfIsBookLocatedAt: PropTypes.func.isRequired

}


export default Search;