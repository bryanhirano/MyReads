import PropTypes from "prop-types"
const Book = ({book , update, whichShelfIsBookLocatedAt}) => {



    const setShelf = (shelf) => {
       update(book, shelf)
      
    }

    const locateShelf =  (bookId) => {
      const result = whichShelfIsBookLocatedAt(bookId)
      return result;

    }


    
    

    return(
        <li key={book.title}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage:
                  `url("${book.imageLinks !== undefined && book.imageLinks.smallThumbnail}")`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select value={locateShelf(book.id)} onChange={(event) => {setShelf(event.target.value)}}>
                <option value="moveTo" disabled>
                  Move to...
                </option>
                <option  value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          
          <div className="book-authors">{book.authors !== undefined && (book.authors).map((author) =>  <p key={author}>{author}</p>)} 
        </div> 
        </div>
      </li>
    );

}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  whichShelfIsBookLocatedAt: PropTypes.func.isRequired

}



export default Book;