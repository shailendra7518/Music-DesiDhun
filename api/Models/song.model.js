const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  cover: { type: String, required: true },
  album: { type: String, required: true },
  file: { type: String, required: true },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const SongModel = mongoose.model("Song", songSchema);


module.exports = SongModel;
