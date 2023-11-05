import { Route, Routes } from "react-router";
import LeftSidebar from "./Components/LeftSidebar";
import Home from "./Pages/Home";
import Album from "./Pages/Album";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Browse from "./Pages/Browse";
import Playlist from "./Pages/Playlist";
import Profile from "./Pages/Profile";
import Player from "./Pages/Player";
import Songs from "./Pages/Songs";
import PrivateRoute from "./Components/PrivateRoute";
import UploadSong from "./Components/UploadSong";
import { useSelector } from "react-redux";
import SearchBar from "./Components/SearchBar";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "./Redux/features/authSlice";
import SingleSong from "./Components/SingleSong";
import SinglePlayList from "./Pages/SinglePlayList";
import SearchResult from "./Pages/SearchResult";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      dispatch(signOut());
    }
  }, []);

  const { player } = useSelector((state: any) => state.song);
  return (
    <div className="bg-gradient-to-b from-red-900 to-slate-600 min-h-screen">
      <div className=" flex w-full items-center fixed z-10 justify-center sm:hidden">
        <SearchBar />
      </div>
      <div className="flex">
        {/* <!-- Left Sidebar --> */}

        <LeftSidebar />

        <div className="flex flex-1 justify-center pb-40 bg-gradient-to-b from-red-900 to-slate-600">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/song" element={<Songs />} />
            <Route path="/song/:id" element={<SingleSong />} />
            <Route path="/playlist/:id" element={<SinglePlayList />} />
            <Route path="/player" element={<Player />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/album" element={<Album />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/upload" element={<UploadSong />} />
            </Route>
          </Routes>
        </div>
      </div>

      <div className="fixed w-full z-20 text-white bottom-0">
        {player && <Player />}
      </div>
    </div>
  );
};

export default App;
