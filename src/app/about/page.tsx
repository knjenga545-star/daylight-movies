import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Daylight Movies</h1>
      <p className="text-gray-300 mb-4">
        Daylight Movies helps you discover where to legally stream, rent, or buy the newest movies. 
        We show official trailers, cast info, and direct links to Netflix, Max, Prime Video, Apple TV, and more.
      </p>
      <p className="text-gray-300 mb-4">
        All movie data is provided by The Movie Database (TMDB). We do not host or stream any content.
      </p>
      <Link href="/privacy" className="text-yellow-400">Privacy Policy</Link>
    </div>
  );
}