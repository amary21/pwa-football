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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dliUbXj4PbI:APA91bHIhvrNeISNXVkj-nH7qv2wVr5KWGAwHWkEgcqCkfqvhPDjlDY-8DCGRQZ_JUmfOtaY1ONhHWz7DofDePHfZpF5bQIntf3K8k10buDci-IcHHALmSnnCdwsCESFymK5ecopd5WA",
    "keys": {
        "p256dh": "BOjc4fTejJsrNehE3C8yZ7VIqjpKBAdLJCHoNPZRrE9anvNJBS3IGXwDlWPphz3XtmzABAKwak2UOXQwq3SiIl4=",
        "auth": "B1iNf6+SCFcgxBJRRCh/Lw=="
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