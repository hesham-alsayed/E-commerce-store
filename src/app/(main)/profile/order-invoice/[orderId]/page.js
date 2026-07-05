"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "@/lib/features/orderSlice";
import InvoiceHeader from "@/components/orderInvoice/InvoiceHeader";
import InvoiceCustomerShipping from "@/components/orderInvoice/InvoiceCustomerShipping";
import InvoiceItems from "@/components/orderInvoice/InvoiceItems";
import InvoicePaymentSummary from "@/components/orderInvoice/InvoicePaymentSummary";
import InvoiceActions from "@/components/orderInvoice/InvoiceActions";
import OrderInvoiceSkeleton from "@/skeleton/OrderInvoiceSkeleton";

export default function OrderInvoicePage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, error } = useSelector((state) => state.order);

  const ref = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [orderId, dispatch]);

  const downloadPDF = async () => {
    try {
      setLoading(true);

      const dataUrl = await toPng(ref.current, {
        pixelRatio: 2,
        backgroundColor: "#fff",
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(dataUrl);
      const height = (imgProps.height * width) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdf.save(`invoice-${order?._id}.pdf`);

      toast.success("Downloaded");
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = ref.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    window.location.reload();
  };
  if (error && !order) {
    return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;
  }

  if (!order) return <OrderInvoiceSkeleton />;

  return (
    <div className="max-w-5xl mx-auto mt-20 ">
      <InvoiceActions
        onPrint={() => handlePrint()}
        onDownload={downloadPDF}
        loading={loading}
        order={order}
      />
      <div ref={ref} className="space-y-6 bg-white p-4 ">
        <InvoiceHeader order={order} />

        <InvoiceCustomerShipping order={order} />

        <InvoiceItems items={order.items} />

        <InvoicePaymentSummary order={order} />
      </div>
    </div>
  );
}
