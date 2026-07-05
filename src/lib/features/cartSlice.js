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

const getLocalCart = () => {
  if (typeof window === "undefined") {
    return { items: [], totalPrice: 0 };
  }
  return (
    JSON.parse(localStorage.getItem("cart")) || { items: [], totalPrice: 0 }
  );
};

const setLocalCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const data = await getCartApi();
  return data?.cart || { items: [], totalPrice: 0 };
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
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (itemId, { getState }) => {
    const { auth } = getState();

    if (!auth.user) {
      const local = getLocalCart();
      const items = local.items.filter((item) => item._id !== itemId);
      const updated = { items, totalPrice: calculateTotalPrice(items) };
      setLocalCart(updated);
      return { cart: updated, fromLocal: true };
    }

    await removeCartItemApi(itemId);
    const data = await getCartApi();
    return { cart: data?.cart || { items: [], totalPrice: 0 } };
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

    const data = await updateCartItemApi(itemId, quantity);
    return { cart: data?.cart || cart };
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

export const applyCoupon = createAsyncThunk("cart/applyCoupon", async (code) => {
  const data = await applyCouponApi(code);
  return data.cart;
});

export const removeCoupon = createAsyncThunk("cart/removeCoupon", async () => {
  const data = await removeCouponApi();
  return data.cart;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
    initialized: false,
  },
  reducers: {
    setCartFromLocal(state) {
      const local = getLocalCart();
      state.items = local.items;
      state.totalPrice = local.totalPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
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
        const { cart } = action.payload;
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { cart } = action.payload;
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
        state.loading = false;
      })
      .addCase(updateQuantity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        state.items = cart.items;
        state.totalPrice = cart.totalPrice;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export const { setCartFromLocal } = cartSlice.actions;
export default cartSlice.reducer;
