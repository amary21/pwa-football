const matchDay = (data) => {
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

export default matchDay;