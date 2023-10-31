import { useState, useEffect,useRef } from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from "react-icons/fa6";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb'
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import ReactAudioPlayer from "react-audio-player";
import { pauseSong,playSong, startSong } from '../Redux/features/songSlice';
function Player() {
    const { currentSong, isPlaying, songList=[] } = useSelector(
      (state: any) => state.song
    );
  const [volume, setVolume] = useState(50);
  const [isMute, setIsMute] = useState(false) 
  const [songIndex,setSongIndex]=useState(songList.length/2 || 0)
  const [currentTime, setCurrentTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds:0,
  });
  const [durationTime, setDurationTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const audioRef = useRef<any | null>(null);

  const dispatch =useDispatch()

  const handleTimeUpdate = () => {
    setCurrentTime(formatTime(audioRef.current.audioEl.current.currentTime));
    setDurationTime(formatTime(audioRef.current.audioEl.current.duration));
    
  };
  // console.log(duration)

 const handleNext = () => {
    // Logic for playing the next audio track
   // Replace this with your own logic
 console.log('worked')
   if (songIndex + 1 < songList.length) {
     
     dispatch(startSong(songList[songIndex + 1]));
     setSongIndex(songIndex+1)
   }
  };

  const handlePrevious = () => {
     console.log("worked");
      if (songIndex - 1 >=0) {
        dispatch(startSong(songList[songIndex - 1]));
        setSongIndex(songIndex-1)
      }
    // Logic for playing the previous audio track
    // Replace this with your own logic
  };

 
  const handleEnded = () => {
    console.log('ended')
     if (songIndex + 1 < songList.length) {
       handleNext();
     } else {
       handlePrevious();
     }
}

  const togglePlay = () => {
    if (isPlaying) {
      dispatch(pauseSong())     
      audioRef.current.audioEl.current.pause();
    } else {
      dispatch(playSong());
         audioRef.current.audioEl.current.play();
    }
   
  };
  useEffect(() => {
      dispatch(pauseSong());
  },[])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };
    

  const  formatTime=(totalSeconds:number) =>{
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 1000);

   return {minutes,seconds,milliseconds}
  }
  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-auto flex flex-col items-center justify-between pl-2 pr-2 bg-gray-800 pb-2 sm:flex-row sm:h-16">
        <div className="flex items-center justify-between  mb-2 w-full flex-row sm:mb-0 sm:w-1/3 sm:justify-start">
          <img
            src={currentSong.cover}
            alt="Album Cover"
            className="w-12 h-12 rounded mr-4"
          />
          <div>
            <p className="text-white font-semibold truncate w-44">
              {currentSong.title}
            </p>
            <p className="text-gray-400 ">{currentSong.artist}</p>
          </div>
          <div className='flex   sm:hidden '>
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
              className="ml-4 outline-none w-full"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full sm:w-1/3 ">
          <div className="  flex gap-4">
            <button
              disabled={songIndex <= 0}
              className=" text-white hover:opacity-70 cursor-pointer  text-2xl disabled:opacity-40 "
              onClick={handlePrevious}
            >
              <TbPlayerTrackPrevFilled />
            </button>
            <button
              className="bg-red-500 p-4 rounded-3xl text-2xl  text-white"
              onClick={togglePlay}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="text-white hover:opacity-70 cursor-pointer text-2xl disabled:opacity-40 "
              onClick={handleNext}
              disabled={songIndex >= songList.length - 1}
            >
              <TbPlayerTrackNextFilled />
            </button>
          </div>

          <div className=" flex w-full pb-2 item-center">
            <span className="mr-3">
              {currentTime.minutes}:{currentTime.seconds}
            </span>
            <input
              type="range"
              min={0}
              max={durationTime.minutes * 60 + durationTime.seconds}
              value={currentTime.minutes * 60 + currentTime.seconds}
              className="w-full  bg-gray-300 rounded-full  focus:outline-none"
            />
            <span className="pl-3">
              {durationTime.minutes}:{durationTime.seconds}
            </span>
          </div>
        </div>

        <div className="hidden  items-center w-1/3 justify-end  sm:flex">
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
            className="ml-4 outline-none"
          />
        </div>

        <div className="hidden">
          <ReactAudioPlayer
            ref={audioRef}
            src={currentSong.file}
            autoPlay
            controls
            loop={false}
            volume={isMute ? 0 : volume / 100}
            listenInterval={1000}
            onListen={handleTimeUpdate}
            onEnded={handleEnded}
          />
        </div>
      </div>
    </>
  );
}
export default Player
