import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import MovieCard from "./components/MovieCard"
import Search from "./components/Search"
import Spinner from "./components/Spinner"
import { useDebounce } from "react-use"
import { getTrendingMovies, updateSearchCount } from "./appwrite"
import MovieDetails from "./components/MovieDetails"

const API_BASE_URL = "https://api.themoviedb.org/3"

// when the variables value not gonna change i can use this case
const API_KEY = import.meta.env.VITE_TMBD_API_KEY
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
}
// text-red-500 sets the red color shade for the text
//
const App = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const [movieList, setMovieList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [debounceSearchterm, setDebouncedSearchTerm] = useState("")

  const [trendingMovies, setTrendingMovies] = useState([])

  const [selectedMovie, setSelectedMovie] = useState(null)

  //It debounces the search term making too many API requests
  //By waiting for the user to stop typing for 500 ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  //concept of debouncing will be used
  const fetchMovies = async (query = "") => {
    setIsLoading(true)
    setErrorMessage("")

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}?` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS) //make https requests , get the data from apis
      if (!response.ok) {
        throw new Error("Failed to fetch movies")
      }

      const data = await response.json()
      //console.log(data)
      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies")
        setMovieList([])
      }
      setMovieList(data.results || [])
      if (data.results.length > 0) {
        await updateSearchCount(searchTerm, data.results[0])
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage(`Error fetching movies: Please try again later`)
    } finally {
      setIsLoading(false)
    }
  }
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)
      //console.log("movies:"+movies)
    } catch (error) {
      console.error(`Error fetching trending movies.`)
      //setErrorMessage(`Error fetching trending movies.`) we do not set the error message because if we do it
    }
  }
  useEffect(() => {
    fetchMovies(debounceSearchterm)
  }, [debounceSearchterm])

  useEffect(() => {
    // we have created new userEffect hook so the trending section only executes once at the start
    loadTrendingMovies()
  }, [])

  return (
    <div>
      <div className="pattern" />
      <div className="wrapper">
        {selectedMovie ? (
          <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
        ) : (
          <>
            <header>
              <img src="/toWatch_website/hero-img.png" alt="Hero Banner" />
              <h1>
                Find <span className="text-gradient">Movies </span>You'll Enjoy Without the Hassle
              </h1>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li
                    key={movie.$id}
                    onClick={async () => {
                      const matchingMovie = movieList.find((m) => m.id === Number(movie.movie_id))

                      if (matchingMovie) {
                        setSelectedMovie(matchingMovie)
                      } else {
                        try {
                          const response = await fetch(`${API_BASE_URL}/movie/${movie.movie_id}`, API_OPTIONS)
                          if (!response.ok) throw new Error("Movie fetch failed")

                          const data = await response.json()
                          setSelectedMovie(data)
                        } catch (err) {
                          console.error("Could not fetch movie by ID:", err)

                          setSelectedMovie({
                            id: movie.movie_id,
                            title: movie.title || "Unknown Title",
                            poster_path: movie.poster_url?.replace("https://image.tmdb.org/t/p/w500/", "") || null,
                            vote_average: movie.vote_average || 0,
                            release_date: movie.release_date || "N/A",
                            original_language: movie.original_language || "en",
                            overview: movie.overview || "Overview not available",
                          })
                        }
                      }
                    }}
                  >
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title || "Movie"} className="cursor-pointer hover:opacity-80 transition" />
                  </li>
                ))}
              </ul>
            </section>

            <section className="all-movies">
              <h2>All Movies</h2>
              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                <ul>
                  {movieList.map((movie) => (
                    <li key={movie.id} onClick={() => setSelectedMovie(movie)}>
                      <MovieCard movie={movie} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default App
