"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Pagination from "./Pagination";
import Link from "next/link";

const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=140002b56a644d6c13a08bfa3f454347&page=${page}`
        );
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      } catch (error) {
        console.error("Error fetching popular movies", error);
      }
    };

    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔥 Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded shadow">
            <Link href={`/detail/${movie.id}/${movie.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2"
              />
              <p className="text-sm font-semibold">{movie.title}</p>
            </Link>
          </div>
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

export default HomePage;
