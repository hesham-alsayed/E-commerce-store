"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartFromLocal, fetchCart } from "./features/cartSlice";
import { fetchUser } from "./features/authSlice";

function AuthRestorer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return null;
}

function CartLoader() {
  const dispatch = useDispatch();
  const { user, initialized: authReady } = useSelector((state) => state.auth);
  useEffect(() => {
    if (authReady && !user) {
      dispatch(setCartFromLocal());
    }
  }, [dispatch, authReady, user]);
  return null;
}

function CartFetcher() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const fetchedForUser = useRef(false);
  useEffect(() => {
    if (user && !fetchedForUser.current) {
      fetchedForUser.current = true;
      dispatch(fetchCart());
    }
  }, [dispatch, user]);
  return null;
}

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthRestorer />
      <CartLoader />
      <CartFetcher />
      {children}
    </Provider>
  );
}
