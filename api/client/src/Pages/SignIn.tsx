import { useState } from "react";
import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../Redux/features/authSlice";
import GoogleAuth from "../Components/GoogleAuth";
// const apiUrl: string = import.meta.env.VITE_API_BASE_URL;

interface FormData {
  email: string;
  password: string;
}

const  SignIn:React.FC=()=>{
  const initialState: FormData = {email: "",password: "",};
  const [formData, setFormData] = useState(initialState);
  const Navigate = useNavigate();
  const dispatch = useDispatch();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch(`/api/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        setFormData(initialState);
        dispatch(signInSuccess(data))
        Navigate('/')

      } catch (error) {
        dispatch(signInFailure(error))
        console.log(error);
      }
    };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-3xl text-center uppercase font-semibold mt-7 text-white">
        Sign In
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-8 items-center justify-center gap-5 w-3/6"
      >
        <input
          onChange={handleChange}
          className="p-4 min-w-full rounded-md outline-none
          
             bg-slate-600
             text-white
            "
          id="email"
          type="text"
          placeholder="email"
        />
        <input
          onChange={handleChange}
          className="p-4 min-w-full rounded-md outline-none
          
            bg-slate-600
            text-white
            "
          id="password"
          type="password"
          placeholder="password"
        />
        <button
          type="submit"
          className="p-4 w-full rounded-md outline-none
            bg-slate-700 font-semibold text-white hover:opacity-70
            uppercase
            "
        >
          Sign In
        </button>
        <GoogleAuth/>
      </form>
      <div className="text-white">
        Don't have an account ?
        <Link to={'/signup'}>
          <span className="text-blue-400 cursor-pointer hover:underline ml-2">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
