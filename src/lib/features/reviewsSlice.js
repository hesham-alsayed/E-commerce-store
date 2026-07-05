import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyReviewsApi,
  createReviewApi,
  updateReviewApi,
  deleteReviewApi,
} from "@/api/reviewApi";

export const getMyReviews = createAsyncThunk(
  "reviews/getMyReviews",
  async () => {
    const res = await getMyReviewsApi();
    return res?.reviews || res?.data?.reviews || [];
  },
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (data) => {
    const res = await createReviewApi(data);
    return res.review;
  },
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, data }) => {
    const res = await updateReviewApi(id, data);
    return res.review;
  },
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id) => {
    await deleteReviewApi(id);
    return id;
  },
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    actionLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(getMyReviews.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createReview.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.actionLoading = false;
      })
      .addCase(createReview.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(updateReview.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const idx = state.reviews.findIndex(
          (r) => r._id === action.payload._id,
        );
        if (idx !== -1) state.reviews[idx] = action.payload;
        state.actionLoading = false;
      })
      .addCase(updateReview.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(deleteReview.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
        state.actionLoading = false;
      })
      .addCase(deleteReview.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export default reviewsSlice.reducer;
