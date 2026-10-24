import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: { type: "modal", opened: false, userPreference: null },
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
    },
    toggleOpened: (state) => {
      state.userPreference = !state.opened;
      state.opened = !state.opened;
    },
    closeSideBar: (state, action) => {
      const asUser = action?.payload?.asUser ?? false;

      if (asUser) {
        state.opened = false;
        state.userPreference = false;
      } else {
        if (state.userPreference === true) return state;
        state.opened = false;
      }
    },
    openSideBar: (state, action) => {
      const asUser = action?.payload?.asUser ?? false;

      if (asUser) {
        state.opened = true;
        state.userPreference = false;
      } else {
        if (state.userPreference === false) return state;
        state.opened = true;
      }
    },
  },
});

export const { changeType, toggleOpened, closeSideBar, openSideBar } =
  sideBarSlice.actions;
export default sideBarSlice.reducer;
