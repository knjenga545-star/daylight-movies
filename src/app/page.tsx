import { fetchTrending, fetchPopular, fetchTopRated, getImageUrl } from '@/lib/tmdb';
import Link from 'next/link';

export const dynamic = 'force-dynamic' // THIS LINE IS MANDATORY

export default async function Home() {
  const [trending, popular, topRated] = await Promise.all([
    fetchTrending(),
    fetchPopular(),
    fetchTopRated(),
  ]);

  const featured = trending?.[0];

  return (
    <main className="bg-gray-950 min-h-screen text-white">
      {featured && (
        <div className="relative h-[70vh] w-full overflow-hidden">
          <img
            src={getImageUrl(featured.backdrop_path, 'original')}
            alt={featured.title}
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute bottom-10 left-10">
            <h1 className="text-5xl font-bold mb-3">{featured.title}</h1>
            <p className="text-gray-300 max-w-xl">{featured.overview}</p>
            <Link href={`/movie/${featured.id}`}>
              <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold">
                ▶ View Details
              </button>
            </Link>
          </div>
        </div>
      )}

      {trending?.length > 0 && (
        <section className="px-8 py-10">
          <h2 className="text-2xl font-bold mb-4">🔥 Trending</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {trending.map((movie: any) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="min-w-[160px] cursor-pointer hover:scale-105 transition">
                  <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="rounded-lg w-full" />
                  <p className="mt-2 text-sm text-center">{movie.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {popular?.length > 0 && (
        <section className="px-8 py-10">
          <h2 className="text-2xl font-bold mb-4">⭐ Popular</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {popular.map((movie: any) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="min-w-[160px] cursor-pointer hover:scale-105 transition">
                  <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="rounded-lg w-full" />
                  <p className="mt-2 text-sm text-center">{movie.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {topRated?.length > 0 && (
        <section className="px-8 py-10">
          <h2 className="text-2xl font-bold mb-4">🏆 Top Rated</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {topRated.map((movie: any) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="min-w-[160px] cursor-pointer hover:scale-105 transition">
                  <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="rounded-lg w-full" />
                  <p className="mt-2 text-sm text-center">{movie.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}