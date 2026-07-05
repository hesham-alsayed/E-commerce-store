import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNavLinks } from "@/api/navbarApi";
import { formatNavLinks } from "@/lib/utils";

export const fetchNavLinks = createAsyncThunk(
  "navbar/fetchNavLinks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getNavLinks();
      const rawNavLinks = res?.data?.navLinks || res?.navLinks || [];
      return formatNavLinks(rawNavLinks);
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch nav links");
    }
  },
);

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navLinks: [],
    loaded: false,
    error: null,
  },
  reducers: {
    clearNavbarError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavLinks.pending, (state) => {
        state.loaded = false;
        state.error = null;
      })
      .addCase(fetchNavLinks.fulfilled, (state, action) => {
        state.navLinks = action.payload;
        state.loaded = true;
        state.error = null;
      })
      .addCase(fetchNavLinks.rejected, (state, action) => {
        state.navLinks = [];
        state.loaded = true;
        state.error = action.payload;
      });
  },
});

export const { clearNavbarError } = navbarSlice.actions;
export default navbarSlice.reducer;
