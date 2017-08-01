import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
    state = {
        searchQuery: ''
    }

    onInputChange(searchQuery) {
        this.setState({ searchQuery });
        this.props.onSearchQueryChange(searchQuery);
    }

    componentWillUnmount() {
        this.props.onSearchQueryChange('');
    }

    getSearchResults() {
        return this.props.searchResults.map((book) => {
            return (
                <Book
                    book={book}
                    onShelfChange={this.props.onShelfChange}
                    key={book.id}
                />
            )
        })
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" autoFocus onChange={(evt) => this.onInputChange(evt.target.value)} placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.getSearchResults()}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;