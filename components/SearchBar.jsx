"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className="flex justify-between items-center px-10">
        <div ><Link href={"/"}>MoviesHub</Link></div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
