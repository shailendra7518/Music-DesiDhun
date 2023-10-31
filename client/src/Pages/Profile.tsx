import {useRef } from "react";

import { Link } from "react-router-dom";

function Profile() {
  const fileRef = useRef(null);

  return (
    <div className="p-3 max-w-lg flex flex-col  mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-white uppercase">Profile</h1>

      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/real-state-f5edf.appspot.com/o/1698230464630tinywow_WhatsApp_Image_2022-10-21_at_20.17.21_34219904-removebg-preview.png?alt=media&token=eed29ef6-edfb-43b9-9503-2d6e22650eb3"
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
       

        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg uppercase outline-none"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg uppercase outline-none"
        />
        <input
          placeholder="password"
          id="password"
          type="password"
          className="border p-3 rounded-lg uppercase outline-none"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-white cursor-pointer">Delete Account</span>
        <span className="text-white cursor-pointer">Sign out</span>
      </div>
      <Link to={'/upload'} className="bg-slate-700 text-center m-auto text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Upload</Link>
    </div>
  );
}

export default Profile;
