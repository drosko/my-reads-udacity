import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChange: PropTypes.func
    }

    static defaultProps = {
        onShelfChange: () => {}
    }
    
    render() {
        const { imageLinks, title, authors, shelf } = this.props.book;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + imageLinks.thumbnail + '")' }}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={(evt) => { this.props.onShelfChange(this.props.book, evt.target.value)}}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors.join(', ')}</div>
                </div>
            </li>
        )
    }
}

export default Book;