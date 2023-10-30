import { Route, Routes } from "react-router";
import LeftSidebar from "./Components/LeftSidebar";
import Home from "./Pages/Home";
import Album from "./Pages/Album";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Browse from "./Pages/Browse";
import Playlist from "./Pages/Playlist";
import Profile from "./Pages/Profile";
import Artist from "./Pages/Artist";
import Player from "./Pages/Player";
import Songs from "./Pages/Songs";
import PrivateRoute from "./Components/PrivateRoute";
import UploadSong from "./Components/UploadSong";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const {isPlaying,player}=useSelector((state:any)=>state.song)
  return (
    <>
      <div className="flex">
        {/* <!-- Left Sidebar --> */}
        <div className=" h-screen fixed bg-gray-800 pr-10 pl-6 z-10">
          <LeftSidebar />
        </div>

        <div
          
          
          className=" h-screen fixed overflow-scroll  bg-gradient-to-b from-red-900 to-slate-600 flex-1 min-h-screen left-[238px] pb-16 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/album" element={<Album />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/playlist" element={<Playlist />} />

            <Route path="/artist" element={<Artist />} />
            <Route path="/player" element={<Player />} />
            <Route path="/song" element={<Songs />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload" element={<UploadSong />} />
            </Route>
          </Routes>
        </div>
      </div>

      <div className="fixed w-full z-20 text-white bottom-0">{player && <Player />}</div>
    </>
  );
}

export default App;
