import React, { Component } from 'react';
import './Results.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        const { searchText, results, nominateMovie, nominations } = this.props;
        const resultList = results.map(movie => {
            return (
                <li className="result" key={ movie.imdbID }>
                    { movie.Title } ({ movie.Year }) 
                    <button type="button" className="nominateButton" 
                        onClick={ e => nominateMovie(movie) } 
                        disabled={ this.isNominated(movie, nominations) || nominations.length === 5 }
                    >
                    { this.isNominated(movie, nominations) ? 'Nominated' : 'Nominate' }
                    </button>
                </li>
            );
        });
        return ( 
            resultList.length > 0 ? 
            <div className="resultsContainer">
                <ReactCSSTransitionGroup 
                    transitionName="fade"
                    transitionAppear={ true }
                    transitionEnter={ false }
                    transitionLeave={ false }
                    transitionAppearTimeout={ 500 }
                >
                    <p className="resultsTitle">Results for "{ searchText }"</p>
                    <ul>
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionAppear={ false }
                            transitionEnter={ true }
                            transitionLeave={ false }
                            transitionEnterTimeout={ 500 }
                        >
                        { resultList }
                        </ReactCSSTransitionGroup>
                    </ul>
                </ReactCSSTransitionGroup>
            </div> :
            <div className="resultsContainer">
                <div className="description"> 
                    <p className="step">1. Search</p>
                    <p className="step">2. Nominate</p>
                    <p className="step">3. Repeat</p>
                    <p>Nominate your 5 favourite films for this year's annual Shoppies in 3 easy steps!</p>
                </div>
            </div>
        );
    }
}

export default Results;