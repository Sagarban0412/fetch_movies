"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Pagination from "./Pagination";
import Link from "next/link";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const page = parseInt(searchParams.get("page") || "1");
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=140002b56a644d6c13a08bfa3f454347&query=${query}&language=en-US`
        );
        setResults(res.data.results);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchResults();
  }, [query]);

  const handlePageChange = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((movie) => (
          
            <Link href={`/detail/${movie.id}/${movie.title}`} key={movie.id}>
            <div className="bg-white p-4 rounded shadow">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2"
              />
              <p className="text-sm font-semibold">{movie.title}</p>
            </div>
            </Link>
          
        ))}
      </div>
      <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
    </div>
  );
};

export default SearchPage;
