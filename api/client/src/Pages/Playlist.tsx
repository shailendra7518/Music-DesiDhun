import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// const apiUrl: string =import.meta.env.VITE_API_BASE_URL;
function Playlist() {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [playListName, setPlayListName] = useState("");
  const { currentUser } = useSelector((state: any) => state.user);
  const [PlayLists, setPlayLists] = useState([]);

  // console.log(currentUser)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayListName(e.target.value);
  };

  const fetchPlaylists = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/playlists/getall`);
      const data = await res.json();
      console.log(data);

      setPlayLists(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/playlists/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: currentUser.token,
        },
        body: JSON.stringify({
          name: playListName,
          creator: currentUser.user._id,
        }),
      });

      const data = await res.json();
      console.log(data);
      toast.success(`Playlist ${playListName} created`);

      setPlayListName("");
      Navigate("/");
    } catch (error) {
      setPlayListName("");
      toast.error("Failed in Creating plalist");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return isLoading? (<h1 className="text-5xl text-white text-center mt-20">Loading</h1>) :(
    <div className=" flex flex-col text-center  justify-start items-center">
      <div className=" p-2 rounded-lg bg-slate-700  mt-20  sm:mt-4">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between gap-2  bg-slate-700 "
        >
          <input
            onChange={handleChange}
            type="text"
            placeholder="Playlist Name"
            id="name"
            className=" p-3 rounded-lg outline-none  sm:w-auto sm:p-0 bg-slate-700 text-white"
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
        <div className="flex flex-wrap gap-4 items-start justify-start">
          {PlayLists.length > 0 &&
            PlayLists.map((playlist: any) => (
              <Link to={`/playlist/${playlist._id}`}>
                <div
                  key={playlist._id}
                  className="bg-rose-100 w-60 p-4 shadow-lg rounded-lg mb-4 cursor-pointer transform hover:scale-105 transition-transform text-left"
                >
                  <img
                    src={`https://placehold.co/600x400?text=${playlist?.name}`}
                    alt={playlist.name}
                    className=" h-32 w-full object-cover mb-2 "
                  />
                  <p className=" font-semibold mb-1 truncate">
                    {playlist.name}
                    <span className="text-red-600 ml-2">
                      Songs:
                      <span className="text-green-400 ml-2">
                        {playlist.songs.length}
                      </span>
                    </span>
                  </p>
                  <p className=" font-semibold mb-1 truncate">
                    Created By
                    <span className="text-red-600 ml-2">
                      {playlist.creator.username}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
