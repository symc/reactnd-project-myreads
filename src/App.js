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
    BooksAPI.update(bookToUpdate, newShelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({books}); 
      });
    });
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
          <SearchBooks
            shelvedBooks={this.state.books}
            updateShelfOfBook={this.updateShelfOfBook}
          />
        )}/> 
      </div>
    )
  }
}

export default BooksApp
