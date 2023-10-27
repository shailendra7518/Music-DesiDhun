import React, { useState } from "react";

function Authentication() {
  const [isSignIn,setIsSignIn] =useState(false)
  return (
    <div className=" flex flex-col">
      {isSignIn ? (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-center uppercase font-semibold mt-7 text-white">
            Sign in
          </h1>

          <form className="flex flex-col p-8 items-center justify-center gap-5 w-2/5">
            <input
              className="p-4 min-w-full rounded-md outline-none
            uppercase
             bg-slate-600
             text-white
            "
              type="text"
              placeholder="email"
            />
            <input
              className="p-4 min-w-full rounded-md outline-none
            uppercase
            bg-slate-600
            text-white
            "
              type="password"
              placeholder="password"
            />
            <button
              className="p-4 min-w-full rounded-md outline-none
            bg-slate-700 font-semibold text-white hover:opacity-70
            uppercase
            "
            >
              Sign in
            </button>
          </form>
          <div className="text-white">
            Don't an account ?
            <span
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-blue-400 cursor-pointer hover:underline ml-2"
            >
              Sign up
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-center uppercase font-semibold mt-7 text-white">
            Sign Up
          </h1>

          <form className="flex flex-col p-8 items-center justify-center gap-5 w-2/5">
            <input
              className="p-4 min-w-full rounded-md outline-none
            uppercase bg-slate-600 text-white
            "
              type="text"
              placeholder="username"
            />
            <input
              className="p-4 min-w-full rounded-md outline-none
            uppercase
             bg-slate-600
             text-white
            "
              type="text"
              placeholder="email"
            />
            <input
              className="p-4 min-w-full rounded-md outline-none
            uppercase
            bg-slate-600
            text-white
            "
              type="password"
              placeholder="password"
            />
            <button
              className="p-4 min-w-full rounded-md outline-none
            bg-slate-700 font-semibold text-white hover:opacity-70
            uppercase
            "
            >
              Sign Up
            </button>
          </form>
          <div className="text-white">
            Have an account ?
            <span
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-blue-400 cursor-pointer hover:underline ml-2"
            >
              Sign in
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Authentication;
