// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;




import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import albumReducer from "./albumSlice";
import songReducer from "./songSlice";
import musicReducer from "./musicSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    albums: albumReducer,
    songs: songReducer,
    music: musicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
