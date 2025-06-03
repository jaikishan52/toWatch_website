import React from "react"

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src="/toWatch_website/search.svg" alt="search" />
        <input type="text" placeholder="Search through thousands of movies" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      </div>
    </div>
  )
} //we should never mutate props or state

// const Search = (props) => {
//   return <div className="text-white text-3xl">{props.searchTerm}</div>
// }

export default Search
