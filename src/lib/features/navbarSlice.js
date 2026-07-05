import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNavLinks } from "@/api/navbarApi";
import { formatNavLinks } from "@/lib/utils";

export const fetchNavLinks = createAsyncThunk(
  "navbar/fetchNavLinks",
  async () => {
    const res = await getNavLinks();
    const rawNavLinks = res?.data?.navLinks || res?.navLinks || [];
    return formatNavLinks(rawNavLinks);
  },
);

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navLinks: [],
    loaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavLinks.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchNavLinks.fulfilled, (state, action) => {
        state.navLinks = action.payload;
        state.loaded = true;
      })
      .addCase(fetchNavLinks.rejected, (state) => {
        state.navLinks = [];
        state.loaded = true;
      });
  },
});

export default navbarSlice.reducer;
