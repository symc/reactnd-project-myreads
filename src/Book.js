import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger'
import PropTypes from 'prop-types'

class Book extends Component {
    render() {
        const imageLink = this.props.book.imageLinks.smallThumbnail;
        const style = {
            width: 128,
            height: 192,
            backgroundImage: 'url(' + imageLink +')'
        };
        const title = this.props.book.title;
        const author = this.props.book.authors.join(', ');
        const shelf = this.props.book.shelf;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={style}></div>
                    <BookshelfChanger 
                        shelf={shelf}
                        updateShelfOfBook={(newShelf) => {
                            this.props.updateShelfOfBook(this.props.book, newShelf)
                        }}
                    />
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateShelfOfBook: PropTypes.func.isRequired
};

export default Book;