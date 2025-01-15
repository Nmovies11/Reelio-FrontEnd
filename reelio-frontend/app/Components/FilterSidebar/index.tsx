import React, { useState } from "react";

interface FilterSidebarProps {
  sortOptions: { value: string; label: string }[];
  genreOptions: { value: string; label: string }[];
  onSort: (value: string) => void;
  onGenreSelect: (value: string | null) => void;
  onSearch: (query: string) => void;
}

const FilterSidebar = ({
  sortOptions,
  genreOptions,
  onSort,
  onGenreSelect,
  onSearch,
}: FilterSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <aside className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-60 shadow-md h-full">
      <h2 className="text-xl font-bold dark:text-white mb-2">Search</h2>
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex flex-col space-y-2 mb-4">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movie titles"
          className="p-2 border rounded"
        />

        <button type="button" onClick={handleClearSearch} className="px-4 py-2 bg-gray-500 text-white rounded">
          Clear
        </button>
      </form>

      <h2 className="text-xl font-bold dark:text-white mb-4">Filter & Sort</h2>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 dark:text-gray-300">Sort by:</label>
        <select
          onChange={(e) => onSort(e.target.value)}
          className="block w-full p-2 border rounded"
        >
          {sortOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 dark:text-gray-300">Filter by Genre:</label>
        <select
          onChange={(e) => onGenreSelect(e.target.value || null)}
          className="block w-full p-2 border rounded"
        >
          <option value="">All Genres</option>
          {genreOptions.map((genre, index) => (
            <option key={index} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
