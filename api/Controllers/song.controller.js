// controllers/songController.js

const SongModel = require("../Models/song.model");

const songController = {
  uploadSong: async (req, res) => {
    console.log(req.body)
  const { title, artist, album, uploadedBy,fileUrl,cover } = req.body;

  try {
    // Check if all required fields are provided
    if (!title || !artist || !album || !uploadedBy || !fileUrl ||!cover) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const song = await SongModel.create({
      title,
      artist,
      cover,
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
  },
  getSong : async (req, res) => {
  try {
    const songs = await SongModel.find();
    res.json({status:200,message:'successfull',songs});
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}



}

module.exports = songController;
