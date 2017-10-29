import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
    render() {
        const style = {
            width: 128,
            height: 192,
            backgroundImage: 'url(' + this.props.book.imageLinks.smallThumbnail +')'
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

export default Book;