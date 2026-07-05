import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">

        {}
        <h1 className="text-8xl font-extrabold text-black">404</h1>

        {}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page not found
        </h2>

        {}
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {}
        <div className="mt-6 flex items-center justify-center gap-3">
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
          >
            <Home size={16} />
            Home
          </Link>
        </div>

        {}
        <p className="mt-6 text-xs text-gray-400">
          If you think this is a mistake, check the URL or return to homepage.
        </p>

      </div>
    </div>
  );
}