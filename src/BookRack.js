import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class BookRack extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  render () {
    const {books, moveBook} = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              books={books.filter((book) => "currentlyReading" === book.shelf)}
              moveBook={moveBook}
              description="Currently Reading"
            />
            <BookShelf
              books={books.filter((book) => "wantToRead" === book.shelf)}
              moveBook={moveBook}
              description="Want to Read"
            />
            <BookShelf
              books={books.filter((book) => "read" === book.shelf)}
              moveBook={moveBook}
              description="Read"
            />
          </div>
        </div>
        <div className="open-search">
          <Link className='open-search' to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookRack
