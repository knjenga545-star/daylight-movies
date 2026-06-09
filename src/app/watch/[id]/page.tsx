import { fetchMovieDetails, getImageUrl, fetchArchiveMovie } from '@/lib/tmdb';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);
  const archiveUrl = await fetchArchiveMovie(movie.title);
  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  return (
    <main className="bg-gray-950 min-h-screen text-white">
      {/* Top Bar */}
      <div className="flex items-center gap-4 px-6 py-4 bg-gray-900">
        <Link href={`/movie/${id}`} className="text-gray-400 hover:text-white">← Back</Link>
        <h1 className="text-xl font-bold">{movie.title}</h1>
      </div>

      {/* Ad Banner Top */}
      <div className="w-full bg-gray-800 text-center py-3 text-gray-400 text-sm">
        📢 Advertisement
      </div>

      {/* Video Player */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {archiveUrl ? (
          <div className="aspect-video w-full">
            <iframe
              src={archiveUrl}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        ) : trailer ? (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              className="w-full h-full rounded-xl"
              allowFullScreen
              allow="autoplay"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gray-800 rounded-xl flex items-center justify-center">
            <p className="text-gray-400 text-xl">No video available</p>
          </div>
        )}

        {/* Ad Banner Middle */}
        <div className="w-full bg-gray-800 text-center py-6 mt-6 rounded-xl text-gray-400 text-sm">
          📢 Advertisement — Your ad here
        </div>

        {/* Movie Info */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p className="text-gray-400 mt-1">
            {movie.release_date?.slice(0, 4)} • {movie.runtime} min • ⭐ {movie.vote_average?.toFixed(1)}
          </p>
          <p className="text-gray-300 mt-3">{movie.overview}</p>
        </div>
      </div>

      {/* Ad Banner Bottom */}
      <div className="w-full bg-gray-800 text-center py-3 mt-6 text-gray-400 text-sm">
        📢 Advertisement
      </div>
    </main>
  );
}