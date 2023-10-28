// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface Song {
  album: string;
  artist:string;
  file: string;
  title: string;
  uploadedBy: string;
  __v: number;
  _id: string;
}

interface SongState {
  currentSong: Song | null;
  isPlaying: boolean;

}

const initialState: SongState = {
  currentSong: null,
  isPlaying: false,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
  },
});

export const { playSong,pauseSong } = songSlice.actions;
export default songSlice.reducer;
