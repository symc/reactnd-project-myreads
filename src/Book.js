import React, { Component } from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';

/**
* @description Book component
* @constructor
* Describes a UI element that describes a book. Each book has:
* - a book cover of size 128 x 192, and an image url
* - a title
* - a list of authors, seperated by a comma
* - a button, represented by a BookshelfChanger component, that can change
* the shelf of the book.
*/
class Book extends Component {
    render() {
        const {book, updateShelfOfBook} = this.props;
        const imageLink = book.imageLinks.smallThumbnail;
        const style = {
            width: 128,
            height: 192,
            backgroundImage: 'url(' + imageLink +')'
        };
        const title = book.title;
        const author = book.authors ? book.authors.join(', ') : '';
        const shelf = book.shelf;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={style}></div>
                    <BookshelfChanger 
                        shelf={shelf}
                        updateShelfOfBook={(newShelf) => {
                            updateShelfOfBook(book, newShelf)
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