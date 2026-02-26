"use client";

import { useEffect } from "react";

export default function CategoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          Something unexpected happened. Please try again or come back later.
        </p>

        {/* Action */}
        <button
          onClick={() => reset()}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition duration-200"
        >
          🔄 Retry
        </button>

        {/* Optional error digest */}
        {error.digest && (
          <p className="text-xs text-gray-400 mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}