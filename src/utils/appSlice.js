import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
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
  },
});

export const { updateCurrentPage, updateMatchingMedia } = appSlice.actions;
export default appSlice.reducer;
