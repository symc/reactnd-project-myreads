import React, { Component } from 'react'

class BookshelfChanger extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.shelf};
    }

    onChange(event) {
        const newValue = event.target.value;
        this.setState({
            value: newValue
        })
        this.props.updateShelfOfBook(newValue)
    }
    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.onChange.bind(this)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default BookshelfChanger;