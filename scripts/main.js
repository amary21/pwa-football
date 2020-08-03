import item from "./item.js";
import service from "./service.js";

function main() {
    let page = window.location.hash.substr(1);
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");                                                                                          
    
    if (page == "" && idParam != null) {
        page = "detail";
    } else if (page == ""){
        page = "home";
    }           
    
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    loadPage(page, idParam);

    function loadNav(){
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
        xhttp.open("GET", "/views/nav.html", true)
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
        xhttp.open("GET", "/pages/" + page + ".html", true)
        xhttp.send();
    }

    service();
}

export default main;