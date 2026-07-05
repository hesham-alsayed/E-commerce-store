"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AddressMethod({ register, setValue, watch, errors }) {
  const addressMethod = watch("addressMethod");

  const handleChange = (value) => {
    setValue("addressMethod", value, {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Billing address</h2>

      {}
      <input
        type="hidden"
        {...register("addressMethod", {
          required: "Please select a billing address",
        })}
      />

      <RadioGroup
        value={addressMethod || ""}
        onValueChange={handleChange}
        className="border rounded-lg overflow-hidden"
      >
        {}
        <div
          className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
            addressMethod === "same" ? "bg-muted" : ""
          }`}
        >
          <RadioGroupItem value="same" id="same" />
          <Label htmlFor="same" className="w-full cursor-pointer">
            Same as shipping address
          </Label>
        </div>

        <div className="border-t" />

        {}
        <div
          className={`px-4 py-3 ${
            addressMethod === "different" ? "bg-muted" : ""
          }`}
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <RadioGroupItem value="different" id="different" />
            <Label htmlFor="different" className="w-full cursor-pointer">
              Use a different billing address
            </Label>
          </div>

          {}
          {addressMethod === "different" && (
            <div className="space-y-4 mt-4">
              <Input value="Egypt" readOnly />

              {}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="First Name"
                    {...register("billing.firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.billing?.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.billing.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Last Name"
                    {...register("billing.lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.billing?.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.billing.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {}
              <div>
                <Input
                  placeholder="Address"
                  {...register("billing.address", {
                    required: "Address is required",
                  })}
                />
                {errors.billing?.address && (
                  <p className="text-red-500 text-sm">
                    {errors.billing.address.message}
                  </p>
                )}
              </div>

              {}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Input
                    placeholder="City"
                    {...register("billing.city", {
                      required: "City is required",
                    })}
                  />
                  {errors.billing?.city && (
                    <p className="text-red-500 text-sm">
                      {errors.billing.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <Select
                    onValueChange={(v) =>
                      setValue("billing.governorate", v, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Governorate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cairo">Cairo</SelectItem>
                      <SelectItem value="Giza">Giza</SelectItem>
                      <SelectItem value="Alexandria">Alexandria</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.billing?.governorate && (
                    <p className="text-red-500 text-sm">
                      {errors.billing.governorate.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Postal code"
                    {...register("billing.postal", {
                      required: "Postal code is required",
                    })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </RadioGroup>

      {errors.addressMethod && (
        <p className="text-red-500 text-sm">{errors.addressMethod.message}</p>
      )}
    </div>
  );
}
