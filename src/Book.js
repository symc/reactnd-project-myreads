import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
    render() {
        const {style, title, author, shelf} = this.props.book;
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