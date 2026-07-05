"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function PaymentMethod({
  register,
  setValue,
  watchValue,
  errors,
}) {
  const handleChange = (value) => {
    setValue("paymentMethod", value, {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Payment Method</h2>

      {/* hidden input for RHF */}
      <input
        type="hidden"
        {...register("paymentMethod", {
          required: "Please select a payment method",
        })}
      />

      <RadioGroup
        value={watchValue || ""}
        onValueChange={handleChange}
        className="border rounded-lg overflow-hidden"
      >
        {/* PAYPAL */}
        <div
          className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
            watchValue === "paypal" ? "bg-muted" : ""
          }`}
        >
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="w-full cursor-pointer">
            Pay with Wallet / Paypal
          </Label>
        </div>

        <div className="border-t" />

        {/* CASH */}
        <div
          className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
            watchValue === "cash" ? "bg-muted" : ""
          }`}
        >
          <RadioGroupItem value="cash" id="cash" />
          <Label htmlFor="cash" className="w-full cursor-pointer">
            Cash on delivery (COD)
          </Label>
        </div>
      </RadioGroup>

      {errors.paymentMethod && (
        <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>
      )}
    </div>
  );
}
