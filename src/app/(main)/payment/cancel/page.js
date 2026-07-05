"use client";

import { cancelPaymentApi } from "@/api/orderApi";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function CancelOrder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const done = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/checkout");
      return;
    }

    const cancel = async () => {
      try {
        if (done.current) return;
        done.current = true;

        await cancelPaymentApi(token);

        toast.error("Payment cancelled");

        setTimeout(() => {
          router.replace("/order-cancelled");
        }, 1200);
      } catch (err) {
        toast.error(err?.message || err || "Cancel failed");

        setTimeout(() => {
          router.replace("/checkout");
        }, 1200);
      }
    };

    cancel();
  }, []);

  return <FullScreenLoader text="Your payment is being cancelled..." />;
}
