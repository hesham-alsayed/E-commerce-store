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
  async () => {
    const data = await getWishlistApi();
    return data.data || data;
  },
);

export const addItemWishlist = createAsyncThunk(
  "user/addToWishlist",
  async (product) => {
    await addToWishlistApi(product._id);
    return product;
  },
);

export const removeItemWishlist = createAsyncThunk(
  "user/removeFromWishlist",
  async (productId) => {
    await removeFromWishlistApi(productId);
    return productId;
  },
);

export const fetchAddresses = createAsyncThunk(
  "user/fetchAddresses",
  async () => {
    const res = await getAddresses();
    return res?.data || res || [];
  },
);

export const addNewAddress = createAsyncThunk(
  "user/addAddress",
  async (address) => {
    const newData = await addAddress(address);
    return newData;
  },
);

export const updateExistingAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ id, data }) => {
    const newData = await updateAddress(id, data);
    return newData;
  },
);

export const removeAddress = createAsyncThunk(
  "user/removeAddress",
  async (id) => {
    const newData = await deleteAddress(id);
    return newData;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    wishlist: [],
    addresses: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
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
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAddresses.rejected, (state) => {
        state.loading = false;
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

export default userSlice.reducer;
