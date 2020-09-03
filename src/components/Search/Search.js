import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    render() {
        const { searchText, searchTextChange, search, error } = this.props;
        return (
            <div className="searchContainer">
                <form onSubmit={ search }>
                    <p className="searchTitle">Movie title</p>
                    <input className="searchBox" type="text" placeholder="Search movies" value={ searchText } onChange={ searchTextChange } required></input>
                    {
                        error &&
                        <p className="searchError">{ error } Please try another query.</p>
                    }
                </form>
            </div>
        );
    }
}

export default Search;