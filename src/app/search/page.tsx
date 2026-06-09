import Link from "next/link";
import { searchMovies, getImageUrl } from "@/lib/tmdb";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const movies = q ? await searchMovies(q) : [];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>

      <p className="text-gray-400 mb-8">
        "{q || ""}"
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie: any) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="hover:scale-105 transition">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="rounded-lg"
              />

              <p className="text-sm mt-2">{movie.title}</p>
              <p className="text-xs text-gray-400">
                {movie.date.slice(0, 4)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}