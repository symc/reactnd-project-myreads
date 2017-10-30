import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
* @description BookshelfChanger component
* @constructor
* Describes a button on top of every book in the app that can change
* the shelf of that book. When the user clicks on the botton, she is 
* presented with a list containing the available shelf choices. The current
* value is selected initially in the list. The user can choose another 
* element from that list to change the shelf of the book
*/
class BookshelfChanger extends Component {
    /**
    * @description constructor of BookshelfChanger
    * Initializes the state variable value to the provided shelf value
    */
    constructor(props) {
        super(props);
        this.state = {value: props.shelf};
    }

    /**
    * @description onEvent method of BookshelfChanger
    * @param event - Event handler
    * This function is called if the selected element in the list of shelf
    * choices changes. The function updates the state to the new shelf value.
    */
    onChange(event) {
        const newValue = event.target.value;
        this.setState({
            value: newValue
        });
        this.props.updateShelfOfBook(newValue);
    }
    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.onChange.bind(this)}>
                    <option value="moveto" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

BookshelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired,
    updateShelfOfBook: PropTypes.func.isRequired
};

export default BookshelfChanger;