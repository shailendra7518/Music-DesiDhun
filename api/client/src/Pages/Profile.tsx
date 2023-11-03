import {useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
 import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { signOut } from "../Redux/features/authSlice";
function Profile() {
  const fileRef = useRef(null);
  const dispatch=useDispatch()
  const {currentUser}=useSelector((state:any)=>state.user)
  const handleSignOut = () => {
    dispatch(signOut())
    toast.warn("User Logged Out")
  }
  return (
    <div className="p-3   flex flex-col w-2/4">
      <h1 className="text-3xl font-semibold text-center my-7 text-white uppercase">
        Profile
      </h1>

      <form className="flex flex-col  gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          src={currentUser && currentUser.user.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 bg-slate-600"
        />

        <input
          type="text"
          placeholder="username"
          id="username"
          className=" p-3 rounded-lg uppercase outline-none bg-slate-600"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className=" p-3 rounded-lg uppercase outline-none bg-slate-600"
        />
        <input
          placeholder="password"
          id="password"
          type="password"
          className=" p-3 rounded-lg uppercase outline-none bg-slate-600"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-70 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-white cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-white cursor-pointer">
          Sign out
        </span>
      </div>
      <Link
        to={"/upload"}
        className="bg-slate-700 text-center m-auto text-white rounded-lg p-3 uppercase hover:opacity-70 disabled:opacity-70"
      >
        Upload
      </Link>
    </div>
  );
}

export default Profile;
