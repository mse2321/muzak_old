import React from 'react';
import Footer from './Footer/';
import Header from './Header/';
import SearchBar from './SearchBar/';
import AudioPlayer from './AudioPlayer/';
import Profile from './Profile/';
import SongList from "./SongList/";


const App = (props) => {
    return(
        <div class="container col-xs-12" id="content_wrap">
            <Header />
            <SearchBar />
            <SongList />
            <AudioPlayer />
            <Profile />
            <Footer />
        </div>
    )
}

export default App;