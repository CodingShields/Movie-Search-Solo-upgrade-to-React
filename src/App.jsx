import React, { useState} from 'react';
import star from "./assets/star.png"
import watchlist from "./assets/watchlist.png"
import popcorn from "./assets/popcorn.jpg"
import './App.css'

function App() {
  const [movieDb, setMovieDb] = useState([]);
  const [movieSearch, setMovieSearch] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [showFullText, setShowFullText] = useState(false)

  async function searchBtn() {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=ac2430f2&type=movie&s=${movieSearch}&plot=full`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMovieDb(data.Search);
      await getMovieData(); // Use await to ensure it finishes before moving on
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show a message to the user
    }
  }

  async function getMovieData() {
    const movieId = movieDb.map(item => item.imdbID);
    try {
      const promises = movieId.map(async (item) => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=ac2430f2&type=movie&i=${item}&plot=full`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
      const movieDetails = await Promise.all(promises);
      setMovieData(movieDetails);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or show a message to the user
    }
  }

  function handleChange(e) {
    setMovieSearch(e.target.value);
  }

  function toggleShowText() {
    console.log("clicked")
    setShowFullText(!showFullText)
    // e.target.style.display = "null"
    
  }


  return (
    <div className="movie-container">
      <div className="nav-bar">
        <h1 className="title-text">Find New and Favorite Movies</h1>
        <img
          className="movie-img"
          src={popcorn}></img>
        
        
      </div>
        <div className="button-container">
          <input
            className="search-input"
            type="text"
            value={movieSearch} 
            onChange={handleChange}
            placeholder="Search"/>
          <button
            className="search-btn"
            onClick={searchBtn}>
            Search
          </button>
        </div>
    <div className="movie-list-container">
      {movieData.map((movieItem, movieIndex) => (
        <div key={movieIndex}
             className="movie-card">
            <img className="movie-poster"
                 src={movieItem.Poster}>
            </img>
        <div className="movie-details">
          <h1 className="movie-title">{movieItem.Title}
              <img  src={star}
                    className="star-icon">
              </img>
              <span className="rating-text">
                {movieItem.imdbRating}
              </span> 
          </h1>
          <h3 className="run-time-text">{movieItem.Runtime}
              <h3 className="genre-text">{movieItem.Genre}
              </h3>
              <img src={watchlist}
                className="watchlist-icon"
              >
              </img>
              <h1
                className="watch-list-text">
                Watchlist
              </h1>
          </h3>
            <div
              className={!showFullText ? "movie-plot-short" : "movie-plot-long"}
            >
              {movieItem.Plot}
            </div>
            <button
              className="read-more-btn"
              onClick={toggleShowText}>
              {showFullText ? "...Read Less" : "...Read More"}
            </button>

        </div> 
        </div> //end of movie list container
        ))}
    </div>
        
        
      
    </div>
  )
}

export default App
