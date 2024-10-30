import React from 'react';


interface FilterSidebarProps {
  sortOptions: { value: string; label: string }[];
  filterOptions: { id: string; value: string; label: string }[];
  onSort: (value: string) => void;
  onFilter: (value: string, checked: boolean) => void;
}

const FilterSidebar = ({ sortOptions, filterOptions, onSort, onFilter }: FilterSidebarProps) => {  return (
    <aside className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-60 shadow-md h-full">

      <h2 className="text-xl font-bold dark:text-white mb-2">Search</h2>
      <form className="max-w-md mx-auto">   
    <div className="relative mb-4">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search movie titles" required />
    </div>
</form>

      <h2 className="text-xl font-bold dark:text-white mb-4">Filter & Sort</h2>

      <div className="mb-6 ">
        <label className="block mb-2 text-gray-700 dark:text-gray-300">Sort by:</label>
        <select
          onChange={(e) => onSort(e.target.value)}
          className="block w-52  p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
        >
          {sortOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300">Filter by:</label>
        {filterOptions.map((filter, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={filter.id}
              value={filter.value}
              onChange={(e) => onFilter(e.target.value, e.target.checked)}
              className="mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-700"
            />
            <label htmlFor={filter.id} className="text-gray-700 dark:text-gray-300">
              {filter.label}
            </label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
