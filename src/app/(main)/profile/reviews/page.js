"use client";

import { useDispatch, useSelector } from "react-redux";
import { getMyReviews, updateReview, deleteReview } from "@/lib/features/reviewsSlice";
import { useEffect, useState } from "react";
import CurrentRoute from "@/views/CurrentRoute";
import ReviewCard from "@/components/profile/reviews/ReviewCard";
import { DeleteModal } from "@/modal/DeleteModal";
import UpdateReviewModal from "@/modal/UpdateReviewModal";
import ReviewsPageSkeleton from "@/skeleton/ReviewPageSkeleton";
import EmptyReviews from "@/components/EmptyReviews";

export default function ReviewsPage() {
  const dispatch = useDispatch();
  const {
    reviews,
    actionLoading,
    loading,
  } = useSelector((state) => state.reviews);

  const [openDelete, setOpenDelete] = useState(false);
  const [reviewDelete, setReviewDelete] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [reviewEdit, setReviewEdit] = useState(null);

  useEffect(() => {
    dispatch(getMyReviews());
  }, [dispatch]);
  // ================= EDIT =================
  const onClickEdit = (review) => {
    setReviewEdit(review);
    setOpenEdit(true);
  };

  console.log(reviews);

  // ================= DELETE =================
  const onClickDelete = (review) => {
    setReviewDelete(review);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteReview(reviewDelete._id)).unwrap();
    } finally {
      setReviewDelete(null);
      setOpenDelete(false);
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (id, data) => {
    await dispatch(updateReview({ id, data })).unwrap();
  };

  if (loading) return <ReviewsPageSkeleton />;
  return (
    <div className="space-y-4">
      <div className="mt-4">
        <CurrentRoute />
      </div>

      <h1 className="text-2xl font-semibold">My Reviews</h1>
      <p className="text-sm text-gray-500">
        Manage your product ratings and feedback.
      </p>

      {reviews.length === 0 ? (
        <EmptyReviews />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {" "}
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onEdit={onClickEdit}
              onDelete={onClickDelete}
            />
          ))}
        </div>
      )}

      {/* DELETE MODAL */}
      <DeleteModal
        isLoadingDelete={actionLoading}
        isOpen={openDelete}
        itemTitle={reviewDelete?.product?.title}
        onClose={() => setOpenDelete(false)}
        title="review"
        onConfirm={handleDelete}
      />

      {/* UPDATE MODAL */}
      <UpdateReviewModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        review={reviewEdit}
        onSubmit={handleUpdate}
        isLoading={actionLoading}
      />
    </div>
  );
}
