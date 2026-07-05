"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function ReviewModal({
  isOpen,
  setShowReviewModal,
  ratingValue,
  setRatingValue,
  comment,
  setComment,
  handleSubmit,
  isEdit,
  loading,
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const Star = ({ filled, onClick }) => (
    <svg
      onClick={onClick}
      className={`w-6 h-6 cursor-pointer ${
        filled ? "text-black" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927C9.3 2.1 10.7 2.1 10.951 2.927l1.286 4.02a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.406 2.475a1 1 0 00-.364 1.118l1.287 4.02c.25.827-.684 1.515-1.364 1.02L10 15.347l-3.387 2.733c-.68.495-1.614-.193-1.364-1.02l1.287-4.02a1 1 0 00-.364-1.118L2.766 9.447c-.783-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.535-4.02z" />
    </svg>
  );

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center
      transition-opacity duration-300
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      onClick={() => setShowReviewModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-125 max-w-[90%] rounded-lg shadow-xl p-6
        transform transition-all duration-300
        ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setShowReviewModal(false)}
            className="p-2 hover:bg-gray-200 rounded"
          >
            <IoCloseSharp size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">
            {isEdit ? "Update Review" : "Write a Review"}
          </h3>

          {/* STARS */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                filled={i <= ratingValue}
                onClick={() => setRatingValue(i)}
              />
            ))}
          </div>

          {/* COMMENT */}
          <label className="text-sm">Review:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full max-h-20 min-h-15 border p-2 rounded h-28 mt-2"
          />

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full hover:cursor-pointer hover:bg-gray-200 bg-gray-100 text-sm border text-black py-2 rounded-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEdit ? "Updating..." : "Submitting..."}
              </>
            ) : (
              <>{isEdit ? "Update Review" : "Submit Review"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
