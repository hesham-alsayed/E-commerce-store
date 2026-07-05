import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DeleteAccountCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleDelete = () => {
    console.log("Account deleted");
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Delete Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm">
            Deleting your account will remove all your data permanently.
          </p>

          <Button variant="destructive" onClick={() => setOpen(true)}>
            Delete My Account
          </Button>
        </CardContent>
      </Card>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-lg p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-red-600">
              Confirm Delete
            </h3>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}