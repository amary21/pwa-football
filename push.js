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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dnq9Yylk8fc:APA91bHFT2KRfEKn4bNCJPXuOREOX_gMGY0y_4JQE4OL_g0Ubwoy2Qi5KG6xzccRuv86sfYSdDecoN2W5QYSTpX8xzEGO413tPQ_n5Y0Jd-qPwx8I949pSk7db-f2RNJBUot325jZTOm",
    "keys": {
        "p256dh": "BO7dMmOsX8xiNON5nE0Wi9jo81thFkGyS+FTCPpgq/w4FN0+9XUQfnjVowEccHA8ONQH8+01JKr6xUhpq7QEQZs=",
        "auth": "lXjquNzvj40UpuhzyrXLuA=="
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