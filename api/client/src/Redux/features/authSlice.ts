// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  avatar: string;
  password: string;
  __v: number;
  _id: string
}

interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;

      state.loading = false; // Corrected this line
      state.error = null; // Corrected this line
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.loading = false; // Corrected this line
      state.error = null;
    },
  },
});

export const { signInStart, signInFailure, signInSuccess,signOut } = authSlice.actions;
export default authSlice.reducer;
