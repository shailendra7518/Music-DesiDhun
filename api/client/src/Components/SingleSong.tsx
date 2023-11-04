import { useState } from "react";

// const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
import { startSong } from "../Redux/features/songSlice";
import { useDispatch } from "react-redux";

interface Song {
  album: string;
  cover: string;
  title: string;
  artist: string;
  file: string;
  uploadedBy: string;
  __v: number;
  _id: string;
}

function SingleSong({ song,playlistId, handleDeleteSongById }: any) {



  const dispatch = useDispatch();


  const handlePlay = () => {
    dispatch(startSong(song));
    console.log(song);
  };


  const handleDelete = () => {
    handleDeleteSongById(song._id, playlistId);
  };

  return(
    <div
      key={song?._id}
      className="bg-rose-100 w-60 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform"
    >
      <img
        onClick={handlePlay}
        src={song.cover}
        alt={song.title}
        className=" h-32 w-full object-cover mb-2 "
      />
      <p className=" font-semibold mb-1 truncate">{song.title}</p>
      <p className="text-gray-500 truncate">{song.artist}</p>
      <p
        onClick={handleDelete}
        className="bg-red-600 text-white font-semibold mt-2 rounded-lg p-2"
      >
        Delete
      </p>
    </div>
  );
}

export default SingleSong;
