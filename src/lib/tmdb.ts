const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export function getImageUrl(path: string, size: string = "w500") {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function fetchTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`, { cache: "no-store" });
  const data = await res.json();
  return data.results || [];
}

export async function fetchPopular() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, { cache: "no-store" });
  const data = await res.json();
  return data.results || [];
}

export async function fetchTopRated() {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, { cache: "no-store" });
  const data = await res.json();
  return data.results || [];
}

export async function fetchMovieDetails(id: string) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,watch/providers`, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export async function searchMovies(query: string) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`, { cache: "no-store" });
  const data = await res.json();
  return data.results || [];
}

export async function fetchArchiveMovie(title: string) {
  const query = encodeURIComponent(title);
  const res = await fetch(
    `https://archive.org/advancedsearch.php?q=${query}+AND+mediatype:movies&fl[]=identifier,title,description&rows=1&output=json`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const item = data.response?.docs?.[0];
  if (!item) return null;
  return `https://archive.org/embed/${item.identifier}`;
}