"use client";
import React, { useEffect, useState, useCallback } from "react";
import Navigation from "../Components/Navigation";
import ActorCard from "../Components/ActorCard"; 
import FilterSidebar from "../Components/FilterSidebar";
import { getActors } from "../api/actor/api"; 

export interface ActorDTO {
  id: number;
  name: string;
  bio: string;
  imageUrl: string;
}

export default function Actors() {
  const [actors, setActors] = useState<ActorDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchActors = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
        ...(searchQuery && { searchQuery }),
        ...(selectedGenre && { genre: selectedGenre }),
      });

      if (!API_URL) {
        throw new Error("API_URL is not defined");
      }
      const data = await getActors(API_URL, queryParams); // Call the getActors function
      setActors(data.items);

      setTotalPages(data.totalPages);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } else {
        console.error("Unexpected error", error);
        setError("An unexpected error occurred.");
      }
    }
  }, [pageNumber, pageSize, searchQuery, selectedGenre, API_URL]);

  useEffect(() => {
    fetchActors();
  }, [pageNumber, pageSize, searchQuery, selectedGenre, fetchActors]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    setPageNumber(1);
  };

  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "popularity", label: "Popularity" },
  ];

  const genreOptions = [
    { value: "action", label: "Action" },
    { value: "drama", label: "Drama" },
    { value: "comedy", label: "Comedy" },
    { value: "thriller", label: "Thriller" },
  ];

  return (
    <div className="dark:bg-black h-min">
      <Navigation />
      <h1 className="text-6xl m-6 dark:text-white font-bold flex justify-center">Actors</h1>
      <div className="flex justify-center mb-6">
        <p className="text-lg dark:text-gray-400">Explore your favorite actors!</p>
      </div>
      <div className="ml-12 mr-4 flex space-x-24">
        <FilterSidebar
          sortOptions={sortOptions}
          genreOptions={genreOptions}
          onSort={(value) => console.log(value)} 
          onGenreSelect={handleGenreSelect}
          onSearch={handleSearch}
        />
        <div className="ml-5">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 pb-8 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-4">
                {actors.map((actor: ActorDTO, index: number) => (
                  <ActorCard
                    key={index}
                    id={actor.id}
                    title={actor.name}
                    poster={actor.imageUrl}
                  />
                ))}
              </div>
              <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded disabled:opacity-50"
                  onClick={() => setPageNumber(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                >
                  Previous
                </button>
                <span className="text-gray-700 dark:text-white">
                  Page {pageNumber} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded disabled:opacity-50"
                  onClick={() => setPageNumber(pageNumber + 1)}
                  disabled={pageNumber >= totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
