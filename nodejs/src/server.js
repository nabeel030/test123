const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });
app.use("/uploads", express.static(uploadDir));

app.use(require("cors")());

app.post("/upload", upload.single("qr"), (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded.");

    const newPath = path.join(uploadDir, `${file.filename}.png`);
    fs.renameSync(file.path, newPath);

    res.json({ url: `http://localhost:3000/uploads/${file.filename}.png` });
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
