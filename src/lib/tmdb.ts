const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export function getImageUrl(path: string, size: string = "w500") {
  if (!path) return "/placeholder.png"; // Added fallback
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

async function safeFetch(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    
    if (!res.ok) {
      console.error(`TMDB API error: ${res.status} for ${url}`);
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
}

export async function fetchTrending() {
  const data = await safeFetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return data?.results || [];
}

export async function fetchPopular() {
  const data = await safeFetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return data?.results || [];
}

export async function fetchTopRated() {
  const data = await safeFetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  return data?.results || [];
}

export async function fetchMovieDetails(id: string) {
  const data = await safeFetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,watch/providers`
  );
  return data; // Returns null if failed, instead of crashing
}

export async function searchMovies(query: string) {
  if (!query.trim()) return [];
  const data = await safeFetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  return data?.results || [];
}

export async function fetchArchiveMovie(title: string) {
  const query = encodeURIComponent(title);
  const data = await safeFetch(
    `https://archive.org/advancedsearch.php?q=${query}+AND+mediatype:movies&fl[]=identifier,title,description&rows=1&output=json`
  );
  const item = data?.response?.docs?.[0];
  if (!item) return null;
  return `https://archive.org/embed/${item.identifier}`;
}