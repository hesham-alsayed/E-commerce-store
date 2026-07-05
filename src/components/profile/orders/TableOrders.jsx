"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const statusVariant = (status) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "shipped":
      return "bg-purple-100 text-purple-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const paymentVariant = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function OrdersTable({ orders, currentPage, rowsPerPage }) {
  const router = useRouter();

  const start = (currentPage - 1) * rowsPerPage;
  const paginated = orders.slice(start, start + rowsPerPage);

  return (
    <div className=" w-full overflow-x-auto rounded-xl border bg-white">
      <div className="min-w-225">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Badge className={statusVariant(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </TableCell>

                <TableCell>${order.totalPriceAfterDiscount}</TableCell>

                <TableCell>
                  <Badge className="bg-gray-100 text-gray-700">
                    {order.paymentMethod}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge className={paymentVariant(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell>
                  <TooltipProvider>
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              router.push(`/profile/order-details/${order._id}`)
                            }
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Details</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              router.push(`/profile/order-invoice/${order._id}`)
                            }
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Invoice</TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
