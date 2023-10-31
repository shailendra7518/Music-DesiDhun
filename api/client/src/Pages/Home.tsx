import React,{useEffect,useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {startSong,addSongInList } from "../Redux/features/songSlice";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
// HomePage.tsx
    console.log(apiUrl)

const Home: React.FC = () => {
  const dispatch = useDispatch();
const [loading,setLoading]=useState(false)
  
const {songList=[]}=useSelector((state:any)=>state.song)

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
   fetchSongs();
 }, []);
  
  
  const handlePlay = (song:any)=>{
    
  dispatch(startSong(song))


  }
  
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="p-1 pb-32">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Recommended Music</h2>
        <div className="flex flex-wrap  gap-4">
          {songList.length>0 &&
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
        <h2 className="text-2xl font-semibold mb-4">Recommended Playlists</h2>
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


