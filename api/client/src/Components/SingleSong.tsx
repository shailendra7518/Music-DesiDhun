import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
import {
  startSong
} from "../Redux/features/songSlice";
import { useDispatch } from 'react-redux';

interface Song{
  album: string,
  cover: string,
  title: string,
  artist: string,
  file: string,
  uploadedBy: string,
  __v: number,
  _id:string
}


function SingleSong({songId}:any) {
 console.log(songId)
  const [song, setSong] = useState<Song>({
    album: '',
    cover: '',
    title: '',
    artist: '',
    file: '',
    uploadedBy: '',
    __v: 0,
    _id: '',
  });
  const [isLoading,setIsloading]=useState(false)
  const dispatch = useDispatch();
  useEffect(() => {

    const fetchSongById = async () => {
      try {
        setIsloading(true)
        const res = await fetch(`${apiUrl}/api/songs/get/${songId}`)
        const data = await res.json();
        console.log(data)
        setSong(data.song)
        setIsloading(false)
      } catch (error) {
        setIsloading(false)
        console.log(error)
      }
    }
    
      fetchSongById()


           
  }, [])
  
  const handlePlay = () => {
    dispatch(startSong(song))
    console.log(song)
  }
console.log(song)

  return isLoading ? (<h1>Loading...</h1>): (
   
      <div
        onClick={handlePlay}
        key={song?._id}
        className="bg-rose-100 w-60 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform"
      >
        <img
          src={song.cover}
          alt={song.title}
          className=" h-32 w-full object-cover mb-2 "
        />
        <p className=" font-semibold mb-1 truncate">{song.title}</p>
      <p className="text-gray-500 truncate">{song.artist}</p>
      <p className='bg-red-600 text-white font-semibold mt-2 rounded-lg p-2'>Delete</p>
    </div>
  );
}

export default SingleSong