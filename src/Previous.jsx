import React from 'react'
import './App.css'

function App() {

  const [movieDb, setMovieDb] = React.useState([])
  const [movieSearch, setMovieSearch] = React.useState([])
  const [movieData, setMovieData] = React.useState([])

  function searchBtn() {
    fetch(`https://www.omdbapi.com/?apikey=ac2430f2&type=movie&s=${movieSearch}&plot=full`)
      .then(res => res.json())
      .then(data => {
      setMovieDb(data.Search);
      getMovieData(); // Call getMovieData only after setting movieDb
    });
  }
  console.log(movieDb)
  function getMovieData() {
    const movieId = movieDb.map(item => item.imdbID)
    movieId.forEach((item) =>
      fetch(`https://www.omdbapi.com/?apikey=ac2430f2&type=movie&i=${item}&plot=full`)
        .then(res => res.json())
        .then(data => setMovieData(data)))

}
    console.log(movieData)

  function handleChange(e) {
    setMovieSearch(e.target.value)
    // console.log(movieSearch)
  }

  return (
    <div className="movie-container">
      <div className="nav-bar">
        <h1 className="title-text">Find Your Film</h1>
        </div>
        <div className="button-container">
          <input
          className="search-input"
          type="text"
          value={movieSearch} // Use movieSearch here, not e.target.value
            onChange={handleChange}
            placeholder="Search"/>
          <button
            className="search-btn"
            onClick={searchBtn}
          >Search
        </button>
        </div>
          <div className="movie-array-container">
        {movieData.map((movieItem, movieIndex) => (
          <div key={movieIndex}>
            <h1>{movieItem.Title}</h1>
            <img src={movieItem.Poster}></img>
            </div>
        ))}
          </div>
        
        
      
    </div>
  )
}

export default App
