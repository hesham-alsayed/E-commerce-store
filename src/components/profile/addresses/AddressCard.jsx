"use client";

import { Card } from "@/components/ui/card";
import { Check, Pencil, Trash2, MapPin, User, Mail, Phone } from "lucide-react";

export default function AddressCard({
  addr,
  user,
  setDefaultAddress,
  handleEdit,
  onClickDelete,
}) {
  return (
    <Card className={`p-6 relative transition hover:shadow-lg ${
      addr.isDefault ? "border-gray-500 shadow-md" : "border-gray-200"
    }`}>

      {addr.isDefault && (
        <span className="absolute top-3 right-3 bg-gray-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Check className="w-3 h-3" /> Default
        </span>
      )}

      <div className="mb-4">
        <p className="text-lg font-semibold flex items-center gap-2 text-gray-900">
          <MapPin className="w-4 h-4 text-gray-600" />
          {addr.country}, {addr.city}
        </p>

        <p className="text-sm text-gray-500">{addr.street}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 text-sm">

        <div className="flex gap-2">
          <User className="w-4 h-4 text-gray-600 mt-1" />
          <div>
            <p className="text-xs text-gray-400">Name</p>
            <p>{user?.firstName}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Mail className="w-4 h-4 text-gray-600 mt-1" />
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Phone className="w-4 h-4 text-gray-600 mt-1" />
          <div>
            <p className="text-xs text-gray-400">Phone</p>
            <p>{user?.phone}</p>
          </div>
        </div>

      </div>

      <div className="flex justify-between mt-5 pt-4 border-t">

        {!addr.isDefault ? (
          <button
            onClick={() => setDefaultAddress(addr._id)}
            className="text-sm text-indigo-600"
          >
            Set as Default
          </button>
        ) : (
          <span className="text-xs text-gray-400">Default</span>
        )}

        <div className="flex gap-2">
          <button onClick={() => handleEdit(addr)}>
            <Pencil className="w-4 h-4" />
          </button>

          <button onClick={() => onClickDelete(addr._id)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>

      </div>

    </Card>
  );
}