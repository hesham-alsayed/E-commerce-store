"use client";

import { Input } from "@/components/ui/input";

export default function ContactForm({ register, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Contact</h2>

      {/* EMAIL */}
      <div>
        <Input
          placeholder="Enter your email"
          {...register("contact.email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
        />

        {errors.contact?.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.contact.email.message}
          </p>
        )}
      </div>
    </div>
  );
}
