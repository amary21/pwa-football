import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const service = () =>{
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function() {
            runtime.register()
                .then(function() {
                    console.log("Pendaftaran ServiceWorker berhasil");
                })
                .catch(function() {
                    console.log("Pendaftaran ServiceWorker gagal");
                });
        });
    } else {
        console.log("ServiceWorker belum didukung browser ini.");
    }
}

export default service;