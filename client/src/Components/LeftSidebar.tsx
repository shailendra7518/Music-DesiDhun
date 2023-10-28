import React from "react";
import { Link } from "react-router-dom";
import { MdFeaturedPlayList, MdOutlineMic, MdMusicNote } from "react-icons/md";
import { BiPhotoAlbum, BiSolidCalendarStar } from "react-icons/bi";
import { FiRadio } from 'react-icons/fi';
import { AiFillHeart } from 'react-icons/ai'
import {CgBrowse} from 'react-icons/cg'
import { useSelector } from "react-redux";
const LeftSidebar = () => {
  const {currentUser} = useSelector((state: any) => state.user)
  
  return (
    <div className="bg-gray-800">
      {/* Profile Section */}
      <Link to={"/profile"}>
        <div className="flex items-center bg-slate-700 mt-5 p-2 rounded-md">
          <img
            src={currentUser &&currentUser.user.avatar } // Replace with actual profile image source
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 "
          />
          <div>
            <p className="text-white font-semibold text-sm">{ currentUser && currentUser.user.username}</p>
            <p className="text-gray-400 text-xs">Premium User</p>
          </div>
        </div>
      </Link>

      {/* Library Section */}
      <div className=" mt-10">
        <p className="text-white font-semibold text-lg mb-2">Library</p>
        <div className="">
          <Link
            to={"/playlist"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800 "
          >
            <MdFeaturedPlayList />
            <p className="text-lg">Playlist</p>
          </Link>

          <Link
            to={"/artist"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <MdOutlineMic />
            <p className="text-lg">Artist</p>
          </Link>

          <Link
            to={"/album"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <BiPhotoAlbum />
            <p className="text-lg">Album</p>
          </Link>

          <Link
            to={"/song"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <MdMusicNote />
            <p className="text-lg">Song</p>
          </Link>
        </div>
      </div>

      {/* Discover Section */}
      <div className=" mt-10">
        <p className="text-white font-semibold text-lg mb-2">Discover</p>
        <div className="">
          <Link
            to={"/store"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800 "
          >
            <BiSolidCalendarStar />
            <p className="text-lg">Store</p>
          </Link>

          <Link
            to={"/radio"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <FiRadio />
            <p className="text-lg">Radio</p>
          </Link>

          <Link
            to={"/"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <AiFillHeart />
            <p className="text-lg">For You</p>
          </Link>

          <Link
            to={"/browse"}
            className="p-2 text-2xl flex items-center gap-3 text-white opacity-70 hover:opacity-95 font-semibold ml-4 hover:bg-green-800"
          >
            <CgBrowse />
            <p className="text-lg">Browse</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
