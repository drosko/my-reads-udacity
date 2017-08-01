import React from 'react'
import { Route } from 'react-router-dom';
import { getAll, update, search } from './BooksAPI';
import { includes, uniqBy } from 'lodash';
import Shelves from './Shelves';
import Search from './Search';
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: {
      wantToRead: [],
      currentlyReading: [],
      read: []
    },
    books: [],
    searchResults: []
  }

  componentDidMount() {
    const _this = this;

    getAll().then((books) => {
        _this.setState({ 
          books,
          shelves: _this.updateShelves(books)
        });
    });
  }

  onShelfChange(book, shelf) {
    let _books = this.state.books;

    update(book, shelf).then((shelves) => {
        _books.forEach((_book) => {
            if(_book.id === book.id) {
                _book.shelf = shelf;
            }
        })
        this.setState({ 
          books: _books, 
          shelves
        });
    });
  }

  onShelfChangeFromSearch(book, shelf) {
    let _books = this.state.books;

    update(book, shelf).then((shelves) => {
      let alreadyOnShelves = false;
      _books.forEach((_book) => {
          if(_book.id === book.id) {
            alreadyOnShelves = true;
            _book.shelf = shelf;
          }
      })

      if(!alreadyOnShelves) {
        book.shelf = shelf;
        _books.push(book);
      }

      this.setState({ 
        books: _books, 
        shelves,
        searchResults: this.matchShelvesToSearch(this.state.searchResults, shelves)
      });
    });
  }

  onSearchQueryChange(searchQuery) {
    if(searchQuery) {
      search(searchQuery).then((searchResults) => {
          if(searchResults.length < 1 ) {
            this.setState({
              searchResults: []
            });
          } else {
            this.setState({
              searchResults: this.matchShelvesToSearch(uniqBy(searchResults, 'id'))
            });
          }
      });
    } else {
      this.setState({
        searchResults: []
      });
    }
  }

  matchShelvesToSearch(searchResults, newShelves) {
    const { wantToRead, read, currentlyReading } = newShelves || this.state.shelves;

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

    return searchResults;
  }

  updateShelves(books) {
    let wantToRead = [];
    let currentlyReading = [];
    let read = [];

    books.forEach((book) => {
      switch(book.shelf) {
        case 'wantToRead':
          wantToRead.push(book.id);
          break;
        case 'currentlyReading':
          currentlyReading.push(book.id);
          break;
        case 'read':
          read.push(book.id);
          break;
        default:
          break;
      }
    });

    return {
      wantToRead,
      currentlyReading,
      read
    }
  
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves books={this.state.books} onShelfChange={(book, shelf) => this.onShelfChange(book, shelf)} />
        )} />

        <Route path='/search' render={() => (
          <Search 
            searchResults={this.state.searchResults} 
            onSearchQueryChange={(query) => this.onSearchQueryChange(query)}
            onShelfChange={(book, shelf) => this.onShelfChangeFromSearch(book, shelf)} 
          />
        )} />
      </div>
    )
  }
}

export default BooksApp