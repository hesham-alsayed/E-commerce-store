import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getOneProduct } from "@/api/productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await getAllProducts(params);
      return {
        products: data.products,
        pagination: {
          currentPage: data.pagination?.currentPage || 1,
          numberOfPages: data.pagination?.numberOfPages || 1,
        },
      };
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch products");
    }
  },
);

export const fetchAllProductsOptions = createAsyncThunk(
  "products/fetchAllOptions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllProducts({ page: 1, limit: 100000 });
      return data.products || [];
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch product options");
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getOneProduct(id);
      return data?.product || null;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to fetch product");
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    allProducts: [],
    product: null,
    pagination: {
      currentPage: 1,
      numberOfPages: 1,
    },
    loading: false,
    error: null,
    openSearch: false,
  },
  reducers: {
    setOpenSearch(state, action) {
      state.openSearch = action.payload;
    },
    clearProduct(state) {
      state.product = null;
    },
    clearProductsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllProductsOptions.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOpenSearch, clearProduct, clearProductsError } = productsSlice.actions;
export default productsSlice.reducer;
