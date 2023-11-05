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
  playList:any|null
  songList: any|null;
  currentSong: Song | null;
  isPlaying: boolean;
  player: boolean;
  searchTerm: string;

}

const initialState: SongState = {
  playList:[],
  songList: [],
  searchTerm:'',
  currentSong: null,
  isPlaying: false,
  player:false
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    addSongInList: (state, action) => {
      state.songList = action.payload;
    },
    startSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.player = true;
    },
    searchSongs: (state, action) => {
      state.searchTerm = action.payload;

    },
    playSong: (state) => {
      state.isPlaying = true;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    addInPlaylist: (state, action) => {
      state.playList = action.payload;
    },
  },
});

export const { playSong,pauseSong,startSong ,addSongInList,addInPlaylist,searchSongs} = songSlice.actions;
export default songSlice.reducer;
