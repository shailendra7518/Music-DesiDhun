// controllers/songController.js

const SongModel = require("../Models/song.model");

const songController = {
  uploadSong: async (req, res) => {
    const { title, artist, album, uploadedBy, fileUrl, cover } = req.body;

    try {
      // Check if all required fields are provided
      if (!title || !artist || !album || !uploadedBy || !fileUrl || !cover) {
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
  getSong: async (req, res) => {
    try {
      const songs = await SongModel.find();
      res.json({ status: 200, message: "successfull", songs });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  getSongById: async (req, res) => {
    const songId = req.params.id;
    try {
      if (!songId) {
        res.status(400).json({ message: "songId is required" });
      }

      const song = await SongModel.findById(songId);
      res.json({ status: 200, message: "successfull", song });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  getSongsBySearch: async (req, res) => {
    // query by this we can search song
    const { query } = req.query;

    try {
      const results = await SongModel.find({
        $or: [
          { title: { $regex: query, $options: "i" } }, // Case-insensitive search on title
          { artist: { $regex: query, $options: "i" } }, // Case-insensitive search on artist
          // Add more fields as needed for your search
        ],
      });
      // we can sent response with status code 200 if we get the data
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = songController;
