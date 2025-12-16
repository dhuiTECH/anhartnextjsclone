import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-6xl font-serif font-bold text-[#1a2621] mb-4">
          404
        </h1>
        <h2 className="text-2xl font-serif font-bold text-[#1a2621] mb-4">
          Page Not Found
        </h2>
        <p className="text-[#1a2621]/60 mb-8">
          The page you're looking for doesn't exist. Let's get you back home.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#a6906c] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#8b7355] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
