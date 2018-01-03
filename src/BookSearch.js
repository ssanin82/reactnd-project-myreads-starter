import React from 'react'
import './App.css'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'

const STORAGE_KEY = 'my_books_search'

class BookSearch extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    findBooks: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  constructor(props) {
    super(props);
    let item = localStorage.getItem(STORAGE_KEY);
    if (item !== null) {
      this.state = JSON.parse(item);
    };
  }

  searchQuery = (query) => {
    //query = query.trim();
    this.setState({ query: query }, () => {
      this.props.findBooks(query);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    });
  }

  componentDidMount() {
    this.searchQuery(this.state.query);
  }

  render () {
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
            books={this.props.books.sort(sortBy('id')).sort(sortBy('subtitle')).sort(sortBy('title'))}
            moveBook={this.props.moveBook}
            description="Search Result"
          />
        </div>
      </div>
    )
  }
}

export default BookSearch
