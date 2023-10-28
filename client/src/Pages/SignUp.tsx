import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import GoogleAuth from "../Components/GoogleAuth";
import { useSelector } from "react-redux";
const apiUrl: string = import.meta.env.VITE_API_BASE_URL;
interface FormData {
  username: string;
  email: string;
  password: string;
}


const SignUp:React.FC=()=> {
  const initialState: FormData = {
    username: "",
    email: "",
    password: "",
  };
  const {currentUser}=useSelector((state:any)=>state.user)
  const [formData, setFormData] = useState(initialState);
  const Navigate = useNavigate();
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };





  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("signin", formData);
    console.log(apiUrl);
    try {
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
        setFormData(initialState);
        Navigate('/signin')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl text-center uppercase font-semibold mt-7 text-white">
        Sign Up
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 items-center justify-center gap-5 w-2/5"
      >
        <input
          onChange={handleChange}
          className="p-4 min-w-full rounded-md outline-none
           bg-slate-600 text-white
            "
          id="username"
          type="text"
          placeholder="username"
        />

        <input
          onChange={handleChange}
          className="p-4 min-w-full rounded-md outline-none
         
             bg-slate-600
             text-white
            "
          id="email"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          className="p-4 min-w-full rounded-md outline-none
           
            bg-slate-600
            text-white
            "
          id="password"
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="p-4 min-w-full rounded-md outline-none
            bg-slate-700 font-semibold text-white hover:opacity-70
            uppercase
            "
        >
          Sign Up
        </button>
        <GoogleAuth/>
      </form>

      <div className="text-white">
        Have an account ?
        <Link to={'/signin'}>
          <span className="text-blue-400 cursor-pointer hover:underline ml-2">
            Sign In
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
