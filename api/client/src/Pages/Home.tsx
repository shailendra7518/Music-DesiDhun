import {useEffect,useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { startSong, addSongInList, addInPlaylist } from "../Redux/features/songSlice";
import { Link } from "react-router-dom";

const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
// HomePage.tsx
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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



   const responsive = {
     superLargeDesktop: {
       // the naming can be any, depends on you.
       breakpoint: { max: 4000, min: 3000 },
       items: 5,
     },
     desktop: {
       breakpoint: { max: 3000, min: 1024 },
       items: 4,
     },
     tablet: {
       breakpoint: { max: 1024, min: 464 },
       items: 3,
     },
     mobile: {
       breakpoint: { max: 464, min: 0 },
       items: 1,
     },
   };

  
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="p-2 pb-32 mt-16 max-w-xl md:max-w-5xl sm:max-w-5xl sm:mt-0">
      <section className="mb-8 ">
        <h1 className="text-2xl font-semibold mb-4 text-white">
          Recommended Music
        </h1>
        {/* <div className="flex flex-wrap  gap-4"> */}
        <Carousel className=" gap-4" responsive={responsive}>
          {songList.length > 0 &&
            songList.map((song: any) => (
              <div
                onClick={() => handlePlay(song)}
                key={song._id}
                className="bg-rose-100 w-full h-96 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform sm:w-60 sm:h-60"
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className=" h-56 w-full object-cover mb-2 sm:h-32 "
                />
                <p className=" font-semibold mb-1 truncate">{song.title}</p>
                <p className="text-gray-500">{song.artist}</p>
              </div>
            ))}
        </Carousel>
      </section>

      <section className="mb-8">
        <h1 className="text-2xl font-semibold mb-4 text-white">
          Recommended Playlists
        </h1>
        <Carousel className=" w-full gap-4" responsive={responsive}>
          {playList.length > 0 &&
            playList.map((list: any) => (
              <Link to={`/playlist/${list.playlist._id}`}>
                <div
                  onClick={() => handlePlay(list)}
                  key={list.playlist._id}
                  className="bg-rose-100 w-full h-96 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform sm:w-60 sm:h-60"
                >
                  <img
                    src={`https://placehold.co/600x400?text=${list?.playlist.name}`}
                    alt={list.playlist.name}
                    className=" h-56 w-full object-cover mb-2 sm:h-32"
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
        </Carousel>
      </section>

      <section>
        <h1 className="text-2xl font-semibold mb-4 text-white">
          Recommended Albums
        </h1>
        <Carousel className=" w-full gap-4" responsive={responsive}>
          {songList.length > 0 &&
            songList.map((song: any) => (
              <div
                onClick={() => handlePlay(song)}
                key={song._id}
                className="bg-rose-100 w-full h-96 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform sm:w-60 sm:h-60"
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="h-56 w-full object-cover mb-2 sm:h-32"
                />
                <h2 className="text-red-950 text-lg font-semibold">
                  {song.album}
                </h2>
              </div>
            ))}
        </Carousel>
      </section>
    </div>
  );
};

export default Home;


