"use client";
import React, { useEffect, useState, useCallback } from "react";
import Navigation from "../Components/Navigation";
import ShowCard from "../Components/ShowCard";
import FilterSidebar from "../Components/FilterSidebar";
import { getShows } from "../api/show/api";

export interface ShowDTO {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  imageUrl: string;
}

export default function Shows() {
  const [shows, setShows] = useState<ShowDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchShows = useCallback(async () => {
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

      const data = await getShows(API_URL, queryParams);
      setShows(data.items);
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
    fetchShows();
  }, [pageNumber, pageSize, searchQuery, selectedGenre, fetchShows]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
    setPageNumber(1);
  };

  const sortOptions = [
    { value: "release_date", label: "Release Date" },
    { value: "rating", label: "Rating" },
  ];

  const genreOptions = [
    { value: "action", label: "Action" },
    { value: "drama", label: "Drama" },
    { value: "comedy", label: "Comedy" },
    { value: "thriller", label: "Thriller" },
    // Add more genres as needed
  ];

  return (
    <main className="dark:bg-black h-full" data-testid="shows-page">
      <Navigation data-testid="navigation" />
      <h1 className="text-6xl m-6 dark:text-white font-bold flex justify-center" data-testid="page-title">
        Shows
      </h1>
      <div className="flex justify-center mb-6">
        <p className="text-lg dark:text-gray-400" data-testid="page-description">
          Explore your favorite shows!
        </p>
      </div>
      <div className="ml-12 mr-4 flex space-x-24" data-testid="content-container">
        <FilterSidebar
          sortOptions={sortOptions}
          genreOptions={genreOptions}
          onSort={(value) => console.log(value)}
          onGenreSelect={handleGenreSelect}
          onSearch={handleSearch}
          data-testid="filter-sidebar"
        />
        <div className="ml-5" data-testid="show-cards-container">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full" data-testid="error-message">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 pb-8 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-4" data-testid="show-card-grid">
                {shows.map((show: ShowDTO, index: number) => (
                  <ShowCard
                    key={index}
                    id={show.id}
                    title={show.title}
                    poster={show.imageUrl}
                    data-testid={`show-card-${show.id}`}
                  />
                ))}
              </div>
              <div className="flex justify-center items-center space-x-4 mt-6" data-testid="pagination">
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded disabled:opacity-50"
                  onClick={() => setPageNumber(pageNumber - 1)}
                  disabled={pageNumber <= 1}
                  data-testid="previous-page-button"
                >
                  Previous
                </button>
                <span className="text-gray-700 dark:text-white" data-testid="pagination-info">
                  Page {pageNumber} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded disabled:opacity-50"
                  onClick={() => setPageNumber(pageNumber + 1)}
                  disabled={pageNumber >= totalPages}
                  data-testid="next-page-button"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
