
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { startSong } from '../Redux/features/songSlice';
function SearchResult() {
  const dispatch = useDispatch();

// urlparmas for geting the query from url
const {searchTerm}=useSelector((state:any)=>state.song)
  // store the songs in a piece of state
 const [songs,setSongs]=useState([])
  
    useEffect(() => {
      fetchSongsBySearch();
  }, [searchTerm])
  
  // fetchSongsBySearch to get song based on query 
  const fetchSongsBySearch = async() => {
    try {
       
      const res = await fetch(`api/songs/search?query=${searchTerm}`)
      const data = await res.json();
      setSongs(data)
      
    } catch (err) {
      toast.error("Not found")
      console.log(err)
    }
  }
// function to play song
   const handlePlay = (song: any) => {
     dispatch(startSong(song));
   };
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 text-white font-semibold">Search Result</h2>
      { songs.length==0 &&<h1 className='text-white text-5xl text-center'>Songs Not Found</h1>}
      <div className="flex flex-wrap gap-4 items-start justify-start">
        {songs.length > 0 &&
          songs.map((song: any) => (
          
            <div
              onClick={()=>handlePlay(song)}
                key={song._id}
                className="bg-rose-100 w-60 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform text-left"
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className=" h-32 w-full object-cover mb-2 "
                />
                <p className=" font-semibold mb-1 truncate">
                  {song.title}
                  
                </p>
                <p className=" font-semibold mb-1 truncate">
                   {song.artist}
                  
                </p>
              </div>
          
          ))}
      </div>
    </div>
  );
}

export default SearchResult