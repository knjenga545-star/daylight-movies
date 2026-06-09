import { searchMovies, getImageUrl } from '@/lib/tmdb'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  
  if (!q) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <h1 className="text-3xl font-bold">Search Movies</h1>
        <p className="text-gray-400 mt-2">Use the search bar to find movies</p>
      </div>
    )
  }

  const results = await searchMovies(q)

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Results for "{q}"</h1>
      
      {results.length === 0 ? (
        <p className="text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((movie: any) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <div className="hover:scale-105 transition">
                <img
                  src={movie.poster_path ? getImageUrl(movie.poster_path) : '/placeholder.png'}
                  alt={movie.title}
                  className="rounded-lg w-full"
                />
                <p className="text-sm mt-2">{movie.title}</p>
                <p className="text-xs text-gray-400">{movie.release_date?.slice(0, 4)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}