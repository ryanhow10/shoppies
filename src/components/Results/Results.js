import React, { Component } from 'react';
import './Results.css';

class Results extends Component {
    render() {
        const { finalSearchText, results, nominateMovie, nominations } = this.props;
        const resultList = results.map(movie => {
            return (<li className="result" key={ movie.imdbID }>{ movie.Title } ({ movie.Year }) <button type="button" onClick={ e => nominateMovie(movie) } disabled={ nominations.includes(movie) || nominations.length == 5 }>Nominate</button></li>)
        });
        return ( 
            <div className="resultsContainer">
                <p className="resultsTitle">Results for "{ finalSearchText }"</p>
                <ul>{ resultList }</ul>
            </div>
        );
    }
}

export default Results;