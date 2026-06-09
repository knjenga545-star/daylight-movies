const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
  "Content-Type": "application/json",
};

// IMAGE HELPER
export function getImageUrl(path: string) {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/w500${path}`;
}

// TRENDING
export async function fetchTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/day`, {
    headers,
    cache: "no-store",
  });

  const data = await res.json();
  return data.results || [];
}

// POPULAR
export async function fetchPopular() {
  const res = await fetch(`${BASE_URL}/movie/popular`, {
    headers,
    cache: "no-store",
  });

  const data = await res.json();
  return data.results || [];
}

// TOP RATED
export async function fetchTopRated() {
  const res = await fetch(`${BASE_URL}/movie/top_rated`, {
    headers,
    cache: "no-store",
  });

  const data = await res.json();
  return data.results || [];
}

// SEARCH
export async function searchMovies(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    {
      headers,
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.results || [];
}