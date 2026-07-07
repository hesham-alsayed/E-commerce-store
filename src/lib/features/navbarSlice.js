import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNavLinks } from "@/api/navbarApi";
import { formatNavLinks } from "@/lib/utils";

const CACHE_KEY = "navbar_cache";
const CACHE_TTL = 300000;

const getCached = () => {
  if (typeof window === "undefined") return null;
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data;
  } catch {}
  return null;
};

const setCached = (data) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}
};

export const fetchNavLinks = createAsyncThunk(
  "navbar/fetchNavLinks",
  async (_, { rejectWithValue }) => {
    try {
      const cached = getCached();
      if (cached) return cached;
      const res = await getNavLinks();
      const rawNavLinks = res?.data?.navLinks || res?.navLinks || [];
      const formatted = formatNavLinks(rawNavLinks);
      setCached(formatted);
      return formatted;
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
    setNavbarLinks(state, action) {
      state.navLinks = formatNavLinks(action.payload);
      state.loaded = true;
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

export const { clearNavbarError, setNavbarLinks } = navbarSlice.actions;
export default navbarSlice.reducer;
