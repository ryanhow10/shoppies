import React, { Component } from 'react';
import './Nominations.css';

class Nominations extends Component {
    render() {
        const { nominations, removeNomination } = this.props;
        const nominationsList = nominations.map(movie => {
            return (<li className="nomination" key={ movie.imdbID }>{ movie.Title } ({ movie.Year }) <button type="button" className="removeButton" onClick={ e => removeNomination(movie) }>Remove</button></li>)
        });
        return ( 
            <div className="nominationsContainer">
                <p className="nominationsTitle">Nominations</p>
                <ul>{ nominationsList }</ul>
                {
                    <p className="indicator">{ nominationsList.length < 5 ? 5 - nominationsList.length + ' more nominations required' : 'Nominations complete' }</p>
                }
            </div>
        );
    }
}

export default Nominations;