import React, { Component } from 'react';
import './Results.css';

class Results extends Component {
    isNominated(movie, nominations) {
        for(let i = 0; i < nominations.length; i++) {
            if(nominations[i].imdbID === movie.imdbID) {
                return true;
            }
        }
        return false;
    }

    render() {
        const { finalSearchText, results, nominateMovie, nominations } = this.props;
        const resultList = results.map(movie => {
            return (<li className="result" key={ movie.imdbID }>{ movie.Title } ({ movie.Year }) <button type="button" onClick={ e => nominateMovie(movie) } disabled={ this.isNominated(movie, nominations) || nominations.length === 5 }>Nominate</button></li>)
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