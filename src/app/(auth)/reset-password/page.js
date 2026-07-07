"use client";

import { Suspense } from "react";
import ResetPassword from "@/components/auth/ResetPassword";

function ResetPasswordFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white border rounded-2xl shadow-sm p-6 text-center text-sm text-gray-500">
        Loading...
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPassword />
    </Suspense>
  );
}
