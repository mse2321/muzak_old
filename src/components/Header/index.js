import React from 'react';

const Header = (props) => {
    const heading = 'Muzak';
    const introMessage1 = 'Listen to preview tracks from your favorite artists using ';
    const introMessage2 = ' and artist information from ';
    const spotify = 'Spotify';
    const discogs = 'Discogs';

    const showInfo = () => {
        console.log('showing info');
    }

    return (
        <header>
            <h1>{heading}</h1>
            <p>
                {introMessage1}
                <a href="https://www.spotify.com" target="_blank">{spotify}</a>
                {introMessage2}
                <a href="https://www.discogs.com/" target="_blank">{discogs}</a>.
            </p>
            <i class="fa fa-info-circle" aria-hidden="true" onClick={showInfo()}></i>
        </header>
    );
}

export default Header;