import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/Userslice";


export const store = configureStore({

  reducer: {
    user: userSlice
  },
});