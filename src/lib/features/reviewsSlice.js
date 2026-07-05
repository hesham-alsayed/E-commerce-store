import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyReviewsApi,
  createReviewApi,
  updateReviewApi,
  deleteReviewApi,
} from "@/api/reviewApi";

export const getMyReviews = createAsyncThunk(
  "reviews/getMyReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyReviewsApi();
      return res?.reviews || res?.data?.reviews || [];
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch reviews");
    }
  },
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createReviewApi(data);
      return res.review;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to create review");
    }
  },
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateReviewApi(id, data);
      return res.review;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to update review");
    }
  },
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      await deleteReviewApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to delete review");
    }
  },
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearReviewsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getMyReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(updateReview.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const idx = state.reviews.findIndex(
          (r) => r._id === action.payload._id,
        );
        if (idx !== -1) state.reviews[idx] = action.payload;
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
