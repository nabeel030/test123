const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const WebSocket = require('ws');
const { sendQRCode, loginStatus } = require("./pusher");

async function checkLoginStatus(page, browser) {
    try {
        await page.waitForSelector("div[aria-label='Chat list']", { timeout: 60000 }); // Chat list appears after login
        loginStatus(true)
        await browser.close();
    } catch (error) {
        console.log("Login not detected.", error);
    }
}

async function captureAndUploadQR() {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

    await page.goto("https://web.whatsapp.com", { waitUntil: "networkidle2" });

    console.log("Waiting for QR code...");
    await page.waitForSelector("canvas", { timeout: 60000 });

    const qrCode = await page.$("canvas");
    await qrCode.screenshot({ path: "qr.png" });

    console.log("QR Code saved. Uploading...");

    const formData = new FormData();
    formData.append("qr", fs.createReadStream("qr.png"));

    const { data } = await axios.post("http://localhost:3000/upload", formData, {
        headers: formData.getHeaders(),
    });

    sendQRCode(data.url)
    checkLoginStatus(page, browser)

    // await browser.close();
}

captureAndUploadQR();
