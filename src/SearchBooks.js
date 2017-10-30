import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {query: '', showingBooks: []};
    };

    updateShelfFields = (books) => {
        books.forEach((book) => {
            book.shelf = 'none'
            this.props.shelvedBooks.forEach((shelvedBook) => {
                if (book.id=== shelvedBook.id) {
                    book.shelf = shelvedBook.shelf;
                }
            });
        });
    }

    updateShowingBooks = (query) => {
        if (query) {
            BooksAPI.search(query, 20).then((books) => {
                if (books.error) {
                    this.setState({showingBooks: []});
                } else {
                    books = books.filter((book) => book.imageLinks);
                    books = books.filter((book) => book.authors);
                    if (books.length > 0) {
                        this.updateShelfFields(books);
                        this.setState({showingBooks: books});
                    } else {
                        this.setState({showingBooks: []});
                    }
                }
            });
        } else {
            this.setState({showingBooks: []});
        }
    };   

    updateQuery = (query) => {
        this.setState({query});
        this.updateShowingBooks(query);
    };

    render() {
        let {query, showingBooks} = this.state
        const updateShelfOfBook = this.props.updateShelfOfBook;

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