import * as search from './js/test';
import Search from './js/models/Search';
import { DOMStrings } from './js/views/base';
import $ from "jquery";
import * as searchView from './js/views/searchView';
import { getLyrics } from './js/models/getLyrics';


// Main controller - brings everything together

// Global obstateject
const state = {};

// Main search
const controlSearch = async () => {

    const query = searchView.getInput();

        if (query) {
            try {
                state.search = new Search(query);
                searchView.clearSearch();
                searchView.renderLoader();

                await state.search.getResults();
                searchView.clearLoader();

                searchView.renderResults(state.search.result);
                addLatest(query);

            } catch (error) {
                console.log('something went wrong');
            }
        }
}

const displayPopUpLyrics = async (lyricsID) => {

    const getLyricsWithID = await getLyrics(lyricsID);
    const lyrics = getLyricsWithID.message.body.lyrics.lyrics_body;

    if (lyrics.length > 0) {
        searchView.displayLyrics(lyrics);
    } else {
        alert('Sorry, this song has no lyrics.')
    }
}

// Main search
$(DOMStrings.mainSearcher).keypress(event => {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        controlSearch(); 
    }
});

// Display lyrics
$('body').on('click', '.view-lyrics', event => {
    console.log(event);
    const lyricsID = event.currentTarget.id;
    displayPopUpLyrics(lyricsID);
});

$('body').on('click', '.close', event => {
    searchView.clearPopups();
});

$('body').on('click', '.search-again', event => {
    let lastSearch = event.target.parentNode.childNodes[1].textContent;
    searchView.searchAgain(lastSearch);
    controlSearch();
});


const addLatest = (query) => {
    searchView.addToLatest(query, '213124');
}







