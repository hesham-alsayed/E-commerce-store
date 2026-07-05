"use client";

import CustomerInfo from "@/components/order/CustomerInfo";
import ItemsList from "@/components/order/ItemList";
import OrderHeader from "@/components/order/OrderHeader";
import PaymentInfo from "@/components/order/PaymentInfo";
import PaymentSummary from "@/components/order/PaymentSummary";
import ShippingInfo from "@/components/order/ShippingInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "@/lib/features/orderSlice";
import OrderDetailsSkeleton from "@/skeleton/OrderDetailsSkeleton";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { loading, currentOrder: order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [orderId, dispatch]);

  if (loading || !order) {
    return <OrderDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen  p-1 ">
      {/* PAGE GRID */}
      <OrderHeader order={order} />
      <div className="grid grid-cols-1 mt-4 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE (Items + Summary + Tracking) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Items Ordered */}
          <ItemsList items={order.items} />

          {/* Order Summary + Tracking (2 columns on desktop, stacked on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ShippingInfo order={order} />
            <CustomerInfo order={order} />
          </div>
        </div>

        {/* RIGHT SIDE (Customer + Shipping + Payment) */}
        <div className="flex flex-col gap-6">
          <PaymentSummary order={order} />
          <PaymentInfo order={order} />
        </div>
      </div>
    </div>
  );
}
