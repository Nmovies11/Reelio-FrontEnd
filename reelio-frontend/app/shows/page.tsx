"use client"
import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../Components/Navigation";
import ShowCard from "../Components/ShowCard";


export interface Shows {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  imageUrl: string;
}


export default function Shows() {
  const [movies, setMovies] = useState<Shows[]>([]);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`${API_URL}/show/recentshows`);
        if (!response.ok) {
          throw new Error("Failed to fetch shows");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError("Could not load shows. Please try again later.");
      }
    };

    fetchShows();
  }, [API_URL]);

  return (
    <main className="bg-black h-[200vh]">
      <Navigation />
      <h1 className="text-6xl m-6 dark:text-white font-bold flex justify-center">
        Shows
      </h1>
      <div className="flex justify-center mb-6">
        <p className="text-lg dark:text-gray-400">
          Explore your favorite Shows!
        </p>
      </div>
      |
      <div className=" ml-12  mr-4 flex space-x-24">
        <div className="ml-5">
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
              {movies && movies.map((movie: Shows, index: number) => (
                <ShowCard key={index} id={movie.id} title={movie.title} poster={movie.imageUrl} />
              ))}
            </div>
          )}
        </div>        </div>
      </div>
    </main>
  );
}
