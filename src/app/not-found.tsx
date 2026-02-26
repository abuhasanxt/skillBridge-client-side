import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center max-w-md">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <Image
            src="/404.svg"
            alt="404 Not Found"
            width={300}
            height={300}
            priority
          />
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-300 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}