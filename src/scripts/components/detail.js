import {saveFavTeam, getFavTeam} from "../db.js";

const teamDetail = (data) => {
    data.crestUrl = data.crestUrl.replace(/^http:\/\//i, 'https://');
    let favoriteState = document.getElementById("favorite-state");
    favoriteState.innerHTML = "";
    
    const itemContent = `
        <div class="row">
            <div class="col s12 m4 img-team"><img src="${data.crestUrl}"></div>
            <div class="col s12 m8 item-detail">
                <h2>${data.name}</h2>
                <table id="table-content" class="striped">
                    <tbody>
                        <tr>
                            <td>Address</td>
                            <td>${data.address}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td><a href="${data.website}">${data.website}</a></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${data.email}</td>
                        </tr>
                        <tr>
                            <td>Founded</td>
                            <td>${data.founded}</td>
                        </tr>
                        <tr>
                            <td>Venue</td>
                            <td>${data.venue}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
  `;
  
    document.getElementById("item-content").innerHTML = itemContent;
    document.getElementById("btn-back").onclick = () =>{
        window.location.href = "./";
    }
        
    getFavTeam().then(teams =>{
        console.log(teams.length);
        if(teams.length == 0){
            favoriteState.innerHTML =`
                <a class="btn-floating blue lighten-1 no-shadows" id="btn-fav">
                    <i class="material-icons">favorite_border</i>
                </a>`;
        } else {
            teams.forEach(team => {
                if(team.id == data.id){
                    favoriteState.innerHTML = `
                        <a class="btn-floating blue lighten-1 no-shadows disabled" id="btn-faved">
                            <i class="material-icons">favorite</i>
                        </a>`;
                } else {
                    favoriteState.innerHTML =`
                        <a class="btn-floating blue lighten-1 no-shadows" id="btn-fav">
                            <i class="material-icons">favorite_border</i>
                        </a>`;
                }
            });
        }

        const btnFav = document.getElementById("btn-fav");
        if(btnFav != null){
            btnFav.onclick = () =>{
                saveFavTeam(data).then(() =>{
                    favoriteState.innerHTML = `
                    <a class="btn-floating blue lighten-1 no-shadows disabled" id="btn-faved">
                        <i class="material-icons">favorite</i>
                    </a>`;
                });
            }
        }
    });
}

export default teamDetail;