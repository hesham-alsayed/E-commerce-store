const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-black" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927C9.3 2.1 10.7 2.1 10.951 2.927l1.286 4.02a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.406 2.475a1 1 0 00-.364 1.118l1.287 4.02c.25.827-.684 1.515-1.364 1.02L10 15.347l-3.387 2.733c-.68.495-1.614-.193-1.364-1.02l1.287-4.02a1 1 0 00-.364-1.118L2.766 9.447c-.783-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.535-4.02z" />
  </svg>
);

export default function RatingSummary({ reviewsStats }) {
  const stats = reviewsStats || {};

  const totalReviews = stats.totalReviews || 0;
  const average = stats.avgRating || 0;

  const ratings = stats.ratings || [
    { star: 5, count: 0 },
    { star: 4, count: 0 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-center mb-4">
        Customer Reviews
      </h2>

      {}
      <div className="flex items-center justify-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} filled={i <= Math.round(average)} />
        ))}

        <span className="text-sm text-gray-700">{average} out of 5</span>
      </div>

      <p className="text-center text-sm text-gray-500 mb-4">
        Based on {totalReviews} reviews
      </p>

      {}
      <div className="space-y-2">
        {ratings.map((r) => {
          const percentage =
            totalReviews === 0 ? 0 : (r.count / totalReviews) * 100;

          return (
            <div key={r.star} className="flex items-center gap-2">
              <span className="w-6 text-sm">{r.star}★</span>

              <div className="flex-1 h-3 bg-gray-200 rounded">
                <div
                  className="h-3 bg-black rounded"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="text-sm text-gray-500 w-6">{r.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
