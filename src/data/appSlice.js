import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    countryCode: null,
    currentPage: "homepage",
    matchMedia: { sm: false, md: false, lg: false },
  },
  reducers: {
    updateCurrentPage: (state) => {
      switch (location.pathname) {
        case "/":
          state.currentPage = "homepage";
          break;
        case "/results":
          state.currentPage = "searchpage";
          break;
        case "/watch":
          state.currentPage = "watchpage";
          break;
      }
    },
    updateMatchingMedia: (state, action) => {
      if (!action?.payload?.size || action.payload.matches == null)
        return state;
      if (["sm", "md", "lg"].includes(action.payload.size)) {
        state.matchMedia[action.payload.size] = action.payload.matches;
      }
    },
    updateCountryCode: (state, action) => {
      if (!action.payload) return state;
      state.countryCode = action.payload;
    },
  },
});

export const { updateCurrentPage, updateMatchingMedia, updateCountryCode } =
  appSlice.actions;
export default appSlice.reducer;
