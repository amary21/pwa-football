import { deleteFavTeam } from "../db.js";
import { getTeamFavorite } from "../api.js";
import { animateNodata } from "./animation.js";
import { loadPage } from "../load-page.js";

const favorite = (data) => {
    let bodyMatches = document.getElementById("body-favorite");
    bodyMatches.innerHTML = `<lottie-player id="lottie-nodata" loop autoplay></lottie-player>`;
    animateNodata();

    let favItem = "";
    data.forEach(item => {
        favItem += `
            <div id="item-favorite" class="card">
                <div class="row">
                    <div class="btn-detail" id="${item.id}">
                        <div class="col s12 m4 img-team-fav">
                            <img src="${item.crestUrl}">
                        </div>
                        <div class="col s12 m7">
                            <h4>${item.name}</h4>
                            <p>${item.address}</p>
                            <a href="${item.website}"><p>${item.website}</p></a>
                        </div>
                    </div>
                    <div class="col s12 m1">
                        <a class="btn-floating blue lighten-1 no-shadows btn-delete" id="${item.id}">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                </div>
            </div>`;
    });

    if (data.length > 0) {
        bodyMatches.innerHTML = favItem;
    }

    let btnDelete = document.querySelectorAll(".btn-delete");
    btnDelete.forEach(item => {
        item.addEventListener("click", event => {
            let id = event.currentTarget.id
            deleteFavTeam(id).then(() => {
                getTeamFavorite();
            });
        })
    });

    let btnDetail = document.querySelectorAll(".btn-detail");
    btnDetail.forEach(item => {
        item.addEventListener("click", event => {
            let id = event.currentTarget.id
            loadPage('detail', id);
        })
    });
}

export default favorite;