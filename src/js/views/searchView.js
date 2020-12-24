import { DOMStrings } from './base';
import $ from "jquery";
import { getLyrics } from '../models/getLyrics';

export const getInput = () => {
    return $(DOMStrings.mainSearcher).val();
};

export const clearSearch = () => {
    $(DOMStrings.songFoundModule).remove();
}

export const clearPopups = () => {
    $('.lyrics-popup').remove();
};

const renderSongModule = (numberOfSongsFound) => {
    const markup = `    
    <!-- We found your song module -->
    <div class="song-found-module">
        <h1 id="found-title">We found ${numberOfSongsFound} songs!</h1>
    </div>`;
    $(DOMStrings.searcher).after(markup);

}

const renderSong = song => {
    const markup = `<div class="song-block">
    <div class="info-song">
        <div class="inner-text">
            <h1 class="band-name">${song.track.artist_name}</h1>
            <p class="subtitle"><span class="song-name">${song.track.track_name}</span> - <span class="album-name">${song.track.album_name}</span></p>
        </div>
    </div>
    <div class="btns-container">
        <button id="${song.track.track_id}"class="btn view-lyrics">VIEW LYRICS</button>
    </div>
    <div class="clr-flt"></div>
</div>`;
    $(DOMStrings.songFoundModule).append(markup);
};

export const renderResults = async (songs) => {
    console.log(songs);
    renderSongModule(songs.length);

    songs.forEach((cur, ind, arr) => {
        renderSong(cur);
    })
};

export const displayLyrics = (lyrics) => {
    let markup = `    <!-- Lyrics Popup -->
    <div class="lyrics-popup">
        <div class="popup-container">
            <div class="elements-container">
                <div class="title">
                    <img class="close" src="_assets/icons/general_icons/close.svg">
                </div>
                <p class="main-lyrics">${lyrics}</p>
            </div>
        </div>
    </div>`;

    $('body').prepend(markup);
}

export const addToLatest = (lastSearch, lyricsID) => {
    console.log($('.lyric-block').length);
    if ($('.lyric-block').length < 6) {
        const markup = `
        <div id="${lyricsID}" class="lyric-block not-bookmarked">
        <p class="lyric-search">${lastSearch}</p>
        <button id="${lyricsID}"class="btn search-again">SEARCH AGAIN</button>
    </div>`;
    
        $('.latest-searches').append(markup);
    } else {
        $('.lyric-block').remove();
        const markup = `
        <div id="${lyricsID}" class="lyric-block not-bookmarked">
        <p class="lyric-search">${lastSearch}</p>
        <button id="${lyricsID}"class="btn search-again">SEARCH AGAIN</button>
    </div>`;
    
        $('.latest-searches').append(markup);
    }

}

export const renderLoader = () => {
    $('.loader').remove();

    const markup = `    
    <!-- Loader -->
    <div class="loader" style="text-align: center">
        <img id="loader" src="_assets/music-loader.svg">
    </div>`;

    $('.latest-searches').prepend(markup);
};

export const clearLoader = () => {
    $('.loader').remove();
};

export const searchAgain = (el) => {
    $(DOMStrings.mainSearcher).val(el);
}