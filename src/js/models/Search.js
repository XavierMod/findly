import { apiKey, proxy } from '../config';
import $ from "jquery";
import axios from 'axios';

export default class Search {
    constructor (query) {
        this.query = query;
    } 

    async getResults() {
            try {
                const res = await $.ajax({
                    type: "GET",
                    data: {
                        apikey:`${apiKey}`,
                        q_lyrics: `${this.query}`,
                        format:"jsonp",
                        callback:"jsonp_callback"
                    },
                    url: "http://api.musixmatch.com/ws/1.1/track.search?",
                    dataType: "jsonp",
                    jsonpCallback: 'jsonp_callback',
                    contentType: 'application/json',
                    success: data => {
                        return data.message.body.track_list;
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }    
                  });

                this.result = res.message.body.track_list;
            } catch (error) {
                console.log(error);
            }
    } 
    
}
