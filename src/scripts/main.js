import {loadNav, loadPage} from "./load-page.js";
import service from "./service.js";

function main() {     

    document.addEventListener("DOMContentLoaded", () => {       
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
        loadNav(page);
        loadPage(page, idParam);
    
        service();
    });
}

export default main;