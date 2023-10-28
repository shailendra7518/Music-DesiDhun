import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
const Songs: React.FC = () => {
  const [songs, setSongs] = useState<any>([]);
  const {currentSong,isPlaying}=useSelector((state:any)=>state.song)
//   const [isLoading, setLoading] = useState(false);
//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${apiUrl}/api/songs/get`);
//         const data = await res.json();
//         console.log(data);
//         setSongs(data.songs);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     };
//     fetchSongs();
//   }, []);
// console.log(currentSong,songs)
  return (
    <div>
      {isPlaying && (
        <ReactAudioPlayer src={currentSong.file} autoPlay />
      )}
    </div>
  );
};

export default Songs;
