import baseUrl from "./base-url.js";

function item(){
    const lotFootball = document.querySelector("#lottie-football");
    lotFootball.setAttribute("src", baseUrl.url_lottie_football);
    lotFootball.setAttribute("speed", "2");
}

export default item;