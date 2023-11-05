const PlaylistModel = require("../Models/playlist.model");
const SongModel = require("../Models/song.model");
const playlistCongroller = {
  addSongToPlaylist: async (req, res) => {
    const { playlistId, songId } = req.body;

    try {
      const playlist = await PlaylistModel.findById(playlistId);
      const song = await SongModel.findById(songId);

      if (!playlist || !song) {
        return res.status(404).json({ message: "Playlist or Song not found" });
      }

      if (playlist.songs.includes(songId)) {
         return res.status(404).json({status:404, message: "Song already in the plalist" });
      }

      playlist.songs.push(songId);
      await playlist.save();

      return res
        .status(200)
        .json({ message: "Song added to playlist successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteSongFromPlaylist: async (req, res) => {
    try {
      const { playlistId, songId } = req.params;
      console.log(songId);
      // Find the playlist by ID
      const playlist = await PlaylistModel.findById(playlistId);

      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      // compare ids with type check
      playlist.songs = playlist.songs.filter((song) => song != songId);
      // Remove the song from the playlist

      // Save the updated playlist
      await playlist.save();

      return res.status(200).json({ message: "Song deleted from playlist" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  createPlaylist: async (req, res) => {
    try {
      // Check if the name is provided
      if (!req.body.name || !req.body.creator) {
        return res.status(400).json({
          message: "Name and creater_ref is required for creating a playlist.",
        });
      }

      // Create a new playlist
      const playlist = await PlaylistModel.create(req.body);

      // Save the playlist to the database

      return res.status(201).json(playlist);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  getPlaylistById: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the playlist by ID and populate the creater data also
      const playlist = await PlaylistModel.findById(id)
        .populate("creator").populate('songs')
        .exec();

      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      return res.status(200).json(playlist);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getPlaylistsByCreatorId: async (req, res) => {
    try {
      const { creatorId } = req.params;
      console.log("creator", creatorId);

      // Find all playlists with the specified creator ID

      const playlists = await PlaylistModel.find({ creator: creatorId });

      return res.status(200).json(playlists);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getPlaylists: async (req, res) => {
    try {
      const playlists = await PlaylistModel.find({}).populate("creator").populate("songs").exec();
      res.status(200).json(playlists);
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = playlistCongroller;
