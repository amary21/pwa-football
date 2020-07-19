import {deleteFavTeam} from "../db.js";
import {getTeamFavorite} from "../api.js";
import { animateLoading } from "./animation.js";

const favorite = (data) =>{
    let bodyMatches = document.getElementById("body-favorite");
    bodyMatches.innerHTML = `<lottie-player id="lottie-loading" loop autoplay></lottie-player>`;
    animateLoading();

    let favItem = "";
    data.forEach(item => {
        favItem +=`
        <a href="/?id=${item.id}">
            <div id="item-favorite" class="card">
                <div class="row">
                    <div class="col s12 m4 img-team-fav">
                        <img src="${item.crestUrl}">
                    </div>
                    <div class="col s12 m7">
                        <h4>${item.name}</h4>
                        <p>${item.address}</p>
                        <a href="${item.website}"><p>${item.website}</p></a>
                    </div>
                    <div class="col s12 m1">
                        <a class="btn-floating blue lighten-1 no-shadows btn-delete" id="${item.id}">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                </div>
            </div>
        </a>`;
    });
    
    if(data.length > 0){
        bodyMatches.innerHTML = favItem;
    }
    
    let btnDelete = document.querySelectorAll(".btn-delete");
    btnDelete.forEach(item =>{  
        item.addEventListener("click", event =>{
            let id = event.currentTarget.id
            console.log(id);
            deleteFavTeam(id).then(()=>{
                getTeamFavorite();
            });
        })
    });
}

export default favorite;