import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

/**
* @description ListBooks component
* @constructor
* Describes a UI element with:
* - a header that contains the app title
* - three book shelves, each represented by a Bookshelf component
* - a link to add a book (directing the user to search page)
* Book shelves displays the books that are currently in that shelf.
*/
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