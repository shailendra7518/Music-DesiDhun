const express = require("express");
const router = express.Router();
const playlistController = require("../Controllers/playlist.controller");
const authenticate = require("../Middlewares/authenticate");

// Other routes...

router.post("/create", authenticate, playlistController.createPlaylist);
router.post("/addtoplaylist", authenticate, playlistController.addToPlaylist);

module.exports = router;
