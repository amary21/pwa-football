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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dw23BjnHEEA:APA91bEAHirv4whpnytQo62PgkBrfO8DGdTvcRj8ePePcYTFxOBVxosEKFTENO5PqU2bik6zf036F9m2x4_q5BGQfJ963Pio3_9OPwTrI--PWhRU7JOrv78vdSm7LkJLSWuDm2W-oJXE",
    "keys": {
        "p256dh": "BFcTklAOGQSgXSxBNg3vY1p0tsvsV5cgviGyYuWoof0erGAy6wObsCwAWpYMsLKBPT1qewilZupyaUkjtFI0jzA=",
        "auth": "i6jmE3OIVjIPqta78gXkLw=="
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