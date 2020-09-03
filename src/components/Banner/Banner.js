import React, { Component } from 'react';
import './Banner.css';

class Banner extends Component {
    render() {
        const { resetNominations } = this.props;
        return (
            <div className="bannerContainer">
                <p className="bannerMessage">Successfully nominated 5 movies. That's it, you're done!</p>
                <button className="restartButton" onClick={ resetNominations }>Restart</button>
            </div>
        )
    }
}

export default Banner;