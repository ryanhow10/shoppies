import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    render() {
        return (
            <div className="searchContainer">
                <p className="searchTitle">Movie title</p>
                <input className="searchBox" type="text" placeholder="Search movies"></input>
            </div>
        )
    }
}

export default Search;