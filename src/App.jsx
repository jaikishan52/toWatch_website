import React from "react"
import { useState } from "react"
import Search from "./components/Search"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
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
