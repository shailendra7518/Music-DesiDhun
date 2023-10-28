const express = require("express");
const router = express.Router();
const playlistController = require("../Controllers/playlist.controller");

// Other routes...

router.post("/create", playlistController.createPlaylist);

module.exports = router;
