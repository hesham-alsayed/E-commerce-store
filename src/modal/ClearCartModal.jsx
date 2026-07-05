"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export function ClearCartModal({ isOpen, onClose, onConfirm, loading }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl bg-white">
        {/* ✅ REQUIRED FOR ACCESSIBILITY */}
        <DialogHeader className="p-5 border-b">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-50 border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>

            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Clear Cart
              </DialogTitle>

              <p className="text-sm text-gray-500 mt-1">
                This will remove all items from your cart. This action cannot be
                undone.
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* BODY */}
        <div className="p-5">
          <p className="text-sm text-gray-600">
            Are you sure you want to clear your cart?
          </p>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-5 border-t mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="rounded-xl bg-red-600 text-white hover:bg-red-700 px-5"
            >
              {loading ? "Loading...." : " Clear Cart"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
