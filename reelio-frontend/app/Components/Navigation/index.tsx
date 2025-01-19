"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    console.log("user:", user);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-800 border-purple-600 border-b-2">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Home
                </a>
                <a
                  href="/movies"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/movies"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Movies
                </a>
                <a
                  href="/shows"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/shows"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  TV Shows
                </a>
                <a
                  href="/celebs"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === "/celebs"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Celebs
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center">
          {user ? (
        <div>
          <button
            onClick={toggleDropdown}
            className="text-white flex items-center rounded-full bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2"
          >           Profile

          </button>
          {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          <a
            href={`/account/${user.id}`}
            className="block text-gray-800 px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </a>
            <a
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="block text-gray-800 px-4 py-2 hover:bg-gray-100"
            >
            Logout
            </a>
        </div>
      )}
    </div>
      ) : (
                <a
                href="/login"
                className="text-white flex items-center rounded-full bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2"
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
