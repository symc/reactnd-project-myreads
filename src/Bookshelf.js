import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
    render() {
        const {bookList, title} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList.map(book => (
                            <li>
                                <Book
                                    style={book.style}
                                    title={book.title}
                                    author={book.author}
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