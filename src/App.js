import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';

/**
* @description Represents the main component where the app lives
* @constructor
*/
class BooksApp extends Component {
    /**
    * @description constructor of BooksApp
    * Initializes the state variable books to an empty array
    */
    constructor(props) {
        super(props);
        this.state = {books: []};
    }

    /**
    * @description componentDidMount method of the BooksApp
    * Uses BooksAPI to get all books in the server and sets
    * the BooksApp state variable books to this array of books
    */
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    /**
    * @description getLibraryBooks method of the BooksApp
    * @param {string} libraryName - Name of the book shelf
    * @returns {array} - Returns an array of books that in the provided book shelf
    */
    getLibraryBooks = (libraryName) => {
        return this.state.books.filter((book) => (book.shelf === libraryName));
    };

    /**
    * @description updateShelfOfBook method of the BooksApp
    * @param {Object} bookToUpdate - Book object to be updated
    * @param {string} newShelf - new shelf name of the book
    * Updates the shelf of the book to newShelf
    */
    updateShelfOfBook = (bookToUpdate, newShelf) => {
        BooksAPI.update(bookToUpdate, newShelf).then(() => {
        BooksAPI.getAll().then((books) => {
                this.setState({books}); 
            });
        });
    };

    render() {
        return (
            <div className="app">
                {/* Route to ListBooks component to display shelves for path: /*/}
                <Route exact path='/' render={() => (
                    <ListBooks
                        currentlyReadingBooks={this.getLibraryBooks('currentlyReading')}
                        wantToReadBooks={this.getLibraryBooks('wantToRead')}
                        readBooks={this.getLibraryBooks('read')}
                        updateShelfOfBook={this.updateShelfOfBook}
                    />
                )}/>
                {/* Route to SearchBooks component to display to search page for
                  * path /search */}
                <Route exact path='/search' render={() => (
                    <SearchBooks
                        shelvedBooks={this.state.books}
                        updateShelfOfBook={this.updateShelfOfBook}
                />
                )}/> 
            </div>
        );
    }
}

export default BooksApp;
