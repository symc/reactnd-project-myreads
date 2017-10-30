import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

class ListBooks extends Component {
    render() {
        const {currentlyReadingBooks, 
            wantToReadBooks, 
            readBooks, 
            updateShelfOfBook} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf
                        bookList={currentlyReadingBooks}
                        title='Currently Reading'
                        updateShelfOfBook={updateShelfOfBook}
                        />
                        <Bookshelf
                        bookList={wantToReadBooks}
                        title='Want to Read'
                        updateShelfOfBook={updateShelfOfBook}
                        />
                        <Bookshelf
                        bookList={readBooks}
                        title='Read'
                        updateShelfOfBook={updateShelfOfBook}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>>Add a book</Link>
                </div>
            </div>
        );
    }
}

ListBooks.propTypes = {
    currentlyReadingBooks: PropTypes.array.isRequired,
    wantToReadBooks: PropTypes.array.isRequired,
    readBooks: PropTypes.array.isRequired,
    updateShelfOfBook: PropTypes.func.isRequired
};

export default ListBooks;