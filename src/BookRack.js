import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'my_books_rack'

class BookRack extends React.Component {
  static propTypes = {
    booksAPI: PropTypes.object.isRequired
  }

  state = {
    books: []
  }

  constructor(props) {
    super(props)
    this.state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"books": []}');
  }

  componentDidMount() {
    this.props.booksAPI.getAll().then((books) => {
      this.setState({ books })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    })
  }

  moveBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.filter(b => b.id !== book.id).concat(Object.assign(book, {shelf: shelf}))
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    this.props.booksAPI.update(book, shelf)
  }

  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              onMoveBook={this.moveBook}
              books={this.state.books.filter((book) => "currentlyReading" === book.shelf)}
              description="Currently Reading"
            />
            <BookShelf
              onMoveBook={this.moveBook}
              books={this.state.books.filter((book) => "wantToRead" === book.shelf)}
              description="Want to Read"
            />
            <BookShelf
              onMoveBook={this.moveBook}
              books={this.state.books.filter((book) => "read" === book.shelf)}
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
