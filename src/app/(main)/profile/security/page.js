"use client";

import DeleteAccountCard from "@/components/profile/security/DeleteAccountCard";
import PasswordSection from "@/components/profile/security/PasswordSection";
import CurrentRoute from "@/views/CurrentRoute";
import { useDispatch } from "react-redux";
import { updateMyPassword } from "@/lib/features/authSlice";
import { useState } from "react";
import { toast } from "sonner";

export default function SecurityPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (formData) => {
    try {
      setLoading(true);
      await dispatch(updateMyPassword(formData)).unwrap();
      toast.success("update password success");
    } catch (error) {
      toast.error(error || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 md:mt-4 px-4">
      {}
      <CurrentRoute />

      <h2 className="text-2xl font-bold mb-6">🔐 Security Settings</h2>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {}
        <div className="w-full">
          <PasswordSection
            handleUpdatePassword={handleUpdatePassword}
            loading={loading}
          />
        </div>

        {}
        <div className="w-full">
          <DeleteAccountCard />
        </div>
      </div>
    </div>
  );
}
