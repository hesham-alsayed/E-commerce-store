"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Globe, Building2, MapPin, Home, Mail } from "lucide-react";

export default function AddressModal({
  open,
  setOpen,
  form,
  handleChange,
  handleSubmit,
  loading,
  editingId,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[520px]">
        {}
        <div>
          {}
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Update Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>

          {}
          <div className="space-y-3 mt-5">
            {}
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                className="pl-10 focus-visible:ring-0"
              />
            </div>

            {}
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="governorate"
                placeholder="Governorate"
                value={form.governorate}
                onChange={handleChange}
                className="pl-10 focus-visible:ring-0"
              />
            </div>

            {}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="pl-10 focus-visible:ring-0"
              />
            </div>

            {}
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="street"
                placeholder="Street"
                value={form.street}
                onChange={handleChange}
                className="pl-10 focus-visible:ring-0"
              />
            </div>

            {}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                name="postalCode"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={handleChange}
                className="pl-10 focus-visible:ring-0"
              />
            </div>
          </div>

          {}
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
