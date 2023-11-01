import React,{useState} from 'react'
import { useSelector } from 'react-redux';
const apiUrl: string =import.meta.env.VITE_API_BASE_URL;
function Playlist() {
  const [playListName,setPlayListName]=useState('')
  const { curretUser } = useSelector((state: any) => state.user)
   const playlists = [
     {
       _id: 1,
       name: "Playlist 1",
       cover: "http://via.placeholder.com/640x360",
       creater:'you'
     },
     {
       _id: 2,
       name: "Playlist 2",
       cover: "http://via.placeholder.com/640x360",
       creater:'you'
     },
     // Add more playlists as needed
   ];





  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setPlayListName(e.target.value)
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res =await fetch(`${apiUrl}/api/playlists/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: curretUser.token
        },
        body:JSON.stringify({name:playListName,creater_ref:curretUser.user._id})
      })

      const data = await res.json();
      console.log(data)
      setPlayListName('')
    } catch (error) {
      setPlayListName('')
      console.log(error)
    }
  }


  return (
    <div className=" flex flex-col text-center  w-full sm:w-auto">
      <div className=" p-2 rounded-lg bg-slate-700  mt-20  sm:mt-4">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between gap-2  bg-slate-700 w-full sm:w-auto"
        >
          <input
            onChange={handleChange}
            type="text"
            placeholder="Playlist Name"
            id="name"
            className=" p-3 rounded-lg outline-none w-full sm:w-auto sm:p-0 bg-slate-700 text-white"
          />
          <button
            type="submit"
            className="bg-slate-700 p-3 rounded-lg uppercase font-semibold text-white"
          >
            Create
          </button>
        </form>
      </div>

      <div className="p-4">
        <h2 className="text-2xl mb-4 text-white font-semibold">Playlists</h2>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {playlists.map((playlist) => (
            <div
              
              key={playlist._id}
              className="bg-rose-100 w-60 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform"
            >
              <img
                src={playlist.cover}
                alt={'coverImage'}
                className=" h-32 w-full object-cover mb-2 "
              />
              <p className=" font-semibold mb-1 truncate">{playlist.name}</p>
              <p className="text-gray-500">{playlist.creater}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist