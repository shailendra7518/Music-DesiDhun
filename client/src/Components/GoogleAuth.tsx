import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import  app  from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { signInSuccess,signInStart,signInFailure } from "../Redux/features/authSlice";
import { useNavigate } from "react-router-dom";

const apiUrl :string = import.meta.env.VITE_API_BASE_URL;

function GoogleAuth() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
console.log(result);
      const res = await fetch(`${apiUrl}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });

        const data = await res.json();
      dispatch(signInSuccess(data));
          Navigate("/");
        
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="p-4 w-full rounded-md outline-none
            bg-cyan-900 font-semibold text-white hover:opacity-70
            uppercase"
    >
      Continue with Google
    </button>
  );
}

export default GoogleAuth;
