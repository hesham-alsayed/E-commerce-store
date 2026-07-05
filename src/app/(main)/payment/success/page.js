"use client";

import { capturePaypalApi } from "@/api/orderApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function SuccessOrder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const done = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/checkout");
      return;
    }

    const capture = async () => {
      try {
        if (done.current) return;
        done.current = true;

        const res = await capturePaypalApi(token);

        if (!res?.order) throw new Error();

        toast.success("Payment successful");

        setTimeout(() => {
          router.replace(`/order-success/${res.order._id}`);
        }, 1200);
      } catch (err) {
        toast.error(err?.message || err || "Payment failed");

        setTimeout(() => {
          router.replace("/checkout");
        }, 1200);
      }
    };

    capture();
  }, []);

  return <FullScreenLoader text="Please wait while we finalize your order..." />;
}
