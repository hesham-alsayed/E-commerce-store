export default function ProductReviews({
  reviews = [],
  openEditModal,
  openDeleteModal,
}) {
  if (!reviews.length) {
    return (
      <p className="text-gray-500 flex items-center justify-center">
        No reviews yet.
      </p>
    );
  }

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-black" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.92-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.96a1 1 0 00-.364-1.118L2.176 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.959z" />
      </svg>
    ));

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id || review.id} className="shadow p-4 rounded-lg">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <img src={review.user.avatar} className="w-10 h-10 rounded-full" />

              <div>
                <p className="font-semibold text-sm">
                  {review.user?.firstName} {review.user?.lastName}
                </p>
                <div className="flex gap-1 mt-1">
                  {renderStars(review.rating)}
                </div>

                <h4 className="font-semibold mt-2">{review.comment}</h4>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => openEditModal(review)}
                className="px-6 py-1 bg-white text-black border rounded"
              >
                Update
              </button>

              <button
                onClick={() => openDeleteModal(review._id || review.id)}
                className="px-6 py-1 bg-white text-black border rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
