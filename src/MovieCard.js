// src/MovieCard.js
import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie }) => {
    const [dogImage, setDogImage] = useState('');

    useEffect(() => {
        const fetchDogImage = async () => {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            setDogImage(data.message);
        };
        fetchDogImage();
    }, []);

    return (
        <div className="movie-card">
            <img src={dogImage} alt="Random Dog" />
            <h2>{movie.title}</h2>
            <p>{movie.author}</p>
            <p>{movie.year}</p>
        </div>
    );
};

export default MovieCard;
