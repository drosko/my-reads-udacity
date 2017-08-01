import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {

    let imageLinks = props.book.imageLinks || { thumbnail: '' };

    const { title, authors, shelf } = props.book;

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + imageLinks.thumbnail + '")' }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={(evt) => { props.onShelfChange(props.book, evt.target.value)}}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors && authors.join(', ')}</div>
            </div>
        </li>
    )
    
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func
}

Book.defaultProps = {
    onShelfChange: () => {}
}

export default Book;