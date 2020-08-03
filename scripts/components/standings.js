const standings = (data) => {
    let colorRanking = "";
    let standingsHTML = "";
        data.standings.forEach(standing => {
            if(standing.type == "TOTAL"){
                standingsHTML += `      
                    <table class="striped">
                        <thead>
                            <tr>
                                <th style="text-align:center">Club</th>
                                <th></th>
                                <th>PG</th>
                                <th>W</th>
                                <th>L</th>
                                <th>D</th>
                                <th>GD</th>
                                <th>P</th>
                            </tr>
                        </thead>
                    <tbody>`;
  
                standing.table.forEach((item, index) => {
                    if(index < 4){
                        colorRanking = "blue accent-2";
                    } else if (index == 4){
                        colorRanking = "orange darken-3";
                    } else if (index == 5){
                        colorRanking = "orange darken-4";
                    } else if (index >= 17){
                        colorRanking = "red darken-4";
                    } else {
                        colorRanking = "transparent";
                    }

                    standingsHTML +=`
                        <tr class='clickable-row' data-href="${item.team.id}">
                            <td style="text-align:center"  class="${colorRanking}">
                                <img src="${item.team.crestUrl}" width="25" height="25"></td>
                            <td>${item.team.name}</td>
                            <td>${item.playedGames}</td>
                            <td>${item.won}</td>
                            <td>${item.lost}</td>
                            <td>${item.draw}</td>
                            <td>${item.goalDifference}</td>
                            <td>${item.points}</td>
                        </tr>`;  
                });
  
                standingsHTML +=`</tbody></table>`;

            }
        });
    
    document.getElementById("animate-loading").innerHTML = "";
    document.getElementById("table-content").innerHTML = standingsHTML;
    document.querySelectorAll("tr[data-href]").forEach(row => {
        row.addEventListener("click", ()=>{
            window.location = "./?id="+row.dataset.href;
        });
    });
}

export default standings;