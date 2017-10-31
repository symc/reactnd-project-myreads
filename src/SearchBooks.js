import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import debounce from 'lodash.debounce';

/**
* @description SearchBooks component
* @constructor
* Describes a UI element with:
* - a search bar
* - an area that displays the books matching the search phrase
*/
class SearchBooks extends Component {
    /**
    * @description constructor of BooksApp
    * Initializes the state variable query to an empty string, and
    * state element showing books to an empty array
    */
    constructor(props) {
        super(props);
        this.state = {query: '', showingBooks: []};
    }

    /**
    * @description updateShelfFields method of the SearchBooks component
    * @param {string} books - A list of books
    * For every element in the list of books, checks if this book is 
    * located in one of the shelves. If this is the case, the method updates
    * shelf parameter of the book object to the name of this shelf. Otherwise,
    * shelf object is set to 'none'.
    */
    updateShelfFields = (books) => {
        books.forEach((book) => {
            book.shelf = 'none'
            this.props.shelvedBooks.forEach((shelvedBook) => {
                if (book.id=== shelvedBook.id) {
                    book.shelf = shelvedBook.shelf;
                }
            });
        });
    };

    /**
    * @description updateShowingBooks method of the SearchBooks component
    * @param {string} query- A search query string
    * Updates the state showingBooks based on the provided query string
    * so that showingBooks contains the books that match to this query
    */
    updateShowingBooks = (query) => {
        if (query) {
            BooksAPI.search(query, 20).then((books) => {
                if (books.error) {
                    /* In the case of an error, set showingBooks to empty */
                    this.setState({showingBooks: []});
                } else {
                    books = books.filter((book) => book.imageLinks);
                    books = books.filter((book) => book.authors);
                    if (books.length > 0) {
                        this.updateShelfFields(books);
                        this.setState({showingBooks: books});
                    } else {
                        /* In the case of an empty list, make sure the state
                         * is cleared */
                        this.setState({showingBooks: []});
                    }
                }
            });
        } else {
            /* In the case of an empty query, make sure the state is cleared */
            this.setState({showingBooks: []});
        }
    };

    /**
    * @description updateQuery method of the SearchBooks component
    * @param {string} query- A search query string
    * Updates the query state so that the page is rendered in real time
    * as the user types a query in the search bar
    */
    updateQuery = debounce((query) => {
        this.setState({query});
        this.updateShowingBooks(query);
    });

    render() {
        let {query, showingBooks} = this.state
        const updateShelfOfBook = this.props.updateShelfOfBook;

        /* Display the books in sorted order by title */
        showingBooks.sort(sortBy('title'));

        /* Make sure that the showingBooks is empty for an empty query
         * before rendering the page */
        if (this.state.query === '') {
            showingBooks = [];
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            showingBooks.map((book) => (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        updateShelfOfBook={updateShelfOfBook}
                                    />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

SearchBooks.propTypes = {
    shelvedBooks: PropTypes.array.isRequired,
    updateShelfOfBook: PropTypes.func.isRequired
};

export default SearchBooks;