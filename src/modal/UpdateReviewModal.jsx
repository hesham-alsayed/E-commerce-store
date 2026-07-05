"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function UpdateReviewModal({
  open,
  onClose,
  review,
  onSubmit,
  isLoading,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const check = () => {
      if (review) {
        setRating(review.rating || 0);
        setComment(review.comment || "");
      }
    };
    check();
  }, [review]);

  const handleSubmit = async () => {
    await onSubmit(review._id, { rating, comment });
    onClose();
  };

  if (!review) return null;

  const product = review.product;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Review</DialogTitle>
        </DialogHeader>

        {}
        <div className="flex gap-4 ">
          <img
            src={product?.variants[0]?.images[0]}
            alt={product?.title}
            className="w-20 h-30 object-cover rounded"
          />

          <div className="text-sm">
            <p className="font-medium">{product?.title}</p>
            <p className="text-gray-500">Brand: {product?.brand}</p>
            <p className="text-gray-500">Material: {product?.material}</p>
          </div>
        </div>

        {}
        <div className="flex gap-1 mt-3">
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} type="button" onClick={() => setRating(num)}>
              <Star
                className={`w-6 h-6 ${
                  rating >= num ? "fill-black text-black" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-3 p-2 resize-none max-h-20 min-h-15 w-full border focus:outline-none focus-visible:ring-0"
        />

        {}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
