import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    sections: [],
    loaded: false,
  },
  reducers: {
    setHomeSections(state, action) {
      state.sections = action.payload;
      state.loaded = true;
    },
    clearHomeSections(state) {
      state.sections = [];
      state.loaded = false;
    },
  },
});

export const { setHomeSections, clearHomeSections } = homeSlice.actions;
export default homeSlice.reducer;
