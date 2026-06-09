import { fetchMovieDetails, getImageUrl } from '@/lib/tmdb';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movie = await fetchMovieDetails(id);
  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  // NEW: Get watch providers
  const providers = movie['watch/providers']?.results?.US
  const stream = providers?.flatrate || [] // Netflix, Max, Disney+
  const rent = providers?.rent || [] // Apple, Amazon
  const buy = providers?.buy || [] // Apple, Amazon

  return (
    <main className="bg-gray-950 min-h-screen text-white">
      {/* Backdrop */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title || 'Movie'}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
      </div>

      {/* Details */}
      <div className="px-8 -mt-32 relative z-10 flex gap-8">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-48 rounded-xl shadow-2xl hidden md:block"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mt-1">
            {movie.release_date?.slice(0, 4)} • {movie.runtime} min • ⭐ {movie.vote_average?.toFixed(1)}
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {movie.genres?.map((g: any) => (
              <span key={g.id} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">{g.name}</span>
            ))}
          </div>
          <p className="mt-4 text-gray-300 max-w-2xl">{movie.overview}</p>

          {/* REMOVE THIS: <Link href={`/watch/${id}`}>... </Link>
              Replace with providers below */}
        </div>
      </div>

      {/* NEW: Where to Watch Section */}
      <section className="px-8 py-6">
        <h2 className="text-2xl font-bold mb-4">📺 Where to Watch</h2>

        {stream.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-yellow-400">Stream</h3>
            <div className="flex gap-3 flex-wrap">
              {stream.map((p: any) => (
                <a
                  key={p.provider_id}
                  href={providers.link}
                  target="_blank"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold"
                >
                  ▶ {p.provider_name}
                </a>
              ))}
            </div>
          </div>
        )}

        {rent.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-gray-300">Rent</h3>
            <div className="flex gap-3 flex-wrap">
              {rent.map((p: any) => (
                <a
                  key={p.provider_id}
                  href={providers.link}
                  target="_blank"
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-bold"
                >
                  {p.provider_name}
                </a>
              ))}
            </div>
          </div>
        )}

        {stream.length === 0 && rent.length === 0 && (
          <p className="text-gray-400">Not available for streaming yet. Check back soon!</p>
        )}
      </section>

      {/* Trailer */}
      {trailer && (
        <section className="px-8 py-10">
          <h2 className="text-2xl font-bold mb-4">🎬 Trailer</h2>
          <div className="aspect-video max-w-3xl">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* Cast */}
      <section className="px-8 py-10">
        <h2 className="text-2xl font-bold mb-4">🎭 Cast</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {movie.credits?.cast?.slice(0, 10).map((person: any) => (
            <div key={person.id} className="min-w-[120px] text-center">
              <img
                src={person.profile_path? getImageUrl(person.profile_path) : '/placeholder.png'}
                alt={person.name}
                className="rounded-full w-20 h-20 object-cover mx-auto"
              />
              <p className="text-sm mt-2">{person.name}</p>
              <p className="text-xs text-gray-400">{person.character}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}