"use client";

import { useState } from "react";
import RatingSummary from "./RatingSummary";
import ProductReviews from "./ProductReviews";
import ReviewModal from "@/modal/ReviewModal";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { DeleteModal } from "@/modal/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { createReview, updateReview, deleteReview } from "@/lib/features/reviewsSlice";
import { fetchProductById } from "@/lib/features/productsSlice";

export default function CustomerReviews({
  reviewsStats,
  reviews = [],
  product,
}) { 
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.reviews);
  const { user } = useSelector(state => state.auth);
  const { id } = useParams();

  const [showReviewModal, setShowReviewModal] = useState(false);

  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const openCreateModal = () => {
    setIsEdit(false);
    setRatingValue(0);
    setComment("");
    setShowReviewModal(true);
  };

  const openEditModal = (review) => {
    setIsEdit(true);
    setEditId(review._id);

    setRatingValue(review.rating);
    setComment(review.comment);
    setShowReviewModal(true);
  };

  const onClickDelete = (reviewId) => {
    setDeletedId(reviewId);
    setOpenDeleteModal(true);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must login first");
      return;
    }

    const payload = {
      product: product._id,
      rating: ratingValue,
      comment,
    };

    try {
      if (isEdit) {
        await dispatch(updateReview({ id: editId, data: payload })).unwrap();
      } else {
        await dispatch(createReview(payload)).unwrap();
      }

      dispatch(fetchProductById(id));
      setShowReviewModal(false);
    } catch (err) {
      toast.error(err || "Failed to save review");
    }
  };

  const handleDeleteReview = async () => {
    try {
      setLoadingDelete(true);
      await dispatch(deleteReview(deletedId)).unwrap();
      await dispatch(fetchProductById(id));
    } catch (error) {
      toast.error(error || "Error deleting review");
    } finally {
      setLoadingDelete(false);
      setOpenDeleteModal(false);
    }
  };

  return (
    <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <RatingSummary reviewsStats={reviewsStats} />

        <button
          onClick={openCreateModal}
          className="bg-gray-200 w-full text-black px-4 py-2 rounded-xl mt-4"
        >
          Write Review
        </button>
      </div>

      <div>
        <ProductReviews
          reviews={reviews}
          openEditModal={openEditModal}
          openDeleteModal={onClickDelete}
        />
      </div>

      <ReviewModal
        isOpen={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        comment={comment}
        setComment={setComment}
        handleSubmit={handleSubmit}
        isEdit={isEdit}
        loading={loading}
      />
      <DeleteModal
        isLoadingDelete={loadingDelete}
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        itemTitle={deletedId}
        title={"Review"}
        onConfirm={handleDeleteReview}
      />
    </div>
  );
}
