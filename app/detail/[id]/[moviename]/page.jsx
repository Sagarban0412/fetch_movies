"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const { id, title } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const readableTitle = decodeURIComponent(title);
  const API_KEY = "140002b56a644d6c13a08bfa3f454347";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, creditsRes, movieVideo, similarRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
        ]);

        setMovie(movieRes.data);
        setCast(creditsRes.data.cast.slice(0, 12));
        setSimilarMovies(similarRes.data.results.slice(0, 6));

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Movie not found</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {movie.backdrop_path && (
          <div className="absolute inset-0 h-[60vh] md:h-[70vh]">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
          </div>
        )}

        {/* Back Button */}
        <div className="relative z-10 pt-4 px-4 md:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Movie Info */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 pt-8 pb-16">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-2xl shadow-2xl w-64 md:w-80 lg:w-96 transition-transform duration-300 hover:scale-105"
                style={{
                  animation: 'slideInLeft 0.8s ease-out'
                }}
              />
            </div>

            {/* Movie Details */}
            <div className="flex-1 text-white" style={{ animation: 'slideInRight 0.8s ease-out' }}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-lg md:text-xl text-gray-300 italic mb-6">"{movie.tagline}"</p>
              )}

              {/* Movie Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-3 py-2 rounded-full">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-3 py-2 rounded-full">
                  <span>📅</span>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-3 py-2 rounded-full">
                  <span>⏱️</span>
                  <span>{movie.runtime} min</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gradient-to-r from-purple-600/50 to-pink-600/50 backdrop-blur-sm rounded-full text-sm border border-purple-500/30"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          👥 Cast
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {cast.map((actor, index) => (
            <div
              key={actor.id}
              className="group text-center"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="relative overflow-hidden rounded-xl mb-3">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-48 bg-slate-700 flex items-center justify-center">
                    <svg className="w-16 h-16 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-300 transition-colors duration-300">
                {actor.name}
              </h3>
              <p className="text-gray-400 text-xs line-clamp-2">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trailer Section */}
      {trailer && (
        <div className="container mx-auto px-4 md:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            🎞️ Trailer
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            🎬 Similar Movies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarMovies.map((similarMovie, index) => (
              <div
                key={similarMovie.id}
                className="group cursor-pointer"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
                onClick={() => router.push(`/detail/${similarMovie.id}/${similarMovie.title.toLowerCase().replace(/\s+/g, "-")}`)}
              >
                <div className="relative overflow-hidden rounded-xl mb-3 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`}
                    alt={similarMovie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ {similarMovie.vote_average.toFixed(1)}
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                  {similarMovie.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
