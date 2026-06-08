import { searchMovies, getImageUrl } from "@/lib/tmdb";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const movies = await searchMovies(q);

  return (
    <main className="bg-gray-950 min-h-screen text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-400 mb-8">Showing results for: <span className="text-white">{q}</span></p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie: any) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="cursor-pointer hover:scale-105 transition">
              {movie.poster_path ? (
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="rounded-lg w-full" />
              ) : (
                <div className="bg-gray-800 rounded-lg w-full aspect-[2/3] flex items-center justify-center">
                  <p className="text-gray-400 text-xs text-center p-2">{movie.title}</p>
                </div>
              )}
              <p className="mt-2 text-sm text-center">{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
