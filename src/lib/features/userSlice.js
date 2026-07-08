import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishlistApi,
  addToWishlistApi,
  removeFromWishlistApi,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "@/api/userApi";

export const fetchWishlist = createAsyncThunk(
  "user/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getWishlistApi();
      return data.data || data;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch wishlist");
    }
  },
);

export const addItemWishlist = createAsyncThunk(
  "user/addToWishlist",
  async (product, { rejectWithValue }) => {
    try {
      await addToWishlistApi(product._id);
      return product;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to add to wishlist");
    }
  },
);

export const removeItemWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      await removeFromWishlistApi(productId);
      return productId;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to remove from wishlist");
    }
  },
);

export const fetchAddresses = createAsyncThunk(
  "user/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAddresses();
      return res?.data || res || [];
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch addresses");
    }
  },
);

export const addNewAddress = createAsyncThunk(
  "user/addAddress",
  async (address, { rejectWithValue }) => {
    try {
      const newData = await addAddress(address);
      return newData;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to add address");
    }
  },
);

export const updateExistingAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const newData = await updateAddress(id, data);
      return newData;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to update address");
    }
  },
);

export const removeAddress = createAsyncThunk(
  "user/removeAddress",
  async (id, { rejectWithValue }) => {
    try {
      const newData = await deleteAddress(id);
      return newData;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to delete address");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    wishlist: [],
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemWishlist.fulfilled, (state, action) => {
        state.wishlist.push(action.payload);
      })
      .addCase(removeItemWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(updateExistingAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
