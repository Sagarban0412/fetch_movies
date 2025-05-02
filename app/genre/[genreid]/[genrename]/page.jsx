"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Pagination from "@/components/Pagination"; // make sure you have this component
import Link from "next/link";

const page = () => {
  const { genreid, genrename } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreid}&page=${currentPage}&api_key=140002b56a644d6c13a08bfa3f454347`
        );
        setMovie(res.data.results);
        setTotalPages(res.data.total_pages);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [genreid, currentPage]);

  const handlePageChange = (newPage) => {
    router.push(`/genre/${genreid}/${genrename}?page=${newPage}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-4 text-center">
        {genrename} Movies
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : movie.length === 0 ? (
        <p className="text-gray-500">No movies found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {movie.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Link href={`/detail/${movie.id}/${movie.title}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-semibold text-lg">{movie.title}</h2>
                    <p className="text-gray-600">{movie.release_date}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default page;
