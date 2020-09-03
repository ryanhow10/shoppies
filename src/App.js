import React, { Component } from 'react';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import Nominations from './components/Nominations/Nominations';
import './App.css';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      searchError: "",
      finalSearchText: "",
      results: [],
      nominations: []
    }
  }

  handleSearchTextChange = (event) => {
    this.setState({
      searchText: event.target.value,
      searchError: ""
    });
  }

  handleSearchError = (errorMessage) => {
    this.setState({
      searchError: errorMessage
    });
  }

  setFinalSearchText = (finalSearchText) => {
    this.setState({
      finalSearchText: finalSearchText
    });
  }

  setSearchResults = (searchResults) => {
    this.setState({
      results: searchResults
    });
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.handleSearchError("");
    axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${this.state.searchText}`)
      .then(resp => {
        if(resp.data.Response === 'True') {
          this.setFinalSearchText(this.state.searchText);
          this.setSearchResults(resp.data.Search);
        } else {
          this.handleSearchError(resp.data.Error);
        }
      })
      .catch(err => {
        console.log("Error fetching search results: " + err);
      });
  }

  nominateMovie = (movie) => {
    this.setState({
      nominations: [...this.state.nominations, movie]
    });
  }

  removeNomination = (movie) => {
    this.setState({
      nominations: this.state.nominations.filter(nom => nom !== movie)
    });
  }

  render() {
    return (
      <div className="container">
        <h2>The Shoppies</h2>
        <Search
          searchText={ this.state.searchText }
          searchTextChange={ this.handleSearchTextChange }
          search={ this.handleSearch }
          error={ this.state.searchError }
        >
        </Search>
        {
          this.state.results.length > 0 &&
          <div className="resultsAndNoms">
            <Results
              finalSearchText={ this.state.finalSearchText }
              results={ this.state.results }
              nominateMovie={ this.nominateMovie }
              nominations={ this.state.nominations }
            >
            </Results>
            <Nominations
              nominations={ this.state.nominations }
              removeNomination={ this.removeNomination }
            >
            </Nominations>
          </div>
        }
      </div>
    );
  }
}

export default App;
