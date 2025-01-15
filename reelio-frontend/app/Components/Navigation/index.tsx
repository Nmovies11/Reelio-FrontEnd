"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();

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
              <a
                href={`/account/${user.id}`}
                className="text-white flex rounded-full bg-gray-800 text-sm"
              >
                Profile
              </a>
            ) : (
              <a
                href="/login"
                className="text-white flex rounded-full bg-gray-800 text-sm"
              >
                Login
              </a>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 ml-5 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
            >
              {/* Dark Mode Icon */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
