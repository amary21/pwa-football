import baseUrl from "./base-url.js";
import {getMatchToDay, getStandings, getBackStanding} from "./api.js";

function item(page){
    if(page == "home"){
        const lotFootball = document.getElementById("lottie-football");
        if(lotFootball != null){
            lotFootball.setAttribute("src", baseUrl.url_lottie_football);
            lotFootball.setAttribute("speed", "2");
        }
        getMatchToDay(); 
    } else if(page == "standings"){
        let tableElement = document.getElementById("table-content");
        let itemElement = document.getElementById("item-content");
        getStandings(tableElement, itemElement);
    }   
}

export default item;