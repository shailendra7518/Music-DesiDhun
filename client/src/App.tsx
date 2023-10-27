import { Route, Routes } from 'react-router'
import LeftSidebar from './Components/LeftSidebar'
import Home from './Pages/Home'
import Album from './Pages/Album'
import SignUp from './Pages/Authentication';
import Browse from './Pages/Browse';
import Playlist from './Pages/Playlist';
import Profile from './Pages/Profile';
import Artist from './Pages/Artist';
import Player from './Pages/Player';
import Songs from './Pages/Songs';

function App() {
  

  return (
    <>
      <LeftSidebar />
      <div  className="fixed text-white min-h-screen bg-gradient-to-b from-red-800 to-slate-700 initial min-w-full ml-[256px] ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album" element={<Album />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/player" element={<Player />} />
          <Route path="/song" element={<Songs />} />
        </Routes>
      </div>
      <Player/>
    </>
  );
}

export default App
