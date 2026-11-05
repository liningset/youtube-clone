import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import sideBarSlice from "./sideBarSlice";

const store = configureStore({
  reducer: { app: appSlice, sideBar: sideBarSlice },
});

export default store;
