import React from "react"

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
  return (
    <div className="movie-card">
      <p className="text-white">
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.svg"} alt={title} />
      </p>

      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="/toWatch_website/star.svg" />
            {/* here it toFixed converts the following decimal value into 1 or 2 or 3 valued decimal*/}
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          {/*it is mainly used to write inline statements*/}
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">{release_date ? release_date.split("-")[0] : "N/A"}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
