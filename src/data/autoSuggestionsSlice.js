import { createSlice } from "@reduxjs/toolkit";

const autoSuggestionsSlice = createSlice({
  name: "auto-suggestions",
  initialState: {},
  reducers: {
    cacheSuggestions: (state, action) => {
      if (!action.payload?.search || !action.payload?.suggestions) return state;
      state[action.payload.search] = action.payload.suggestions;
    },
  },
});

export const { cacheSuggestions } = autoSuggestionsSlice.actions;
export default autoSuggestionsSlice.reducer;
