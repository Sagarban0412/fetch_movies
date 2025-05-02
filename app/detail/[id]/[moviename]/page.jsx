"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const { id, title } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState([]);

  const readableTitle = decodeURIComponent(title);
  const API_KEY = "140002b56a644d6c13a08bfa3f454347";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(movieRes.data);

        const creditsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        setCast(creditsRes.data.cast.slice(0, 10));

        const movieVideo = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const youtubeTrailer = movieVideo.data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailer(youtubeTrailer);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-10 justify-center items-center px-4 sm:px-10 mt-10">
        <div className="w-full sm:w-auto">
          <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow mb-6 max-h-[500px] w-full sm:w-auto object-cover"
          />
        </div>
        <div className="flex-1 w-full max-w-xl">
          <p className="text-gray-700 mb-2 text-sm sm:text-base">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="text-gray-700 mb-2 text-sm sm:text-base">
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            <strong>Overview:</strong> {movie.overview}
          </p>

          <h2 className="text-2xl font-semibold mb-4">👥 Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/no-image.jpg"
                  }
                  alt={actor.name}
                  className="rounded-lg mx-auto h-36 w-full object-cover"
                />
                <p className="mt-2 font-medium text-sm">{actor.name}</p>
                <p className="text-xs text-gray-500">as {actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trailer */}
      <div className="w-full px-4 sm:px-10 pb-10 mt-10">
        {trailer && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">🎞 Trailer</h2>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                allowFullScreen
                className="rounded-lg w-full"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
