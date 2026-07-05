"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AuthLoader from "../AuthLoader";

export default function PublicGuard({ children }) {
  const { user } = useSelector(state => state.auth);
  const router = useRouter();

  if (user === undefined) {
    return <AuthLoader />;
  }

  if (user) {
    const redirectTo = sessionStorage.getItem("lastPath") || "/profile";
    router.replace(redirectTo);
    return null;
  }

  return <>{children}</>;
}
