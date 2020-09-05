import React, { Component } from 'react';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import Nominations from './components/Nominations/Nominations';
import Banner from './components/Banner/Banner';
import './App.css';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  constructor() {
    super();
    //Set nominations to locally stored nominations if they exist
    const storedNominations = localStorage.getItem("nominations");
    const nominations = storedNominations ? JSON.parse(storedNominations) : []; 
    this.state = {
      searchText: "",
      searchError: "",
      results: [],
      nominations: nominations
    }
  }

  handleSearchTextChange = (event) => {
    this.setState({
      searchText: event.target.value,
    }, () => { this.handleSearch() });
  }

  handleSearchError = (error) => {
    this.setState({
      searchError: error
    });
  }

  setSearchResults = (searchResults) => {
    this.setState({
      results: searchResults
    });
  }

  handleSearch = () => {
    if(!this.state.searchText) {
      this.handleSearchError("");
      this.setSearchResults([]);
      return;
    }
    axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${this.state.searchText}`)
      .then(resp => {
        if(resp.data.Response === 'True') {
          this.handleSearchError("");
          this.setSearchResults(resp.data.Search);
        } else {
          this.handleSearchError(resp.data.Error);
          this.setSearchResults([]);
        }
      })
      .catch(err => {
        console.log("Error fetching search results: " + err);
      });
  }

  updateStoredNominations = () => {
    localStorage.setItem("nominations", JSON.stringify(this.state.nominations));
  }

  nominateMovie = (movie) => {
    this.setState(prevState => ({
      nominations: [...prevState.nominations, movie]
    }), () => { this.updateStoredNominations() });
  }

  removeNomination = (movie) => {
    this.setState(prevState => ({
      nominations: prevState.nominations.filter(nom => nom !== movie)
    }), () => { this.updateStoredNominations() });
  }

  resetNominations = () => {
    this.setState({
      nominations: []
    }, () => { this.updateStoredNominations() });
  }

  render() {
    return (
      <ReactCSSTransitionGroup 
        transitionName="fade" 
        transitionAppear={ true }
        transitionEnter={ false }
        transitionLeave={ false }
        transitionAppearTimeout={ 500 }
      >
        <div className="container">
          <h2>The Shoppies</h2>
          <Search
            searchText={ this.state.searchText }
            searchTextChange={ this.handleSearchTextChange }
            searchError={ this.state.searchError }
          >
          </Search>
          { 
            this.state.nominations.length === 5 &&
            <ReactCSSTransitionGroup 
              transitionName="fade" 
              transitionAppear={ true }
              transitionEnter={ false }
              transitionLeave={ true }
              transitionAppearTimeout={ 500 }
              transitionLeaveTimeout={ 300 }
            >
              <Banner
                resetNominations={ this.resetNominations }
              >
              </Banner>
            </ReactCSSTransitionGroup>
          }
          <div className="resultsAndNoms">
            <Results
              searchText={ this.state.searchText }
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
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default App;
