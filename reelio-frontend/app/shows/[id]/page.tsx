"use client"
import React, {useEffect, useState } from "react";
import Navigation from "../../Components/Navigation";

interface Show {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  imageUrl: string;
  backdropUrl: string;
  seasons: Season[];  // Added to hold seasons data
}

interface Season {
  id: number;
  seasonNumber: number;
  description: string | null;
  releaseDate: string;
  episodes: Episode[];  // Added to hold episodes for each season
}

interface Episode {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  episodeNumber: number;
}


export default function Show({ params }: { params: { id: number } }) {
  const { id } = params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [showData, setShowData] = useState<Show | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await fetch(`${API_URL}/show/${id}`);
        const data = await response.json();
        setShowData(data);
        setSeasons(data.seasons);  // Set the seasons for this show
        if (data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0]);  // Optionally select the first season by default
        }
      } catch (error) {
        console.error("Error fetching show data:", error);
      }
    };

    fetchShowData();
  }, [id, API_URL]);

  useEffect(() => {
    if (selectedSeason) {
      setEpisodes(selectedSeason.episodes);  // Set episodes based on the selected season
    }
  }, [selectedSeason]);

  const handleSeasonSelect = (season: Season) => {
    setSelectedSeason(season);
  };

return (
    <main className="dark:bg-black bg-white h-screen">
      <Navigation />

      <div
        className="backdrop relative flex h-[60vh] lg:h-[95vh]"
        style={{
          backgroundImage: `url(${showData?.backdropUrl})`,
        }}
      >
        <div className="overlay absolute inset-0"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white lg:items-start lg:p-12">
          <div className="space-y-4 lg:space-y-6 lg:max-w-2xl">
            <h1 className="text-4xl font-bold text-white lg:text-6xl">
              {showData?.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm lg:text-lg">
              <span className="rounded bg-green-600 px-2 py-1 text-xs lg:text-sm">
                PG-13
              </span>
              <span>
                Release Date: <strong>{showData?.releaseDate}</strong>
              </span>
              <span>Multiple Seasons</span>
            </div>
            <div className="flex items-center space-x-2 text-lg lg:text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.149c.967 0 1.371 1.24.588 1.81l-3.354 2.434a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118l-3.354-2.434a1 1 0 00-1.175 0l-3.354 2.434c-.784.57-1.84-.197-1.54-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.278 9.377c-.784-.57-.38-1.81.588-1.81h4.149a1 1 0 00.95-.69l1.286-3.95z" />
              </svg>
              <span className="font-bold">8.5</span>
              <span className="text-gray-400">(1024 ratings)</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm lg:text-lg">
              {showData?.description}
            </p>
            <div className="flex space-x-4">
              <button className="rounded-lg bg-gray-800 px-4 py-2 text-sm lg:text-base hover:bg-gray-700">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seasons and Episodes Section */}
      <div className="container dark:bg-black mx-auto py-6">
        <div className="p-4 m-4 border-purple-700 border bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl dark:text-white font-bold mb-4">Seasons & Episodes</h2>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {seasons.map((season) => (
              <button
                key={season.id}
                className={`${
                  selectedSeason?.id === season.id
                    ? "bg-purple-700"
                    : "bg-gray-700 hover:bg-gray-600"
                } rounded-lg px-4 py-2`}
                onClick={() => handleSeasonSelect(season)}
              >
                Season {season.seasonNumber}
              </button>
            ))}
          </div>

          <div className="episodes">
            <h3 className="text-xl font-bold mb-2">Episodes</h3>
            {episodes.length > 0 ? (
              <ul className="space-y-2">
                {episodes.map((episode) => (
                  <li key={episode.id} className="border-b border-gray-700 pb-2">
                    <h4 className="text-lg font-semibold">{episode.title}</h4>
                    <p className="text-sm text-gray-300">
                      Air Date: {episode.releaseDate}
                    </p>
                    <p className="text-gray-400">{episode.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No episodes available.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}