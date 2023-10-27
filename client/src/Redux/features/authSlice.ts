// authSlice.ts
import { createSlice} from "@reduxjs/toolkit";

interface User {
  user: object;
  loading: boolean;
  error: Error |null;
}

interface AuthState {
  user: User | null;
  loading: boolean
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading:false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.user = action.payload;
      (state.loading = false), (state.error = null);
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signInStart,signInFailure,signInSuccess } = authSlice.actions;
export default authSlice.reducer;
