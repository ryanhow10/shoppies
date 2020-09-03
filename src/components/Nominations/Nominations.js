import React, { Component } from 'react';
import './Nominations.css';

class Nominations extends Component {
    render() {
        const { nominations } = this.props;
        const nominationsList = nominations.map(movie => {
            return (<li className="nomination">{ movie.Title } ({ movie.Year }) <button type="button">Remove</button></li>)
        });
        return ( 
            <div className="nominationsComponent">
                <p className="nominationsTitle">Nominations</p>
                <ul>{ nominationsList }</ul>
                {
                    nominationsList.length < 5 && 
                    <p className="indicator">{ 5 - nominationsList.length } more nominations required</p>
                }
            </div>
        );
    }
}

export default Nominations;