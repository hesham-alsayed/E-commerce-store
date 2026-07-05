"use client";

import { Button } from "@/components/ui/button";
import { Download, Printer, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function InvoiceActions({ onDownload, loading, order , onPrint }) {
  const { orderNumber, contactEmail } = order;
  const router = useRouter();
  return (
    <div className="flex flex-wrap justify-end gap-3 mt-6 px-4">
      <Button
        onClick={() =>
          router.push(
            `/order-track?orderNumber=${orderNumber}&email=${contactEmail}`,
          )
        }
        className="cursor-pointer transition-all duration-200 hover:opacity-80"
      >
        <Truck className="w-4 h-4 mr-2" />
        Track
      </Button>

      <Button
        variant="secondary" 
        onClick={onPrint}
        className="cursor-pointer transition-all duration-200 hover:opacity-80"
      >
        <Printer className="w-4 h-4 mr-2" />
        Print
      </Button>

      <Button
        onClick={onDownload}
        disabled={loading}
        className="cursor-pointer transition-all duration-200 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <ClipLoader size={14} className="mr-2" />
            Loading...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download
          </>
        )}
      </Button>
    </div>
  );
}
