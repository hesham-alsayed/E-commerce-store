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
      return rejectWithValue(err?.message || err || "Failed to create order");
    }
  },
);

export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyOrdersApi();
      return res.orders || [];
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch orders");
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getOrderApi(id);
      return res.order || res;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch order");
    }
  },
);

export const fetchOrderByNumber = createAsyncThunk(
  "order/fetchOrderByNumber",
  async ({ orderNumber, email }, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(orderNumber, email);
      return data.order;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Order not found");
    }
  },
);

export const fetchUserStats = createAsyncThunk(
  "order/fetchUserStats",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserStats();
      return data.result;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch stats");
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    clearOrderError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = [action.payload, ...state.orders];
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
