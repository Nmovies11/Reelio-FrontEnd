"use client"

import { useState } from "react";
import Navigation from "../Components/Navigation";

export default function Account() {
  const [activeTab, setActiveTab] = useState("movies");

  const user = {
    name: "John Doe",
    bio: "Avid movie and TV show enthusiast. Loves thrillers and sci-fi.",
    avatar: "https://via.placeholder.com/100", // Replace with actual avatar URL
    watchedMovies: [
      "Inception",
      "The Matrix",
      "Interstellar",
      "Blade Runner 2049",
    ],
    watchedShows: ["Breaking Bad", "Stranger Things", "The Mandalorian"],
  };

  return (
    <>
    <Navigation />
    <div className="min-h-screen bg-white dark:bg-black py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* User Info Section */}
        <div className="flex items-center p-6 bg-purple-600 text-white">
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="mt-2">{user.bio}</p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="p-6">
          <div className="flex space-x-4 border-b-2">
            <button
              className={`pb-2 ${
                activeTab === "movies"
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("movies")}
            >
              Movies
            </button>
            <button
              className={`pb-2 ${
                activeTab === "shows"
                  ? "border-b-4 border-blue-600 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("shows")}
            >
              Shows
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === "movies" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Watched Movies</h3>
                <ul className="list-disc pl-6">

                </ul>
              </div>
            )}
            {activeTab === "shows" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Watched Shows</h3>
                <ul className="list-disc pl-6">

                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}