import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'

class BookSearch extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  searchQuery = (query) => {
    this.setState({ query: query.trim() }, () => {
      this.props.searchBooks(query);
    });
  }

  componentDidMount() {
    this.searchQuery(this.state.query);
  }

  render () {
    const books = this.props.books.sort(sortBy('id')).sort(sortBy('subtitle')).sort(sortBy('title'))
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
          <BookShelf
            books={books}
            moveBook={this.props.moveBook}
            description="Search Result"
          />
        </div>
      </div>
    )
  }
}

export default BookSearch
