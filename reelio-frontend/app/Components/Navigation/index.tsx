"use client"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useAuth from '../../hooks/useAuth';


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const user = useAuth();
  useEffect(() => {
    // Check local storage for theme preference on initial load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  useEffect(() => {
    // Apply or remove the dark class based on darkMode state
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

  }, [darkMode]);
    return (
  
<nav className="bg-gray-800 border-purple-600 border-b-2">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
          <a href="/" className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} aria-current={pathname === '/movies' ? 'page' : undefined}>Home</a>
            <a href="/movies" className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === '/movies' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} aria-current={pathname === '/movies' ? 'page' : undefined}>Movies</a>
            <a href="/shows" className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === '/shows' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} aria-current={pathname === '/shows' ? 'page' : undefined}>Tv Shows</a>
            <a href="/celebs" className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === '#' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} aria-current={pathname === '#' ? 'page' : undefined}>Celebs</a>
            </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin  ="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>

        <div className="relative ml-3">
          <div>

          </div>

        </div>

        {user ? (
              <a
                href="/account"
                className="relative text-white flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Profile
              </a>
            ) : (
              <a
                href="/login"
                className="relative text-white flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Login
              </a>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 ml-5 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
              className={darkMode ? 'fill-white' : 'fill-black'}
            >
              <path d="M480-120q-150 0-255-105T120-480t105-255 255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120m0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82m-10-270"/>
            </svg>
            </button>
      </div>
    </div>
  </div>
</nav>

);
};

export default Navbar;