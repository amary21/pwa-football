import {getMatchToDay, getStandings, getTeamDetail, getTeamFavorite} from "./api.js";
import {animateFootball, animateLoading} from "./components/animation.js";
import teamDetail from "./components/detail.js";

let item = (page, idParam = null) => {
    if(page === "detail" && idParam !== null){
        animateLoading();
        getTeamDetail(idParam).then(data =>{
            teamDetail(data);
        });
    } else if(page == "home"){
        animateLoading();
        animateFootball();
        getMatchToDay(); 
    } else if(page == "standings"){
        animateLoading();
        getStandings();
    } else if(page == "favorite"){
        getTeamFavorite();
    }
}

export default item;