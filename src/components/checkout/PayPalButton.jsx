"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createOrderApi, capturePaypalApi } from "@/api/order";
import { toast } from "sonner";

export default function PayPalButton({ formData, onSuccess, onError }) {
  const CLIENT_ID = "YOUR_CLIENT_ID"; // حط بتاعك

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
      <PayPalButtons
        style={{
          layout: "vertical",
          shape: "rect",
          label: "paypal",
        }}
        // ✅ IMPORTANT: create order from backend
        createOrder={async () => {
          try {
            const data = await createOrderApi({
              ...formData,
              paymentMethod: "paypal",
            });

            // backend بيرجع order + paypalOrderId
            return data.order.paymentInfo.paypalOrderId;
          } catch (err) {
            onError(err);
            throw err;
          }
        }}
        // ✅ بعد الدفع
        onApprove={async (data) => {
          try {
            await capturePaypalApi(data.orderID);

            toast.success("Payment successful");

            onSuccess();
          } catch (err) {
            onError(err);
          }
        }}
        onError={(err) => {
          console.error(err);
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
}
