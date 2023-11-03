import { useDispatch, useSelector } from "react-redux";
import { startSong } from "../Redux/features/songSlice";
import React,{ useEffect, useState } from "react";
// const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
import { toast } from 'react-toastify';
const Songs =() => {
  const { songList ,playList} = useSelector((state: any) => state.song)
  const { currentUser } = useSelector((state: any) => state.user)
  
  const [myPlaylList,setMyPlayList]=useState([])
  const dispatch = useDispatch();

  const handlePlay = (song:any) => {
    dispatch(startSong(song));
  }
  const addSongInPlalist = async(e:React.ChangeEvent<HTMLSelectElement>) => {
    
    const songId = e.target.id;
    const playlistId = e.target.value
   
    try {
      const res = await fetch(`/api/playlists/addtoplaylist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token':currentUser.token
        },
        body: JSON.stringify({ playlistId: playlistId, songId: songId })
        
      })
      const data = await res.json();
      toast.success(`Song added in playlist`)
        console.log(data)
    } catch (error) {
      toast.error("Failed to add in playlist")
      
      }
    


  }

  useEffect(() => {

    setMyPlayList(playList.filter((list:any)=>(list.playlist.creater_ref===currentUser.user._id)))
  },[])


  return (
    <div className="flex flex-col items-start gap-4 p-4 mt-10 w-full pb-44">
      <div className="hidden flex-col bg-slate-700 text-white font-semibold uppercase content-start gap-2 w-full md:w-3/4 sm:w-2/4 justify-between rounded-lg p-4 sm:flex-row sm:flex ">
        <p className="truncate">Cover</p>
        <p className="truncate">Title</p>
        <p className="truncate">Artist</p>
        <p className="truncate">Album</p>
        <p className="truncate">Like</p>
        <p className="truncate">to playlist</p>
      </div>
      {songList &&
        songList.map((song: any) => (
          <div
            key={song._id}
            onClick={() => handlePlay(song)}
            className="flex flex-col bg-white items-start gap-2 w-full md:w-3/4 sm:w-2/4 justify-between rounded-lg p-4 sm:flex-row sm:items-center font-semibold cursor-pointer hover:bg-slate-200 transform hover:scale-x-90 transition-transform"
          >
            <img
              src={song.cover}
              alt="cover image"
              className="h-40 w-full sm:w-10 sm:h-10 "
            />

            <p className="truncate w-44">
              <span className="text-green-800 mr-3  sm:hidden">Title</span>
              {song.title}
            </p>
            <p className="truncate w-40">
              <span className="text-green-800 mr-3  sm:hidden">Artist</span>
              {song.artist}
            </p>
            <p className="truncate w-40">
              <span className="text-green-800 mr-3  sm:hidden">Albums</span>
              {song.album}
            </p>
            <p className="truncate w-32">
              <span className="text-green-800 mr-3  sm:hidden">Likes</span>
              10
            </p>
            <div className="hover:text-white hover:bg-slate-700">
              <span className="text-green-800 mr-3  sm:hidden">
                Add to Playlist
              </span>
              <select
                onChange={addSongInPlalist}
                id={song._id}
                className="text-white bg-slate-700 outline-none rounded-lg p-1"
              >
                <option className="bg-slate-700 text-white" value="" id="">Select-Playlist</option>
                {myPlaylList.length > 0 && myPlaylList.map((list: any) => (
                  
                  <option key={list.playlist._id} value={list.playlist._id}  >{ list.playlist.name}</option>


                ))}
              </select>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Songs;
