import item from "./item.js";

function loadNav(page){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status !== 200) return;

            document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                elm.innerHTML = xhttp.responseText;
            });

            document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                elm.addEventListener("click", event => {

                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        }
    };  
    xhttp.open("GET", "/src/views/nav.html", true)
    xhttp.send()
}

function loadPage(page, idParam = null){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            let content = document.querySelector("#body-content");
            if(this.status === 200){
                content.innerHTML = xhttp.responseText;
                if(idParam != null){
                    item(page, idParam);
                } else {
                    item(page);
                }
            } else if (this.status === 404){

                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "/src/pages/" + page + ".html", true)
    xhttp.send();
}

export {loadNav, loadPage}