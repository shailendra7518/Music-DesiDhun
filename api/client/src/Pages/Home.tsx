import React,{useEffect,useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { startSong, addSongInList, addInPlaylist } from "../Redux/features/songSlice";
import { Link } from "react-router-dom";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
// HomePage.tsx


const Home: React.FC = () => {
  const dispatch = useDispatch();
const [loading,setLoading]=useState(false)
  
const {songList=[],playList=[]}=useSelector((state:any)=>state.song)

 useEffect(() => {
   const fetchSongs = async () => {
     try {
       setLoading(true)
       const res = await fetch(`${apiUrl}/api/songs/get`);
       const data = await res.json();
       console.log(data);
       dispatch(addSongInList(data.songs))
      //  setSongs(data.songs);
       setLoading(false)
     } catch (error) {
       setLoading(false)
       console.log(error);
     }
   };

 const fetchPlaylists = async () => {
   try {
      setLoading(true);
     const res = await fetch(`${apiUrl}/api/playlists/getall`);
     const data = await res.json();
     console.log(data);
       
     dispatch(addInPlaylist(data))
      
      setLoading(false);
   } catch (error) {
      setLoading(false);
     console.log(error);
   }
 };

   fetchSongs();
   fetchPlaylists();
 }, []);
  
  
  const handlePlay = (song:any)=>{
    
  dispatch(startSong(song))


  }

  console.log(playList)
  
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="p-2 pb-32 mt-16 sm:mt-0">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Recommended Music
        </h2>
        <div className="flex flex-wrap  gap-4">
          {songList.length > 0 &&
            songList.map((song: any) => (
              <div
                onClick={() => handlePlay(song)}
                key={song._id}
                className="bg-rose-100 w-60 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform"
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className=" h-32 w-full object-cover mb-2 "
                />
                <p className=" font-semibold mb-1 truncate">{song.title}</p>
                <p className="text-gray-500">{song.artist}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Recommended Playlists
        </h2>
        <div className="flex flex-wrap  gap-4">
          {playList.length > 0 &&
            playList.map((list: any) => (
              <Link to={`/playlist/${list.playlist._id}`}>
                <div
                  onClick={() => handlePlay(list)}
                  key={list.playlist._id}
                  className="bg-rose-100 w-60 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform"
                >
                  <img
                    src={`https://placehold.co/600x400?text=${list?.playlist.name}`}
                    alt={list.playlist.name}
                    className=" h-32 w-full object-cover mb-2 "
                  />
                  <p className=" font-semibold mb-1 truncate">
                    {list.playlist.name}{" "}
                    <span className="text-red-600 ml-2">
                      Songs:{" "}
                      <span className="text-green-400">
                        {list.playlist.songs.length}
                      </span>
                    </span>
                  </p>
                  <p className=" font-semibold mb-1 truncate">
                    Created By
                    <span className="text-red-600 ml-2">
                      {list.creater.username}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recommended Albums</h2>
        <div className="flex  md:flex-wrap gap-4">
          <div className="bg-white w-auto p-4 shadow-lg rounded-lg mb-4">
            <img
              src={"http://via.placeholder.com/640x360"}
              alt={"title"}
              className="w-full h-32 object-cover mb-2"
            />
            <p className="text-xl font-semibold mb-1">title</p>
            <p className="text-gray-500">artist</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


