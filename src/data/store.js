import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import sideBarSlice from "./sideBarSlice";
import autoSuggestionsSlice from "./autoSuggestionsSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    sideBar: sideBarSlice,
    autoSuggestions: autoSuggestionsSlice,
  },
});

export default store;
