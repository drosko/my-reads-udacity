import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { search, update } from './BooksAPI';
import { includes, uniqBy } from 'lodash';
import Book from './Book';

class Search extends Component {
    state = {
        searchQuery: '',
        searchResults: []
    }

    onInputChange(searchQuery) {
        this.setState({ searchQuery }, () => {
            if(searchQuery) {
                search(searchQuery).then((searchResults) => {
                    console.log(searchResults);
                    this.matchShelvesToSearch(uniqBy(searchResults, 'id'));
                });
            }
        })
    }

    matchShelvesToSearch(searchResults, newShelves) {
        const { wantToRead, read, currentlyReading } = newShelves || this.props.shelves;

        searchResults.forEach((book) => {
            if(includes(wantToRead, book.id)) {
                book.shelf = 'wantToRead';
            }
            else if(includes(read, book.id)) {
                book.shelf = 'read';
            }
            else if(includes(currentlyReading, book.id)) {
                book.shelf = 'currentlyReading';
            } else {
                book.shelf = 'none';
            }
        });

        this.setState({ searchResults });
    }

    onShelfChange(book, shelf) {
        update(book, shelf).then((res) => {
            this.props.refreshShelves(res);
        });
    }

    componentWillReceiveProps(props){
        this.matchShelvesToSearch(this.state.searchResults, props.shelves);
    }

    getSearchResults() {
        return this.state.searchResults.map((book) => {
            return (<Book
                book={book}
                onShelfChange={(book, shelf) => this.onShelfChange(book, shelf)}
                key={book.id}
            />)
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
                        <input type="text" onChange={(evt) => this.onInputChange(evt.target.value)} placeholder="Search by title or author" />
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