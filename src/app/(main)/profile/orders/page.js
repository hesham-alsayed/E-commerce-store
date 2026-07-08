"use client";

import OrdersPagination from "@/components/profile/orders/OrdersPaginatation";
import OrdersTable from "@/components/profile/orders/TableOrders";
import UserEmptyOrders from "@/components/UserEmptyOrders";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "@/lib/features/orderSlice";
import UserOrdersPageSkeleton from "@/skeleton/UserOrdersPageSkeleton";
import { useEffect, useState } from "react";
import CurrentRoute from "@/views/CurrentRoute";

export default function UserOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const rowsPerPage = 5;
  const totalPages = Math.ceil(orders.length / rowsPerPage);
  console.log(orders);

  return (
    <div>
      <CurrentRoute />
      {error ? (
        <div className="text-center py-20 text-red-500 text-sm">{error}</div>
      ) : loading ? (
        <UserOrdersPageSkeleton />
      ) : orders.length === 0 ? (
        <UserEmptyOrders />
      ) : (
        <>
          <OrdersTable
            orders={orders}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
          />

          <OrdersPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
