import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function StarRating({ rating, setRating, editable }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
        editable ? (
          <button key={star} onClick={() => setRating(star)}>
            {star <= rating ? (
              <AiFillStar className="text-yellow-400" />
            ) : (
              <AiOutlineStar className="text-gray-400" />
            )}
          </button>
        ) : star <= rating ? (
          <AiFillStar key={star} className="text-yellow-400" />
        ) : (
          <AiOutlineStar key={star} className="text-gray-400" />
        )
      )}
    </div>
  );
}