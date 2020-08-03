import url from "../url.js";

const animateFootball = ()=>{
    const lotFootball = document.getElementById("lottie-football");
    if(lotFootball != null){
        lotFootball.setAttribute("src", url.url_lottie_football);
        lotFootball.setAttribute("speed", "2");
    }
}

const animateLoading = ()=>{
    const lotLoading = document.getElementById("lottie-loading");
    if(lotLoading != null){
        lotLoading.setAttribute("src", url.url_lottie_loading);
        lotLoading.setAttribute("speed", "2");
    }
}

const animateNodata = ()=>{
    const lotLoading = document.getElementById("lottie-nodata");
    if(lotLoading != null){
        lotLoading.setAttribute("src", url.url_lottie_nodata);
        lotLoading.setAttribute("speed", "2");
    }
}



export {animateFootball, animateLoading, animateNodata}