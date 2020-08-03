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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ce-YbmP2vU8:APA91bFFM9YXdzfER-k3_T6qcQH0gteA49XRJURKQIrJWi3OduXWlOjw2iWvaJe3p91C05Y8nAUqOHTfkGLEnxRPIe_fEZ6KpvrJw0aRtKsVnycG1oHMQb_w2Z4eJZ3O51k52PHOz36n",
    "keys": {
        "p256dh": "BE3eEMX9Ichv4r43rNc1z3jZ3od62X9/G2xCSpdT657HJ0ww4mFE8xSdeQqHAxcxJobP6rhwfj4lQkoaWONgii0=",
        "auth": "/PiXaUOJKST8+37vhZPvrw=="
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