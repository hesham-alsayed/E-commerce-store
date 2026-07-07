"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { setCartFromLocal, fetchCart } from "./features/cartSlice";
import { fetchUser } from "./features/authSlice";
import { setNavbarLinks } from "./features/navbarSlice";
import { setHomeSections } from "./features/homeSlice";

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

function InitializeRedux({ navLinks, homeSections }) {
  const dispatch = useDispatch();
  const hydatedNav = useRef(false);
  const hydatedHome = useRef(false);

  if (navLinks && !hydatedNav.current) {
    hydatedNav.current = true;
    dispatch(setNavbarLinks(navLinks));
  }
  if (homeSections && !hydatedHome.current) {
    hydatedHome.current = true;
    dispatch(setHomeSections(homeSections));
  }

  return null;
}

export default function StoreProvider({ children, navLinks, homeSections }) {
  return (
    <Provider store={store}>
      <InitializeRedux navLinks={navLinks} homeSections={homeSections} />
      <AuthRestorer />
      <CartLoader />
      <CartFetcher />
      {children}
    </Provider>
  );
}
