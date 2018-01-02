import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import BookSearch from './BookSearch'
import BookRack from './BookRack'
import { getAll } from './BooksAPI';

const STORAGE_KEY = 'my_books_state'

class BooksApp extends React.Component {
  state = {
    books: []
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
      this.setState({ books });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    })
  }

  componentDidMount() {
    this._getAll();
    console.debug('App.js componentDidMount')
  }

  /*componentDidUpdate() {
    this._getAll();
    console.debug('App.js componentDidUpdate')
  }*/

  moveBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.filter(b => b.id !== book.id).concat(Object.assign(book, {shelf: shelf}))
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    BooksAPI.update(book, shelf);
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      if (books !== undefined && typeof books[Symbol.iterator] === 'function') {
        // Searched books do not have shelf field. Remote storage contain only books on our shelves.
        for (let book of books) {
          for (let bookShelved of this.state.books) {
            if (bookShelved.id === book.id) {
              book.shelf = bookShelved.shelf;
            }
          }
        }
        this.setState({books: books});
      } else {
        this.setState({ books: []});
      }
    });
  }

  render() {
    return (
      <div>
        <Route path='/' exact render={() => (
          <BookRack books={this.state.books} moveBook={this.moveBook}/>
        )}/>
        <Route path='/search' render={() => (
          <BookSearch books={this.state.books} moveBook={this.moveBook} searchBooks={this.searchBooks}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
