const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }], // Add this line
});
const PlaylistModel = mongoose.model("Playlist", playlistSchema);

module.exports = PlaylistModel;
