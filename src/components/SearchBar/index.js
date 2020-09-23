import React from 'react';

const SearchBar = (props) => {
    const submitSearch = () => {
        //sendArtistData(currentArtistName)
    }

    return (
        <div id="search_form" class="input-group">
            <form>
                <input type="text" placeholder="Search for something?!" class="form-control" id="search" value="" />
                <span class="input-group-btn">
                    <button type="submit" id="submit" class="btn btn-default">Search</button>
                </span>
            </form>		
        </div>
    );
}

export default SearchBar;