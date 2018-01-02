import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired
  }

  render () {
    const { books, moveBook, description } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{description}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}/>
                    <div className="book-shelf-changer">
                      <select
                          value={("shelf" in book) ? book.shelf : "none"}
                          id={"sh_" + book.id}
                          onChange={() => moveBook(book, document.getElementById("sh_" + book.id).value)}>
                        <option value="header" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-subtitle">{book.subtitle}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
