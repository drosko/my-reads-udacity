import React from 'react'
import { Route } from 'react-router-dom';
import Shelves from './Shelves';
import Search from './Search';
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: {
      wantToRead: [],
      currentlyReading: [],
      read: []
    }
  }

  updateAppState(books) {
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

    this.setState({
      shelves: {
        wantToRead,
        currentlyReading,
        read
      }
    });
  }

  refreshShelves(shelves) {
    this.setState( { shelves })
  }

  render() {
    console.log('inside App Render');
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves updateAppState={(books) => this.updateAppState(books)} />
        )} />

        <Route path='/search' render={() => (
          <Search shelves={this.state.shelves} refreshShelves={(shelves) => this.refreshShelves(shelves)}/>
        )} />
      </div>
    )
  }
}

export default BooksApp