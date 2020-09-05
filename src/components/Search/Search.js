import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    render() {
        const { searchText, searchTextChange, searchError } = this.props;
        return (
            <div className="searchContainer">
                <p className="searchTitle">Movie title</p>
                <input className="searchBox" type="text" placeholder="Search movies" value={ searchText } onChange={ searchTextChange }></input>
                {
                    searchError &&
                    <p className="searchError">{ searchError } Please try another query.</p>
                }
            </div>
        );
    }
}

export default Search;