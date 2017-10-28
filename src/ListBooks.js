import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
    render() {
        const {currentlyReadingBooks, wantToReadBooks, readBooks} = this.props;
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
                        />
                        <Bookshelf
                        bookList={wantToReadBooks}
                        title='Want to Read'
                        />
                        <Bookshelf
                        bookList={readBooks}
                        title='Read'
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

export default ListBooks;