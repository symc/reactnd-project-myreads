import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
    render() {
        const {bookList, title, updateShelfOfBook} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList.map((book, ix) => (
                            <li key={ix}>
                                <Book
                                    book={book}
                                    updateShelfOfBook={updateShelfOfBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
};

export default Bookshelf;