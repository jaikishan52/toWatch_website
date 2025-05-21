import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import Search from "./components/Search"

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

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {}, [])

  return (
    <div>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./public/hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies </span>You'll Enjoy Without the Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </div>
  )
}

export default App
