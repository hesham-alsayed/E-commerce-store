"use client";

import Link from "next/link";

export default function CurrentOrders({ orders }) {
  if (!orders?.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-500">
        <p>No orders yet</p>
        <p className="text-sm mt-1">Start shopping to see your orders here</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

      {orders.slice(0, 5).map((order) => (
        <Link href={`/profile/order-details/${order._id}`} key={order._id}>
          <div className="flex justify-between items-center border-b pb-3 mb-3 last:border-none">
            <div>
              <p className="font-medium">Order #{order.orderNumber}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`text-sm px-3 py-1 rounded-full capitalize
            ${
              order.orderStatus === "delivered"
                ? "bg-green-100 text-green-600"
                : order.orderStatus === "processing"
                  ? "bg-yellow-100 text-yellow-600"
                  : order.orderStatus === "shipped"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
            }
          `}
            >
              {order.orderStatus}
            </span>
          </div>
        </Link>
      ))}
      <Link
        href={"/profile/orders"}
        className="mt-4 text-black font-medium hover:underline"
      >
        View All Orders →
      </Link>
    </div>
  );
}
