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
    <div className="p-4">
      <div className="flex overflow-x-auto gap-2 hide-scrollbar">
        {genre.map((data) => (
          <Link href={`/genre/${data.id}/${data.name.toLowerCase().replace(/\s+/g, '-')}`} key={data.id}>
            <div className="min-w-fit whitespace-nowrap border rounded-xl bg-gray-100 hover:bg-gray-200 cursor-pointer px-4 py-2 text-sm shadow-md transition">
              {data.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
