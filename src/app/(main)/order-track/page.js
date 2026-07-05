"use client";

import EmptyState from "@/components/trackOrder/EmptyState";
import TrackForm from "@/components/trackOrder/TrackForm";
import TrackingDetails from "@/components/trackOrder/TrackingDetails";

import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByNumber } from "@/lib/features/orderSlice";
import TrackOrderSkeleton from "@/skeleton/TrackOrderSkeleton";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function TrackOrderPage() {
  const dispatch = useDispatch();

  const [localOrder, setLocalOrder] = useState(null);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const orderNumber = searchParams.get("orderNumber");
  const email = searchParams.get("email");

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderNumber || !email) {
        setLocalOrder(null);
        setNotFound(false);
        return;
      }

      try {
        setLoadingLocal(true);
        setNotFound(false);
        setLocalOrder(null);

        const data = await dispatch(fetchOrderByNumber({ orderNumber, email })).unwrap();

        if (!data) {
          setNotFound(true);
          setLocalOrder(null);
          return;
        }

        setLocalOrder(data);
      } catch (err) {
        setNotFound(true);
        setLocalOrder(null);

        toast.error(err?.response?.data?.message || "Failed to track order");
      } finally {
        setLoadingLocal(false);
      }
    };

    loadOrder();
  }, [orderNumber, email, dispatch]);

  const handleTrack = (orderNumber, email) => {
    if (!orderNumber || !email) {
      toast.error("Order number and email required");
      return;
    }

    router.push(`/order-track?orderNumber=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO */}
      <div className="bg-gray-800 text-white py-10 px-4 text-center">
        <h1 className="text-2xl font-bold">Track Your Order</h1>

        <p className="text-sm text-gray-300 mt-2">
          Enter order number and email
        </p>

        <div className="mt-6 flex justify-center">
          <TrackForm onTrack={handleTrack} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 pb-10">
        {/* 🔥 1. LOADING */}
        {loadingLocal && <TrackOrderSkeleton />}

        {/* 🔥 2. FOUND */}
        {!loadingLocal && localOrder && (
          <TrackingDetails orderData={localOrder} />
        )}

        {/* 🔥 3. NOT FOUND */}
        {!loadingLocal && !localOrder && notFound && <EmptyState />}

        {/* 🔥 4. DEFAULT (first load no query) */}
        {!loadingLocal && !orderNumber && !email && <EmptyState />}
      </div>
    </div>
  );
}
