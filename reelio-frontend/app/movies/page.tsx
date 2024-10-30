"use client"
import React, { useEffect, useState } from 'react';
import Navigation from '../Components/Navigation';
import MovieCard from '../Components/MovieCard';
import FilterSidebar from '../Components/FilterSidebar';

export interface MovieDTO {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  director: string;
  imageUrl: string;
}

export default function Movies() {
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_URL}/movie/recentmovies`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data); // Assuming the data is an array of MovieDTO objects
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this effect runs once on mount

  const sortOptions = [
    { value: 'release_date', label: 'Release Date' },
    { value: 'rating', label: 'Rating' },
  ];

  return (
    <main className='dark:bg-black h-full'>
      <Navigation />
      <h1 className="text-6xl m-6 dark:text-white font-bold flex justify-center">Movies</h1>
      <div className="flex justify-center mb-6">
        <p className="text-lg dark:text-gray-400">Explore your favorite movies!</p>
      </div>
      <div className='ml-12 mr-4 flex space-x-24'>
        <FilterSidebar sortOptions={sortOptions} filterOptions={[]} onSort={(value) => console.log(value)} onFilter={(value, checked) => console.log(value, checked)} />
        <div className='ml-5'>
          {error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 pb-8 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-4'>
              {movies && movies.map((movie: MovieDTO, index: number) => (
                <MovieCard key={index} id={movie.id} title={movie.title} poster={movie.imageUrl} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}