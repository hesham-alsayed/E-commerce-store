import { MessageSquareOff } from "lucide-react";

export default function EmptyReviews() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      {}
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <MessageSquareOff className="w-7 h-7 text-gray-500" />
      </div>

      {}
      <h2 className="text-lg font-semibold text-gray-800">No Reviews Yet</h2>

      {}
      <p className="text-sm text-gray-500 max-w-sm">
        You haven’t written any reviews yet. Once you start reviewing products,
        they will appear here.
      </p>
    </div>
  );
}
