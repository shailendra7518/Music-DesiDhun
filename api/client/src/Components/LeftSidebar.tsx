
import { Link } from "react-router-dom";
import { MdFeaturedPlayList, MdOutlineMic, MdHome ,MdUpload } from "react-icons/md";
import {BiSolidCalendarStar } from "react-icons/bi";
import { FiRadio } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai'
import {CgBrowse} from 'react-icons/cg'
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
const LeftSidebar = () => {
  const {currentUser} = useSelector((state: any) => state.user)
  return (
    <div className="bg-gray-800 pt-2 min-h-screen  w-16 sm:w-auto sm:pl-2">
      {/* Profile Section */}

      <div className="flex items-center gap-3 left-0  mt-1  rounded-md ">
        <Link to={"/"}>
          <div className="hidden sm:block">
            <p className="text-cyan-400  bg-slate-700 p-2 rounded-lg font-semibold text-2xl truncate">
              DesiDhun
            </p>
          </div>
        </Link>
        {currentUser ? (
          <Link to={"/profile"} className="z-10" >
            <img
              className="w-10 h-10 rounded-full mr-3 hover:scale-110 "
              src={currentUser && currentUser.user.avatar}
              alt="Profile"
            />
          </Link>
        ) : (
          <Link
            to={"/signup"}
            className="text-white flex items-center justify-center bg-slate-700  p-2 rounded-md"
          >
            SignIn
          </Link>
        )}
      </div>

      <div className="hidden  sm:flex">
        <SearchBar />
      </div>

      {/* Library Section */}
      <div className=" mt-3 ">
        <p className="text-white font-semibold text-lg mb-2  hidden sm:block">
          Library
        </p>
        <div className="">
          <Link
            to={"/"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800 "
          >
            <MdHome />
            <p className="text-lg hidden sm:block">Home</p>
          </Link>

          <Link
            to={"/song"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <MdOutlineMic />
            <p className="text-lg  hidden sm:block">Songs</p>
          </Link>

          <Link
            to={"/playlist"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <MdFeaturedPlayList />
            <p className="text-lg  hidden sm:block">Playlist</p>
          </Link>

          <Link
            to={"/upload"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <MdUpload />
            <p className="text-lg  hidden sm:block">Upload</p>
          </Link>
        </div>
      </div>

      {/* Discover Section */}
      <div className=" mt-10">
        <p className="text-white font-semibold text-lg mb-2  hidden sm:block">
          Discover
        </p>
        <div className="">
          <Link
            to={"/store"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800 "
          >
            <BiSolidCalendarStar />
            <p className="text-lg  hidden sm:block">Store</p>
          </Link>

          <Link
            to={"/radio"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <FiRadio />
            <p className="text-lg  hidden sm:block">Radio</p>
          </Link>

          <Link
            to={"/"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <AiFillHeart />
            <p className="text-lg  hidden sm:block">For You</p>
          </Link>

          <Link
            to={"/browse"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <CgBrowse />
            <p className="text-lg  hidden sm:block">Browse</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
