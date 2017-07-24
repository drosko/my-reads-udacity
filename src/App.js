import React from 'react'
import { Route } from 'react-router-dom';
import Shelves from './Shelves';
import Search from './Search';
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves />
        )} />

        <Route path='/search' component={Search} />

      </div>
    )
  }
  
}

export default BooksApp
