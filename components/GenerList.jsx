"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const GenreList = () => {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=140002b56a644d6c13a08bfa3f454347&language=en-US`
        );
        setGenre(res.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex overflow-x-auto gap-3 hide-scrollbar">
          {genre.map((data) => (
            <Link href={`/genre/${data.id}/${data.name.toLowerCase().replace(/\s+/g, '-')}`} key={data.id}>
              <div className="min-w-fit whitespace-nowrap bg-slate-700/50 hover:bg-gradient-to-r hover:from-purple-600/50 hover:to-pink-600/50 cursor-pointer px-4 py-2 text-sm text-white rounded-full border border-slate-600 hover:border-purple-500 transition-all duration-300 hover:scale-105 shadow-lg">
                {data.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreList;
