import React, { useState } from 'react';

const Profile = (props) => {
	const {
        songName
	} = props;

	const [artist, setArtist] = useState({
        name: 'some name',
		images: ['1', '2'],
		url: ''
    })
	
    return (
        <aside id="album_player_section" class="col-xs-12 col-md-4">
				<audio-player></audio-player>
				<div id="artist_info">
					<h3>{ artist.name }</h3>
					<img src={ artist.images[0] } alt={ artist.name + 'Thumbnail' } />
					<p><a href="{{ bio }}" target="_blank">{ artist.name + ' Profile from Discogs' }</a></p>
					<ul>
						<li><a href={ artist.url }>{ artist.url }</a></li>
					</ul>
				</div>
			</aside>
    );
}

export default Profile;