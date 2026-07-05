"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "@/lib/features/orderSlice";
import { fetchUser } from "@/lib/features/authSlice";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import CurrentRoute from "@/views/CurrentRoute";
import ProfileSection from "@/components/profile/dashboard/ProfileSection";
import SummaryCard from "@/components/profile/dashboard/SummaryCard";
import CurrentOrders from "@/components/profile/dashboard/CurrentOrders";
import DashboardPageSkeleton from "@/skeleton/DashboardPageSkeleton";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, orders, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser()).unwrap().catch(() => {
      router.replace("/auth?mode=login");
    });
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const calcOrderStats = (orders = []) => {
    const totalOrders = orders.length;

    const completedOrders = orders.filter(
      (o) => o.orderStatus === "delivered",
    ).length;

    const currentOrders = orders.filter((o) =>
      ["pending", "processing", "shipped"].includes(o.orderStatus),
    ).length;

    const totalSpent = orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + (o.totalPriceAfterDiscount || 0), 0);

    return {
      totalOrders,
      completedOrders,
      currentOrders,
      totalSpent,
    };
  };

  const stats = useMemo(() => {
    return calcOrderStats(orders || []);
  }, [orders]);

  if (error) {
    return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;
  }

  if (loading || !user) return <DashboardPageSkeleton />;

  return (
    <div className="min-h-screen py-4">
      <CurrentRoute />

      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileSection />
        <SummaryCard stats={stats} />
        <CurrentOrders orders={orders || []} />
      </div>
    </div>
  );
}
