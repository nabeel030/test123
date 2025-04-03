const Pusher = require('pusher');

// Initialize Pusher
const pusher = new Pusher({
    appId: "1967841",
    key: "7071a81b3c12e4589793",
    secret: "c2dfc2a4442681d91087",
    cluster: "ap2",
    useTLS: true
});

const sendQRCode = (qrcodeUrl) => {
    pusher.trigger("botsify", "qrcode.sent", {
        url: qrcodeUrl
    });
};

const loginStatus = (status) => {
    pusher.trigger("botsify", "login.status", {status});
};

module.exports = { sendQRCode, loginStatus };