import $ from 'jquery';
import { apiKey, proxy } from '../config';


export const getLyrics = async(id) =>  {
    try {
        const res = await $.ajax({
            type: "GET",
            data: {
                apikey:`${apiKey}`,
                format:"jsonp",
                callback:"jsonp_callback"
            },
            url: `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}`,
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: data => {
                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }    
          });
        
        return res;

    } catch (error) {
        console.log(error);
    }
};