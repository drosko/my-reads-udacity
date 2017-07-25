import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAll, update } from './BooksAPI';
import Book from './Book';

class Shelves extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: []
        }

        this.onShelfChange = this.onShelfChange.bind(this);
    }

    componentDidMount() {
        const _this = this;

        getAll().then((books) => {
            _this.setState({books});
            _this.props.updateAppState(books);
            console.log(books);
        });
    }

    getShelveBooks(shelf) {
        return this.state.books.map((book) => {
            if(shelf === book.shelf) {
                return (<Book
                    book={book}
                    onShelfChange={this.onShelfChange}
                    key={book.id}
                />)
            }
            return null;
        })
    }

    onShelfChange(book, shelf) {
        let _books = this.state.books;

        update(book, shelf).then((res) => {
            _books.forEach((_book) => {
                if(_book.id === book.id) {
                    _book.shelf = shelf;
                }
            })
            this.setState({ books: _books });
            this.props.updateAppState(_books);
        });
    }

    render() {

        return ( 
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                {this.getShelveBooks('currentlyReading')}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                {this.getShelveBooks('wantToRead')}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                {this.getShelveBooks('read')}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Shelves;