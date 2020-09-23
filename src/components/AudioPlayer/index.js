import React from 'react';

const AudioPlayer = (props) => {
    const {
        songName,
        albumName,
        audioSource,
        albumImageSource,
    } = props;
    const actionMessage = 'Back to results';

    return (
        <div id="audioPlayer_wrap">
            <audio id="music" controls>
                <source src={ audioSource } type="audio/mpeg" />
            </audio>
            <div id="audioPlayer">
                <img class="album_art" src={ albumImageSource } alt="" />
                <div id="song_name_display">
                    <p>{ songName }</p>
                    <p class='album'>{ albumName }</p>
                </div>
                <div id="controls_wrap">
                    <div id="audio_controls">
                        <i class='fa fa-play control_button' onClick="replaySongs()"></i>
                        <i class='fa fa-pause control_button' onClick="pauseSongs()"></i>
                    </div>
                </div>
                <button id="mobile_back" onClick="hidePlayer()">
                    <p>{actionMessage}</p>
                </button>
            </div>
        </div>
    );
}

export default AudioPlayer;
