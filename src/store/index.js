import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mainSlice from "./main-slice";
import teamSlice from "./team-slice";
import userSlice from "./user-slice";
import sidebar from "./sidebar";

const store = configureStore({
  reducer: {
    authSlice,
    mainSlice,
    teamSlice,
    userSlice,
    sidebar,
  },
});

export default store;
