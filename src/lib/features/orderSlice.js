import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderApi,
  getMyOrdersApi,
  getOrderApi,
  getOrderByNumberApi,
  getUserStats,
} from "@/api/orderApi";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createOrderApi(data);
      return res?.order;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  },
);

export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async () => {
    const res = await getMyOrdersApi();
    return res.orders || [];
  },
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id) => {
    const res = await getOrderApi(id);
    return res.order || res;
  },
);

export const fetchOrderByNumber = createAsyncThunk(
  "order/fetchOrderByNumber",
  async ({ orderNumber, email }) => {
    const data = await getOrderByNumberApi(orderNumber, email);
    return data.order;
  },
);

export const fetchUserStats = createAsyncThunk(
  "order/fetchUserStats",
  async () => {
    const data = await getUserStats();
    return data.result;
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
  },
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = [action.payload, ...state.orders];
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserStats.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserStats.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
