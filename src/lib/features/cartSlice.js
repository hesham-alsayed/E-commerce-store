import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartApi,
  addToCartApi,
  updateCartItemApi,
  removeCartItemApi,
  clearCartApi,
  applyCouponApi,
  removeCouponApi,
} from "@/api/cartApi";

const calculateTotalPrice = (items = []) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const DEFAULT_CART = { items: [], totalPrice: 0, coupon: null, discountAmount: 0, totalPriceAfterDiscount: 0, freeShipping: null };

const getLocalCart = () => {
  if (typeof window === "undefined") {
    return { ...DEFAULT_CART };
  }
  return (
    JSON.parse(localStorage.getItem("cart")) || { ...DEFAULT_CART }
  );
};

const setLocalCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const mergeCart = (target, source) => {
  target.items = source.items || [];
  target.totalPrice = source.totalPrice || 0;
  target.coupon = source.coupon || null;
  target.discountAmount = source.discountAmount || 0;
  target.totalPriceAfterDiscount = source.totalPriceAfterDiscount || target.totalPrice;
  target.freeShipping = source.freeShipping || null;
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    const data = await getCartApi();
    return data?.cart || { items: [], totalPrice: 0 };
  } catch (err) {
    return rejectWithValue(err?.message || err || "Failed to fetch cart");
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, options }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const { size, color, quantity = 1, price } = options;

    const resolveStock = (item) => {
      const p = item?.product;
      if (!p?.variants) return 0;
      const variant = p.variants.find(
        (v) => v.color?.toLowerCase() === item.color?.toLowerCase(),
      );
      const sizeObj = variant?.sizes?.find(
        (s) => s.size?.toLowerCase() === item.size?.toLowerCase(),
      );
      return sizeObj?.stock ?? 0;
    };

    const productImage =
      product?.image ||
      product?.images?.[0] ||
      product?.variants?.find((v) => v.color === color)?.images?.[0] ||
      product?.variants?.[0]?.images?.[0] ||
      "";

    if (!auth.user) {
      const local = getLocalCart();
      const items = [...local.items];
      const exist = items.find(
        (item) =>
          item.productId === product._id &&
          item.color === color &&
          item.size === size,
      );
      const nextQty = exist ? exist.quantity + quantity : quantity;

      const fakeItem = { product, color, size };
      const stock = resolveStock(fakeItem);
      if (stock > 0 && nextQty > stock) {
        return rejectWithValue(`Only ${stock} items available`);
      }

      if (exist) {
        exist.quantity = nextQty;
      } else {
        items.push({
          _id: Date.now(),
          productId: product._id,
          product,
          title: product.title,
          price,
          color,
          size,
          quantity,
          image: productImage,
          variants: product.variants,
        });
      }

      const updated = { items, totalPrice: calculateTotalPrice(items) };
      setLocalCart(updated);
      return { cart: updated, fromLocal: true };
    }

    try {
      await addToCartApi({
        productId: product._id,
        title: product.title,
        price: price || product.price,
        color,
        size,
        quantity,
      });
      const data = await getCartApi();
      return { cart: data?.cart || { items: [], totalPrice: 0 } };
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to add to cart");
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { getState, rejectWithValue }) => {
    const { auth } = getState();

    if (!auth.user) {
      const local = getLocalCart();
      const items = local.items.filter((item) => item._id !== itemId);
      const updated = { items, totalPrice: calculateTotalPrice(items) };
      setLocalCart(updated);
      return { cart: updated, fromLocal: true };
    }

    try {
      await removeCartItemApi(itemId);
      const data = await getCartApi();
      return { cart: data?.cart || { items: [], totalPrice: 0 } };
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to remove item");
    }
  },
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ itemId, quantity }, { getState, rejectWithValue }) => {
    if (quantity < 1) return rejectWithValue("Invalid quantity");
    const { auth, cart } = getState();
    const item = cart.items.find((i) => i._id === itemId);
    if (!item) return rejectWithValue("Item not found");

    const resolveStock = (item) => {
      const variants = item?.product?.variants || [];
      const variant = variants.find(
        (v) => v.color?.toLowerCase() === item.color?.toLowerCase(),
      );
      const sizeObj = variant?.sizes?.find(
        (s) => s.size?.toLowerCase() === item.size?.toLowerCase(),
      );
      return sizeObj?.stock ?? 0;
    };

    const stock = resolveStock(item);
    if (quantity > stock) {
      return rejectWithValue(`Only ${stock} items available`);
    }

    if (!auth.user) {
      const local = getLocalCart();
      const items = local.items.map((i) =>
        i._id === itemId ? { ...i, quantity } : i,
      );
      const updated = { items, totalPrice: calculateTotalPrice(items) };
      setLocalCart(updated);
      return { cart: updated, fromLocal: true };
    }

    try {
      const data = await updateCartItemApi(itemId, quantity);
      return { cart: data?.cart || cart };
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to update quantity");
    }
  },
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();

    if (!auth.user) {
      const empty = { items: [], totalPrice: 0 };
      setLocalCart(empty);
      return { cart: empty };
    }

    try {
      await clearCartApi();
      const data = await getCartApi();
      return { cart: data?.cart || { items: [], totalPrice: 0 } };
    } catch {
      return rejectWithValue("Failed to clear cart");
    }
  },
);

