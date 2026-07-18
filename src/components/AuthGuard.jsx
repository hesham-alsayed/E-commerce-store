"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const { user } = useSelector(state => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/auth?mode=login");
    }
  }, [user, router]);

  if (user === undefined) {
    return null;
  }

  if (user === null) {
    return null;
  }

  return children;
}
