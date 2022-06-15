import Book from "./Book";
import PropTypes from "prop-types"
const Read = ({title, books, update, whichShelfIsBookLocatedAt}) =>{

  
   
    return(  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol key={title} className="books-grid">
        {books.map((book, index) => 
            <Book whichShelfIsBookLocatedAt={whichShelfIsBookLocatedAt} key={index} update={update} book={book} ></Book>
         )}

      </ol>
    </div>
  </div>);

}

Read.propTypes = {
  update: PropTypes.func.isRequired,
  whichShelfIsBookLocatedAt: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
}


export default Read;