export const applyCoupon = createAsyncThunk("cart/applyCoupon", async (code, { rejectWithValue }) => {
  try {
    const data = await applyCouponApi(code);
    return data.cart;
  } catch (err) {
    return rejectWithValue(err?.message || err || "Failed to apply coupon");
  }
});

export const removeCoupon = createAsyncThunk("cart/removeCoupon", async (_, { rejectWithValue }) => {
  try {
    const data = await removeCouponApi();
    return data.cart;
  } catch (err) {
    return rejectWithValue(err?.message || err || "Failed to remove coupon");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    coupon: null,
    discountAmount: 0,
    totalPriceAfterDiscount: 0,
    freeShipping: null,
    loading: false,
    initialized: false,
    _prevQty: {},
  },
  reducers: {
    setCartFromLocal(state) {
      const local = getLocalCart();
      mergeCart(state, local);
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        mergeCart(state, action.payload);
        state.loading = false;
        state.initialized = true;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        mergeCart(state, action.payload.cart);
        state.loading = false;
        state.initialized = true;
      })
      .addCase(addToCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        mergeCart(state, action.payload.cart);
        state.loading = false;
        state.initialized = true;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateQuantity.pending, (state, action) => {
        const { itemId, quantity } = action.meta.arg;
        const item = state.items.find((i) => i._id === itemId);
        if (item) {
          state._prevQty[itemId] = item.quantity;
          item.quantity = quantity;
          state.totalPrice = calculateTotalPrice(state.items);
        }
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { itemId } = action.meta.arg;
        delete state._prevQty[itemId];
        const { cart } = action.payload;
        if (action.payload.fromLocal) {
          state.items = cart.items;
        }
        state.totalPrice = cart.totalPrice || calculateTotalPrice(state.items);
        state.coupon = cart.coupon || null;
        state.discountAmount = cart.discountAmount || 0;
        state.totalPriceAfterDiscount = cart.totalPriceAfterDiscount || state.totalPrice;
        state.freeShipping = cart.freeShipping || null;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        const { itemId } = action.meta.arg;
        const prevQty = state._prevQty[itemId];
        const item = state.items.find((i) => i._id === itemId);
        if (item && prevQty !== undefined) {
          item.quantity = prevQty;
          state.totalPrice = calculateTotalPrice(state.items);
        }
        delete state._prevQty[itemId];
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        mergeCart(state, action.payload.cart);
        state.initialized = true;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        mergeCart(state, action.payload);
        state.initialized = true;
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        mergeCart(state, action.payload);
        state.initialized = true;
      });
  },
});

export const { setCartFromLocal } = cartSlice.actions;
export default cartSlice.reducer;
