// src/App.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import './App.css';


function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async (query) => {
      try {
          setIsLoading(true);
          const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          const movies = data.docs.map((doc) => ({
              title: doc.title,
              author: doc.author_name?.[0],
              year: doc.first_publish_year,
          }));
          setMovies(movies);
      } catch (error) {
          console.error('Fetching error:', error);
          alert('Failed to fetch movies. Please try again later.');
      } finally {
          setIsLoading(false);
      }
  };
  

    return (
      <div className="App">
          <h1>Movie Search</h1>
          <SearchBar onSearch={fetchMovies} />
          {isLoading ? <p>Loading...</p> : (
              <div className="movie-cards">
                  {movies.map((movie, index) => (
                      <MovieCard key={index} movie={movie} />
                  ))}
              </div>
          )}
      </div>
  );
}

export default App;
