// controllers/songController.js

const SongModel = require("../Models/song.model");

const songController = {
    uploadSong : async (req, res) => {
  const { title, artist, album, uploadedBy,fileUrl } = req.body;

  try {
    // Check if all required fields are provided
    if (!title || !artist || !album || !uploadedBy || !fileUrl) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const song = await SongModel.create({
      title,
      artist,
      album,
      file: fileUrl,
      uploadedBy,
    });

    return res.status(201).json(song);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}



}

module.exports = songController;
