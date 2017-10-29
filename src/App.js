import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {books: []};
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }


  getLibraryBooks = (libraryName) => {
    return this.state.books.filter((book) => (book.shelf === libraryName));
  };

  updateShelfOfBook = (bookToUpdate, newShelf) => {
    const updatedBooks = this.state.books;
    for (let ix = 0; ix < updatedBooks.length; ix++) {
      if (updatedBooks[ix] === bookToUpdate) {
        updatedBooks[ix].shelf = newShelf;
      }
    }
    this.setState({books: updatedBooks});
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            currentlyReadingBooks={this.getLibraryBooks('currentlyReading')}
            wantToReadBooks={this.getLibraryBooks('wantToRead')}
            readBooks={this.getLibraryBooks('read')}
            updateShelfOfBook={this.updateShelfOfBook}
          />
        )}/>
        <Route exact path='/search' render={() => (
          <SearchBooks />
        )}/> 
      </div>
    )
  }
}

export default BooksApp
