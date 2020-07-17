import baseUrl from "./base-url.js";

function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
  }
  
  function json(response) {
    return response.json();
  }
  
  function error(error) {
    console.log("Error : " + error);
  }

  function dateMatches(now){
    let today;
    if(now){
        today = new Date();
    } else {
        today = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return today = yyyy + '-' + mm + '-' + dd;
}

function matchData(data){
  let matchesHTML = "";
            let scoreHomeTeam = "";
            let scoreAwayTeam = "";

            data.matches.reverse();
            data.matches.forEach(matche => {
              
              if(matche.score.fullTime.homeTeam == null || matche.score.fullTime.awayTeam == null){
                scoreHomeTeam = "-";
                scoreAwayTeam = "-"; 
              } else {
                scoreHomeTeam = matche.score.fullTime.homeTeam;
                scoreAwayTeam = matche.score.fullTime.awayTeam;   
              }
            
                  matchesHTML +=`
                  <div class="card white no-shadows match-item">
                      <div class="row">
                          <div class="col s4 match-team">${matche.homeTeam.name}</div>
                          <div class="col s1 score-team">${scoreHomeTeam}</div>
                          <div class="col s2">VS</div>
                          <div class="col s1 score-team">${scoreAwayTeam}</div>
                          <div class="col s4 match-team">${matche.awayTeam.name}</div>
                      </div>
                  </div>
                  `;
            });

            document.getElementById("body-matches").innerHTML = matchesHTML;
}

function standingsData(data, tableElement, itemElement){
  let standingsHTML = "";
          data.standings.forEach(standing => {
              if(standing.type == "TOTAL"){
                  standingsHTML += `      
                  <table class="striped">
                    <thead>
                      <tr>
                          <th>Club</th>
                          <th></th>
                          <th></th>
                          <th>PG</th>
                          <th>W</th>
                          <th>L</th>
                          <th>D</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                          <th>P</th>
                      </tr>
                    </thead>
                    <tbody>`;

                  standing.table.forEach((item, index) => {
                    standingsHTML +=`
                    <tr class='clickable-row' data-href="${item.team.id}">
                      <td>${index + 1}</td>
                      <td><img src="${item.team.crestUrl}" width="25" height="25"></td>
                      <td>${item.team.name}</td>
                      <td>${item.playedGames}</td>
                      <td>${item.won}</td>
                      <td>${item.lost}</td>
                      <td>${item.points}</td>
                      <td>${item.goalsFor}</td>
                      <td>${item.goalsAgainst}</td>
                      <td>${item.goalDifference}</td>
                      <td>${item.points}</td>
                    </tr>
                    `;  
                  });

                  standingsHTML +=`
                    </tbody>
                  </table>`;
              }
          });

          tableElement.innerHTML += standingsHTML;

          const rows = document.querySelectorAll("tr[data-href]");
          rows.forEach(row => {
            row.addEventListener("click", ()=>{
              getTeamLogo(row.dataset.href, tableElement, itemElement);
            });
          });
  }

function getMatchToDay(){

  if('caches' in window){
    caches.match(baseUrl.main_url + "competitions/2021/matches?dateFrom="+dateMatches(false)+"&dateTo="+dateMatches(true))
      .then(response => {
        if(response){
          response.json().then(data => {
            matchData(data);
          })
        }
      })
  }
    fetch(baseUrl.main_url + "competitions/2021/matches?dateFrom="+dateMatches(false)+"&dateTo="+dateMatches(true), {
        headers: {
            'X-Auth-Token': 'fd8e9844d0fc4cdda523cbada4d46ff1'
          }
    })
        .then(status)
        .then(json)
        .then(data =>{
            matchData(data);
        })
        .catch(error);
}

function getStandings(tableElement, itemElement){
  getBackStanding(tableElement, itemElement, true);

  if('caches' in window){
    caches.match(baseUrl.main_url + "competitions/2021/standings").then(response => {
      if(response){
        response.json().then(data =>{
          standingsData(data, tableElement, itemElement);
        })
      }
    })
  }

  fetch(baseUrl.main_url + "competitions/2021/standings", {
    headers:{
      'X-Auth-Token': 'fd8e9844d0fc4cdda523cbada4d46ff1'  
    }
  })
  .then(status)
  .then(json)
  .then(data =>{
    standingsData(data, tableElement, itemElement);
  }).catch(error);
}

function getTeamLogo(idTeam, tableElement, itemElement){ 
  getBackStanding(tableElement, itemElement, false);
  itemElement.innerHTML = `
    <a class="btn-floating blue lighten-1 no-shadows" id="btn-back">
      <i class="material-icons">arrow_back</i>
    </a>
  `;
  fetch(baseUrl.main_url + "teams/"+idTeam, {
    headers: {
        'X-Auth-Token': 'fd8e9844d0fc4cdda523cbada4d46ff1'
      }
  })
    .then(status)
    .then(json)
    .then(data =>{
      const itemContent = `
        <div class="row">
          <div class="col s12 m4 img-team"><img src="${data.crestUrl}"></div>
          <div class="col s12 m8 item-detail">
            <h1>${data.name}</h1>
            <table id="table-content" class="striped">
            <tbody>
            <tr>
              <td>Address</td>
              <td>${data.address}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>${data.website}</td>
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

      itemElement.innerHTML += itemContent;
      document.getElementById("btn-back").onclick = function fun(){
        getBackStanding(tableElement, itemElement, true);
      }
    })
    .catch(error);

    document.getElementById("btn-back").onclick = function fun(){
      getBackStanding(tableElement, itemElement, true);
    }
}

function getBackStanding(tableElement, itemElement, isBack){
  if(isBack){
    tableElement.style.display = "block";
    itemElement.style.display = "none";
  } else {
    tableElement.style.display = "none";
    itemElement.style.display = "block";
  }
}

export {status, json, getMatchToDay, getStandings, getBackStanding}