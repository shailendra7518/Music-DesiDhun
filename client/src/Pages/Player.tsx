import { useState, useEffect } from 'react'
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
import { FaPlay } from 'react-icons/fa'
import { FaPause } from "react-icons/fa6";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb'
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { playSong ,pauseSong} from '../Redux/features/songSlice';

function Player() {
  const [volume, setVolume] = useState(50);
  const [isMute, setIsMute] = useState(false) 
  const {currentSong, isPlaying}=useSelector((state:any)=>state.song)
  const dispatch=useDispatch()
  // Initial volume value
    const [songs, setSongs] = useState<any>([]);
    useEffect(() => {
      const fetchSongs = async () => {
        try {
          const res = await fetch(`${apiUrl}/api/songs/get`);
          const data = await res.json();
          console.log(data);
          setSongs(data.songs);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSongs();
    }, []);

  const togglePlay = () => {
    if (isPlaying) {
      dispatch(pauseSong())
    } else {
        dispatch(playSong(songs[0]));
    }
   
  };

  const handleNext = () => {
    // Logic for playing the next song
  };

  const handlePrevious = () => {
    // Logic for playing the previous song
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="absolute inset-x-0 bottom-0 h-16 flex items-center justify-between pl-2 pr-2 bg-slate-700 ">

      <div className="flex items-center">
        <img
          src='' 
          alt="Album Cover"
          className="w-12 h-12 rounded mr-4"
        />
        <div>
          <p className="text-white font-semibold">Song Title</p>
          <p className="text-gray-400">Artist Name</p>
        </div>
      </div>

      <div className="flex gap-4 ">
        <button className=" text-white  text-2xl " onClick={handlePrevious}>
          <TbPlayerTrackPrevFilled />
        </button>
        <button
          className="bg-red-500 p-4 rounded-3xl text-2xl  text-white"
          onClick={togglePlay}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="text-white text-2xl " onClick={handleNext}>
          <TbPlayerTrackNextFilled />
        </button>
      </div>

      <div className="flex items-center">
        <button
          className="text-white text-2xl"
          onClick={() => setIsMute(!isMute)}
        >
          {isMute ? <HiSpeakerXMark /> : <HiSpeakerWave />}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="ml-4"
        />
      </div>
    </div>
  );
}

export default Player