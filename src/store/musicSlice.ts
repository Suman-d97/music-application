import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    currentSong: null,
    isPlaying: false,
  },
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;   // payload = { url, title }
      state.isPlaying = true;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    stopSong: (state) => {
      state.currentSong = null;
      state.isPlaying = false;
    },
  },
});

export const { playSong, pauseSong, stopSong } = musicSlice.actions;
export default musicSlice.reducer;
