import url from "./url.js";

const service = () =>{
    if ("serviceWorker" in navigator) {
        registerServiceWorker();
        requestPermission();
    } else {
        console.log("ServiceWorker belum didukung browser ini.");
    }

    function registerServiceWorker(){
        window.addEventListener("load", function() {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(function() {
                    console.log("Pendaftaran ServiceWorker berhasil");
                })
                .catch(function() {
                    console.log("Pendaftaran ServiceWorker gagal");
                });
        });
    }

    function requestPermission(){
        if("Notification" in window){
            Notification.requestPermission().then(result =>{
                if (result === "denied") {
                    console.log("Fitur notifikasi tidak diijinkan.");
                    return;
                } else if (result === "default") {
                    console.error("Pengguna menutup kotak dialog permintaan ijin.");
                    return;
                }
                  
                console.log("Fitur notifikasi diijinkan.");
                getPushManager();
            });
        } else {
            console.error("Browser tidak mendukung notifikasi.");
        }
    }

    function getPushManager(){
        if("PushManager" in window){
            navigator.serviceWorker.getRegistration().then(reg =>{
                reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(url.publickey)
                }).then(subscribe =>{
                    console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                        null, new Uint8Array(subscribe.getKey('auth')))));
                }).catch(e =>{
                    console.error('Tidak dapat melakukan subscribe ', e.message);
                })
            });
        }
    }

    function urlBase64ToUint8Array(base64String){
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const encodeData = base64;
        const rawData = window.atob(encodeData);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}

export default service;