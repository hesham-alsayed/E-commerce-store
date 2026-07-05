"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ShippingMethod({ setValue, watch, errors }) {
  const methods = [
    {
      id: "standard",
      title: "Standard Shipping",
      description: "Delivery in 3–5 business days",
      price: 40,
    },
    {
      id: "express",
      title: "Express Shipping",
      description: "Delivery in 1–2 business days",
      price: 80,
    },
    {
      id: "same_day",
      title: "Same Day Delivery",
      description: "Delivered today (order before 2 PM)",
      price: 120,
    },
    {
      id: "pickup",
      title: "Store Pickup",
      description: "Pick up from our store",
      price: 0,
    },
  ];

  const value = watch("shippingMethod");

  return (
    <div className="mb-6 space-y-2">
      <h1 className="font-bold text-xl">Shipping Method</h1>

      <Select
        value={value || "standard"}
        onValueChange={(v) =>
          setValue("shippingMethod", v, {
            shouldValidate: true,
          })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select shipping method" />
        </SelectTrigger>

        <SelectContent>
          {methods.map((method) => (
            <SelectItem key={method.id} value={method.id}>
              <div className="flex justify-between items-start w-full gap-4">
                <div>
                  <p className="font-medium">{method.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>

                <div className="font-semibold text-sm whitespace-nowrap">
                  {method.price === 0 ? "Free" : `${method.price} EGP`}
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errors.shippingMethod && (
        <p className="text-red-500 text-sm">{errors.shippingMethod.message}</p>
      )}
    </div>
  );
}
