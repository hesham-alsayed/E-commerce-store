"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DeliveryForm({
  register,
  setValue,
  errors,
  zones = [],
  setShipping,
}) {
  const [selectedZone, setSelectedZone] = useState(null);

  const handleZoneChange = (zoneName) => {
    setValue("delivery.governorate", zoneName, {
      shouldValidate: true,
    });

    const zone = zones.find((z) => z.name === zoneName);

    setSelectedZone(zone);

    setValue("delivery.city", "");
    setShipping(null);
  };

  const handleCityChange = (cityName) => {
    setValue("delivery.city", cityName, {
      shouldValidate: true,
    });

    const city = selectedZone?.cities?.find((c) => c.city === cityName);

    if (!city) return;

    setShipping({
      zoneName: selectedZone.name,
      city: city.city,
      price: city.price,
      estimatedDays: city.estimatedDays,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Delivery</h2>

      <Input value="Egypt" readOnly className="bg-muted cursor-not-allowed" />

      {}
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-2 w-1/2">
          <Input
            placeholder="First name"
            {...register("delivery.firstName", {
              required: "First name is required",
            })}
          />
          {errors.delivery?.firstName && (
            <p className="text-red-500 text-sm">
              {errors.delivery.firstName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-1/2">
          <Input
            placeholder="Last name"
            {...register("delivery.lastName", {
              required: "Last name is required",
            })}
          />
        </div>
      </div>

      {}
      <Input
        placeholder="Address"
        {...register("delivery.address", {
          required: "Address is required",
        })}
      />

      {}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <Select onValueChange={handleZoneChange}>
            <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0 outline-none">
              <SelectValue placeholder="Governorate" />
            </SelectTrigger>

            <SelectContent>
              {zones.map((zone, index) => (
                <SelectItem
                  key={zone._id || zone.name || index}
                  value={zone.name}
                >
                  {zone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {}
        <div className="col-span-2">
          <Select onValueChange={handleCityChange} disabled={!selectedZone}>
            <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0 outline-none">
              <SelectValue placeholder="City" />
            </SelectTrigger>

            <SelectContent>
              {selectedZone?.cities?.map((c, index) => (
                <SelectItem
                  key={c._id || c.slug || c.city || index}
                  value={c.city}
                >
                  {c.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {}
        <div className="col-span-2">
          <Input
            placeholder="Postal code"
            {...register("delivery.postal", {
              required: "Postal code is required",
            })}
          />
        </div>
      </div>

      {}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="saveInfo"
          onCheckedChange={(checked) => setValue("delivery.saveInfo", checked)}
        />
        <Label htmlFor="saveInfo">Save this information</Label>
      </div>
    </div>
  );
}
