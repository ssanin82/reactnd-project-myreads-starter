import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import BookSearch from './BookSearch'
import BookRack from './BookRack'

class BooksApp extends React.Component {
  render() {
    return (
      <div>
        <Route path='/' exact render={({ history }) => (
          <BookRack booksAPI={BooksAPI}/>
        )}/>
        <Route path='/search' render={() => (
          <BookSearch booksAPI={BooksAPI}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
