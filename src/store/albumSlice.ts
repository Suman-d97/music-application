import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "albums",
  initialState: {
    list: [],
  },
  reducers: {
    setAlbums: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setAlbums } = albumSlice.actions;
export default albumSlice.reducer;
