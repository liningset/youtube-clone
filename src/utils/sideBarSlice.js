import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sideBar",
  initialState: { type: "modal", opened: false },
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
    },
    toggleOpened: (state) => {
      state.opened = !state.opened;
    },
    closeSideBar: (state) => {
      state.opened = false;
    },
    openSideBar: (state) => {
      state.opened = true;
    },
  },
});

export const { changeType, toggleOpened, closeSideBar, openSideBar } =
  sideBarSlice.actions;
export default sideBarSlice.reducer;
