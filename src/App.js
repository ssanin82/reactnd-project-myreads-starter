import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import BookSearch from './BookSearch'
import BookRack from './BookRack'

const STORAGE_KEY = 'my_books_state'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  constructor(props) {
    super(props);
    let item = localStorage.getItem(STORAGE_KEY);
    if (item !== null) {
      this.state = JSON.parse(item);
    };
  }

  _getAll() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books }, () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      });
    })
  }

  componentDidMount() {
    this._getAll();
  }

  moveBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.filter(b => b.id !== book.id).concat(Object.assign(book, {shelf: shelf}))
    }), () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    });
    BooksAPI.update(book, shelf);
  }

  findBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      let searchRes = [];
      if (books !== undefined && typeof books[Symbol.iterator] === 'function') {
        // Searched books do not have shelf field. Remote storage contain only books on our shelves.
        for (let book of books) {
          for (let bookShelved of this.state.books) {
            if (bookShelved.id === book.id) {
              book.shelf = bookShelved.shelf;
            }
          }
        }
        searchRes = books;
      }
      this.setState({ searchBooks: searchRes }, () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      });
    });
  }

  render() {
    return (
      <div>
        <Route path='/' exact render={() => (
          <BookRack books={this.state.books} moveBook={this.moveBook}/>
        )}/>
        <Route path='/search' render={() => (
          <BookSearch books={this.state.searchBooks} moveBook={this.moveBook} findBooks={this.findBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
