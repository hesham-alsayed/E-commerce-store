"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "@/lib/features/orderSlice";
import { clearCart } from "@/lib/features/cartSlice";
import { useEffect, useState } from "react";
import OrderConfirmationSkeleton from "@/skeleton/OrderConfirmationSkeleton";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.order);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await dispatch(fetchOrderById(orderId)).unwrap();
        console.log(order);

        setOrder(order);
      } catch (err) {
        console.error(err);
        router.replace("/checkout");
      }
    };

    if (orderId) fetchOrder();
  }, [orderId, dispatch]);

  console.log(order);

  if (loading || !order) {
    return <OrderConfirmationSkeleton />;
  }

  return (
    <div className="max-w-200 mx-auto my-10 p-6 bg-white rounded-lg shadow-md font-sans text-gray-900 border border-gray-200">
      {}
      <div className="flex justify-center mb-6">
        <img src="/logo.webp" alt="logo" height={40} width={160} className="w-28 object-contain" />
      </div>

      {}
      <h1 className="text-2xl font-semibold mb-1">Your Order Confirmed!</h1>

      <p className="mb-4">Hi {order.user?.firstName || "Customer"},</p>

      <p className="mb-6 text-gray-700">
        Your order has been confirmed and will be shipping soon.
      </p>

      {}
      <div className="flex justify-between text-xs text-gray-600 border-t border-b border-gray-300 py-3 mb-6">
        <div className="flex-1 text-center">
          <div className="font-semibold mb-1">Order Date</div>
          <div>{new Date(order.createdAt).toLocaleDateString()}</div>
        </div>

        <div className="flex-1 text-center">
          <div className="font-semibold mb-1">Order ID</div>
          <div>{order.orderNumber}</div>
        </div>

        <div className="flex-1 text-center">
          <div className="font-semibold mb-1">Payment</div>
          <div>{order.paymentMethod}</div>
        </div>

        <div className="flex-1 text-center">
          <div className="font-semibold mb-1">City</div>
          <div>{order.shippingAddress?.city}</div>
        </div>
      </div>

      {}
      <div className="space-y-4 border-b border-gray-300 pb-4 mb-6">
        {order.items?.map((item) => (
          <div key={item._id} className="flex items-center gap-4">
            <img
              src={item.image || item.product?.image}
              alt={item.title || item.product?.name}
              className="w-16 h-16 rounded-md object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold">
                {item.title || item.product?.name}
              </p>

              <p className="text-gray-500 text-sm">
                {item.color} / {item.size}
              </p>
            </div>

            <div className="text-right min-w-15">
              <p>Qty {item.quantity}</p>
              <p>E£ {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="text-sm text-gray-700 mb-6 space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>E£ {order.itemsPrice}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>E£ {order.shippingPrice}</span>
        </div>

        {order.discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- E£ {order.discountAmount}</span>
          </div>
        )}
      </div>

      {}
      <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-4 mb-6">
        <span>Total</span>
        <span>E£ {order.totalPriceAfterDiscount}</span>
      </div>

      {}
      <p className="mb-6 text-gray-600 text-sm leading-relaxed">
        We'll send you shipping confirmation when your item(s) are on the way!
      </p>

      <p className="mb-6 font-semibold">
        Thank you! <br />
        Kazary Store
      </p>

      <p className="text-xs text-gray-500 border-t border-gray-200 pt-4 flex justify-between">
        <span>Customer Support</span>
        <span>© Kazary</span>
      </p>
    </div>
  );
}
