import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

/**
* @description Bookshelf component
* @constructor
* Describes a UI element that represents a shelf. Each shelf holds a 
* set of books on it. These books are represented by a Book component
* Each book shelf has a title, represented by a string.
*/
class Bookshelf extends Component {
    render() {
        const {bookList, title, updateShelfOfBook} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList.map((book) => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    updateShelfOfBook={updateShelfOfBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
};

Bookshelf.propTypes = {
    bookList: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    updateShelfOfBook: PropTypes.func.isRequired
};

export default Bookshelf;