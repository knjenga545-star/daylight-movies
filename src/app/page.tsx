import { fetchTrending, fetchPopular, fetchTopRated, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const [trending, popular, topRated] = await Promise.all([
    fetchTrending(),
    fetchPopular(),
    fetchTopRated(),
  ]);

  return (
    <main className="bg-gray-950 min-h-screen text-white">
      {/* Hero */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={getImageUrl(trending[0].backdrop_path, 'original')}
          alt={trending[0].title}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute bottom-10 left-10">
          <h1 className="text-5xl font-bold mb-3">{trending[0].title}</h1>
          <p className="text-gray-300 max-w-xl">{trending[0].overview}</p>
          <Link href={`/movie/${trending[0].id}`}>
            <button className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold">
              ▶ Watch Now
            </button>
          </Link>
        </div>
      </div>

      {/* Trending */}
      <section className="px-8 py-10">
        <h2 className="text-2xl font-bold mb-4">🔥 Trending</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {trending.map((movie: any) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="min-w-[160px] cursor-pointer hover:scale-105 transition">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="rounded-lg" />
                <p className="mt-2 text-sm text-center">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="px-8 py-10">
        <h2 className="text-2xl font-bold mb-4">⭐ Popular</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {popular.map((movie: any) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="min-w-[160px] cursor-pointer hover:scale-105 transition">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="rounded-lg" />
                <p className="mt-2 text-sm text-center">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated */}
      <section className="px-8 py-10">
        <h2 className="text-2xl font-bold mb-4">🏆 Top Rated</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {topRated.map((movie: any) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="min-w-[160px] cursor-pointer hover:scale-105 transition">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="rounded-lg" />
                <p className="mt-2 text-sm text-center">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}