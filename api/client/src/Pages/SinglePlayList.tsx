import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import SingleSong from "../Components/SingleSong";
import { toast } from "react-toastify";
interface PlayList {
  creater: {};
  name: string;
  _id: string;
  __v: number;
  songs: [];
}

function SinglePlayList() {
  const { currentUser } = useSelector((state: any) => state.user);

  const params = useParams();
  // get id from params to fetch single playlists
  const { id } = params;

  // isloading to handle loading
  const [isLoading, setIsLoading] = useState(false);
  // store the single playlist here after fetching it by id
  const [PlayList, setPlayList] = useState<PlayList>({
    creater: {},
    name: "",
    _id: "",
    __v: 0,
    songs: [],
  });

  // make a get request when you come first time in this page
  useEffect(() => {
    if (id) {
      fetchPlayListById();
    }
  }, []);

  // here make get request by id to get single playlist;
  const fetchPlayListById = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/playlists/get/${id}`);
      const data = await res.json();
      // set the single playlist in the pice of state
      setPlayList(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("playlist not found");
    }
  };

  const deleteSongById = async (songId: any, playlistId: any) => {
    try {
      const res = await fetch(`/api/playlists/${playlistId}/song/${songId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: currentUser.token,
        },
      });
      const data = await res.json();
      console.log(data);

      toast.success(`Song is deleted`);
      fetchPlayListById();
    } catch (error) {
      toast.error("Failed in deleting song");
      console.log(error);
    }
  };
  return isLoading ? (
    <h1 className="text-5xl text-white text-center mt-20">Loading</h1>
  ) : (
    <div className=" flex flex-col text-center  w-full sm:w-auto">
      <div className="p-4">
        <h2 className="text-2xl mb-4 text-white font-semibold">
          {PlayList.name}
        </h2>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {PlayList.songs.length == 0 && (
            <h1 className="text-5xl text-center text-white">No Songs</h1>
          )}
          {PlayList.songs.length > 0 &&
            PlayList.songs.map((song: any) => (
              <SingleSong
                key={song._id}
                song={song}
                playlistId={PlayList._id}
                handleDeleteSongById={deleteSongById}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SinglePlayList;
