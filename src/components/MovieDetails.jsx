import React from "react"

const MovieDetails = ({ movie, onBack }) => {
  if (!movie) return <p className="text-white">No movie selected</p>

  const { title, overview, poster_path, vote_average, release_date, original_language } = movie

  return (
    <div className="movie-details">
      <button onClick={onBack} className="mb-6 text-sm px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition">
        ← Back to results
      </button>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.svg"} alt={title} />

        <div className="flex-1">
          <h2>{title}</h2>

          <div className="metadata">
            <div className="flex items-center gap-1">
              <img src="/toWatch_website/star.svg" alt="rating" className="w-5 h-5" />
              <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
            </div>
            <span>•</span>
            <span className="capitalize">{original_language}</span>
            <span>•</span>
            <span>{release_date?.split("-")[0] || "N/A"}</span>
          </div>
          <p className="overview-heading">Overview</p>
          <p className="overview">{overview || "No description available."}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
