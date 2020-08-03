const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLrIVKA8qUHemAyVTt25_59NclC8jmnp7Hj_KquaA43l1h17zc4Math730YxDJse8iNyXr9xsReb9iqkOBnogN4",
    "privateKey": "OS0_vlmKqj_pSJ0NX9MvDuPXBm53xdszwVklVKLJJOs"
};

webPush.setVapidDetails(
    'mailto:taufik.amary@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eFpyDv7iKGY:APA91bEFEm8KLCH6aYMwpmVEqh1Q-FftScUnZHu-VJNLL2arJdIAN9xUQ9YOgIrXok8B8XDLzSf_S0HaSs4blQ96-5pvtbVowB23s_sp3NRl2RvR8LxqFHoynWtX-xmt5gG5XMAIPM50",
    "keys": {
        "p256dh": "BGQAP36+k4zQjmA/OCH9NKmXD0svqCzNghXSBNxZ0Mko1cWsSLIO8gvzY4Sg5Lj/rDZtCE7CKNh34uENScFyVUY=",
        "auth": "O5fS0Ss1aiy5hY6ic3gnyw=="
    }
};

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
const options = {
    gcmAPIKey: '170137032190',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)