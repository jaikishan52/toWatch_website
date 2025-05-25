import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import MovieCard from "./components/MovieCard"
import Search from "./components/Search"
import Spinner from "./components/Spinner"

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

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
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
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage(`Error fetching movies: Please try again later`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./public/hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies </span>You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {/* when we are trying to delete about particular movie or something we 
              need to point it out to the particular id so good to maintain a key */}
              {movieList.map((movie) => (
                // <p key={movie.id} className="text-white">
                //   {movie.title}{" "}
                // </p>
                <MovieCard key={movie.id} movie={movie} />
                
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
