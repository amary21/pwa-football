import url from "./url.js";
import matchDay from "./components/matchday.js";
import standings from "./components/standings.js";
import {getFavTeam} from "./db.js"
import favorite from "./components/favorite.js";

const dateMatches = (now) => {
  let today;
  
  if(now){
      today = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
  } else {
      today = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  }
  
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return today = yyyy + '-' + mm + '-' + dd;
}

const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}
  
const json = (response) => {
  return response.json();
}
  
const error = (error) => {
  console.log("Error : " + error);
}

const getMatchToDay = () => {
  if('caches' in window){
    caches.match(`${url.main_url}competitions/2021/matches?dateFrom=${dateMatches(false)}&dateTo=${dateMatches(true)}`)
      .then(response => {
        if(response){
          response.json().then(data => {
            matchDay(data);
          })
        }
      })
  }
    
  fetch(`${url.main_url}competitions/2021/matches?dateFrom=${dateMatches(false)}&dateTo=${dateMatches(true)}`, {
    headers: {
      'X-Auth-Token': 'fd8e9844d0fc4cdda523cbada4d46ff1'
    }
  })
  .then(status)
  .then(json)
  .then(data =>{
    matchDay(data);
  })
  .catch(error);
}

const getStandings = () => {
  if('caches' in window){
    caches.match(`${url.main_url}competitions/2021/standings`).then(response => {
      if(response){
        response.json().then(data =>{
          standings(data);
        })
      }
    })
  }

  fetch(`${url.main_url}competitions/2021/standings`, {
    headers:{
      'X-Auth-Token': 'fd8e9844d0fc4cdda523cbada4d46ff1'  
    }
  })
  .then(status)
  .then(json)
  .then(data =>{
    standings(data);
  }).catch(error);
}

const getTeamDetail = (idTeam) =>{
  return new Promise(resolve=>{
    if('caches' in window){
      caches.match(`${url.main_url}teams/${idTeam}`).then(response => {
        if(response){
          response.json().then(data =>{
            resolve(data);
          })
        }
      })
    }
  
    fetch(`${url.main_url}teams/${idTeam}`, {
      headers: {
          'X-Auth-Token': 'fd8e9844d0fc4cdda523cbada4d46ff1'
      }
    })
    .then(status)
    .then(json)
    .then(data =>{
      resolve(data);
    })
    .catch(error);
  }); 
}

const getTeamFavorite = () =>{
  getFavTeam().then(teams =>{
    favorite(teams)
  });
}

export {getMatchToDay, getStandings, getTeamDetail, getTeamFavorite}