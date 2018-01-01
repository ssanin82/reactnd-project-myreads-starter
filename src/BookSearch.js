import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'

const STORAGE_KEY = 'my_books_search'

class BookSearch extends React.Component {
  static propTypes = {
    booksAPI: PropTypes.object.isRequired
  }

  state = {
    query: '',
    books: []
  }

  constructor(props) {
    super(props)
    this.state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"query": "", "books": []}');
  }

  moveBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.filter(b => b.id !== book.id).concat(Object.assign(book, {shelf: shelf}))
    }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    this.props.booksAPI.update(book, shelf)
  }

  searchQuery = (query) => {
    let success = false
    let query0 = query.trim()
    if (query0) {
      this.props.booksAPI.search(query0).then((books) => {
        if (!('items' in books)) {
          console.debug(`Query '${query0}' -> ${books.length} books found!`)
          this.setState({ query: query, books: books })
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
          success = true
        } else {
          console.warn(`Query '${query0}' -> no books found!`)
        }
      })
    }
    if (!success) {
      this.setState({ query: query, books: [] })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    }
  }

  componentDidMount() {
    this.searchQuery(this.state.query)
  }

  render () {
    this.state.books.sort(sortBy('title'))
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.searchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf onMoveBook={this.moveBook} books={this.state.books} description="Search Result"/>
        </div>
      </div>
    )
  }
}

export default BookSearch
