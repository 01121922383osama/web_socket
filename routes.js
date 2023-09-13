const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback,) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + ".jpg"); // image to jpg
    }
});

const upload = multer({
    storage: storage,
});

router.route("/addimage").patch(upload.single("img"), (req, res) => {
    try {
        res.json({ path: req.file.filename });
    } catch (error) {
        return res.json({ error: error });
    }
});

module.exports = router;
