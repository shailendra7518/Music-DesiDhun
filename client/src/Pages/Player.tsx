import React, { useState} from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from "react-icons/fa6";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb'
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMute, setIsMute] =useState(false)
  
  // Initial volume value

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
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
          src="https://firebasestorage.googleapis.com/v0/b/real-state-f5edf.appspot.com/o/1698230464630tinywow_WhatsApp_Image_2022-10-21_at_20.17.21_34219904-removebg-preview.png?alt=media&token=eed29ef6-edfb-43b9-9503-2d6e22650eb3" 
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