"use client"
import Image from "next/image";
import Navigation from "./Components/Navigation";
import { getMovies } from "./api/movie/api";
import { getShows } from "./api/show/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<{ imageUrl: string; title: string; id: number }[]>([]);
  const [shows, setShows] = useState<{ imageUrl: string; title: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error("API_URL is not defined");
      }

      try {
        const queryParams = new URLSearchParams({
          pageNumber: "1",  
          pageSize: "4",   
        });

        const moviesData = await getMovies(API_URL, queryParams);
        setMovies(moviesData.items); 
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching data:", error);
          setError(error.message);
        } else {
          console.error("Unexpected error", error);
          setError("An unexpected error occurred.");
        }
      }
    }

    async function fetchShows() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error("API_URL is not defined");
      }

      try {
        const queryParams = new URLSearchParams({
          pageNumber: "1",  
          pageSize: "4",   
        });

        const showsData = await getShows(API_URL, queryParams);
         setShows(showsData.items); 
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching data:", error);
          setError(error.message);
        } else {
          console.error("Unexpected error", error);
          setError("An unexpected error occurred.");
        }
      }
    }

    fetchMovies();
    fetchShows();
  }, []); 

  return (
    <main className="dark:bg-black bg-white h-screen">
      <Navigation />
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 h-full">
        <div className="col-span-1 row-span-1 bg-gray-800 p-4">
          <h2 className="text-white text-xl mb-4">Movies</h2>
          <div className="flex flex-wrap gap-2">
            {movies.map((movie, index) => (
              <a key={index} href={`/movies/${movie.id}`} className="relative w-40 h-64 bg-gray-700 rounded-md flex items-center justify-center">
              <img src={movie.imageUrl} alt={movie.title} className="rounded-md w-full h-full object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-center text-white text-sm p-1">
                {movie.title}
              </div>
              </a>
            ))}
          </div>
        </div>
        <div className="col-span-1 row-span-1 bg-gray-800 p-4">
          <h2 className="text-white text-xl mb-4">Shows</h2>
          <div className="flex flex-wrap gap-2">
            {shows.map((show, index) => (
              <div key={index} className="relative w-40 h-64 bg-gray-700 rounded-md flex items-center justify-center">
              <img src={show.imageUrl} alt={show.title} className="rounded-md w-full h-full object-cover" />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-center text-white text-sm p-1">
              {show.title}
              </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 row-span-1 bg-gray-800 p-4">
          <h2 className="text-white text-xl mb-4">Celebs</h2>
          {/* Add celeb content here */}
        </div>
      </div>
    </main>
  );
}
