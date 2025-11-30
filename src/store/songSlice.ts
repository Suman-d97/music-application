import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "songs",
  initialState: {
    list: [],
  },
  reducers: {
    setSongs: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setSongs } = songSlice.actions;
export default songSlice.reducer;
