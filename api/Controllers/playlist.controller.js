const PlaylistModel = require("../Models/playlist.model");
const SongModel = require("../Models/song.model");

const playlistCongroller = {
    addToPlaylist: async (req, res) => {
        const { playlistId, songId } = req.body;

        try {
            const playlist = await PlaylistModel.findById(playlistId);
            const song = await SongModel.findById(songId);

            if (!playlist || !song) {
                return res.status(404).json({ message: "Playlist or Song not found" });
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
    createPlaylist : async (req, res) => {

        try {
            // Check if the name is provided
            if (!req.body.name || !req.body.creater_ref) {
      return res.status(400).json({ message: 'Name is required for creating a playlist.' });
    }

    // Create a new playlist
    const playlist = await PlaylistModel.create(req.body);

    // Save the playlist to the database


    return res.status(201).json(playlist);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}


}
module.exports = playlistCongroller;
