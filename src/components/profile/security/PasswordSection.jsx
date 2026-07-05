import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PasswordField from "./PasswordField";

export default function PasswordSection({ handleUpdatePassword, loading }) {
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    passwordConfirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      await handleUpdatePassword(data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current Password */}
          <div>
            <PasswordField
              label="Current Password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              show={show.currentPassword}
              toggle={() =>
                setShow({
                  ...show,
                  currentPassword: !show.currentPassword,
                })
              }
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <PasswordField
              label="New Password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
                validate: {
                  hasUpper: (v) =>
                    /[A-Z]/.test(v) ||
                    "Must contain at least one uppercase letter",
                  hasLower: (v) =>
                    /[a-z]/.test(v) ||
                    "Must contain at least one lowercase letter",
                },
              })}
              show={show.newPassword}
              toggle={() =>
                setShow({
                  ...show,
                  newPassword: !show.newPassword,
                })
              }
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <PasswordField
              label="Confirm Password"
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (v) => v === newPassword || "Passwords do not match",
              })}
              show={show.passwordConfirm}
              toggle={() =>
                setShow({
                  ...show,
                  passwordConfirm: !show.passwordConfirm,
                })
              }
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
