import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getOneProduct } from "@/api/productApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}) => {
    const data = await getAllProducts(params);
    return {
      products: data.products,
      pagination: {
        currentPage: data.pagination?.currentPage || 1,
        numberOfPages: data.pagination?.numberOfPages || 1,
      },
    };
  },
);

export const fetchAllProductsOptions = createAsyncThunk(
  "products/fetchAllOptions",
  async () => {
    const data = await getAllProducts({ page: 1, limit: 100000 });
    return data.products || [];
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const data = await getOneProduct(id);
    return data?.product || null;
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
    openSearch: false,
  },
  reducers: {
    setOpenSearch(state, action) {
      state.openSearch = action.payload;
    },
    clearProduct(state) {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllProductsOptions.fulfilled, (state, action) => {
        state.allProducts = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setOpenSearch, clearProduct } = productsSlice.actions;
export default productsSlice.reducer;
