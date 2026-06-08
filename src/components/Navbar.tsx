'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="text-yellow-400 text-2xl font-bold">🌅 Daylight Movies</Link>
      
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="bg-gray-800 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
          🔍
        </button>
      </form>

      <div className="flex gap-4">
        <Link href="/login" className="text-gray-300 hover:text-white">Login</Link>
        <Link href="/signup" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">Sign Up</Link>
      </div>
    </nav>
  );
}