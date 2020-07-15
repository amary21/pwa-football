import baseUrl from "./base-url.js";
import {status, json, getMatchToDay, getStandings} from "./api.js";

function item(page){
    if(page == "home"){
        const lotFootball = document.getElementById("lottie-football");
        if(lotFootball != null){
            lotFootball.setAttribute("src", baseUrl.url_lottie_football);
            lotFootball.setAttribute("speed", "2");
        }
        getMatchToDay(); 
    } else if(page == "standings"){
        getStandings();
    }   
}

export default item;