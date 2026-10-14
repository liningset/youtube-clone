import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: { currentPage: "homepage" },
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
  },
});

export const { updateCurrentPage } = appSlice.actions;
export default appSlice.reducer;
