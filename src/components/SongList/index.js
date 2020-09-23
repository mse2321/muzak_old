import React, { useState } from 'react';

const SongList = (props) => {
    const {
        songName
    } = props;

    const [artist, setArtist] = useState({
        name: 'some name',
        images: ['1', '2']
    })

    const heading = 'Top Songs';

    const playSongs = () => {
        //playSongs
    }

    const multipleResultsFindArtist = () => {
        //
    }

    return (
        <section class="col-xs-12 col-md-8 searchContainer">
			<div id="results">
                <h2>{heading}</h2>
				<table>
					<tr class="tracks">
						<td>{ songName }</td>
						<td onClick={playSongs()} id="play_buttons"><i class='fa fa-play-circle'></i></td>
					</tr>
				</table>
			</div>
			<div id="multi_results">
				<h3>Search Results</h3>
				<ul>
					<li onClick={multipleResultsFindArtist()}>
                        <img class="artist_thumbs" src={ artist.images[0] } alt={ artist.name + ' Thumbnail Picture' }  />
                        &nbsp;&nbsp;{ artist.name }
                    </li>
				</ul>
			</div>
		</section>
    );
}

export default SongList;