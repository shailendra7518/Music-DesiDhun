const express = require("express");
const router = express.Router();
const playlistController = require("../Controllers/playlist.controller");
const authenticate = require("../Middlewares/authenticate");

//  end points for playlists
//-----------------------------------

router.post("/create", authenticate, playlistController.createPlaylist);
// add song in the playlists
router.post(
  "/addtoplaylist",
  authenticate,
  playlistController.addSongToPlaylist
);
// get all the plalists with authentication
router.get("/getall", playlistController.getPlaylists);

// get playlists by id without authentication
router.get("/get/:id", playlistController.getPlaylistById);

// get playlists by creater id
router.get("/getbycreator/:creatorId", playlistController.getPlaylistsByCreatorId);

// only authorised user can delete the song from playlist
router.delete(
  "/:playlistId/song/:songId",
  authenticate,
  playlistController.deleteSongFromPlaylist
);

module.exports = router;
