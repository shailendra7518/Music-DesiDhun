// routes/songRoutes.js

const express = require("express");
const router = express.Router();
const songController = require("../Controllers/song.controller");
const authenticate = require("../Middlewares/authenticate");


router.post("/upload", authenticate, songController.uploadSong);

router.get("/get", songController.getSong);
router.get("/get/:id", songController.getSongById);
router.get("/search", songController.getSongsBySearch);

module.exports = router;
