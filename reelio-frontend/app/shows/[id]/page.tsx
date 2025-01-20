"use client";
import React, { useEffect, useState } from "react";
import Navigation from "../../Components/Navigation";
import { useAuth } from "@/app/context/AuthContext";

interface Show {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  imageUrl: string;
  backdropUrl: string;
  seasons: Season[];
}

interface Season {
  id: number;
  seasonNumber: number;
  description: string | null;
  releaseDate: string;
  episodes: Episode[];
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
  const user = useAuth();

  const [showData, setShowData] = useState<Show | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<"watched" | "planToWatch" | null>(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await fetch(`${API_URL}/shows/${id}`);
        const data = await response.json();
        setShowData(data);
        setSeasons(data.seasons);
        if (data.seasons.length > 0) {
          setSelectedSeason(data.seasons[0]);
        }
      } catch (error) {
        console.error("Error fetching show data:", error);
      }
    };

    fetchShowData();
  }, [id, API_URL]);

  useEffect(() => {
    if (selectedSeason) {
      setEpisodes(selectedSeason.episodes);
    }
  }, [selectedSeason]);

  const handleSeasonSelect = (season: Season) => {
    setSelectedSeason(season);
  };

  const handleAddToWatchlist = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActionType(null);
    setReview("");
    setRating(null);
  };

  const submitWatchlistAction = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      const payload = {
        contentId: showData?.id.toString(),
        contentType: "show",
        status: actionType,
        rating,
        review,
      };

      console.log(payload);

      const response = await fetch(`${API_URL}/users/${user.user?.id}/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update the watchlist");
      }

      alert("Your action has been recorded!");
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Failed to update the watchlist.");
    }
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
            <p className="text-gray-300 leading-relaxed text-sm lg:text-lg">
              {showData?.description}
            </p>
            <div className="flex space-x-4">
              {token && (
                <button
                  onClick={handleAddToWatchlist}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm lg:text-base hover:bg-gray-700"
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container dark:bg-black mx-auto py-6">
        <div className="p-4 m-4 border-purple-700 border bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl dark:text-white font-bold mb-4">Seasons & Episodes</h2>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {seasons.map((season) => (
              <button
                key={season.id}
                className={`$ {
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Watchlist Options</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Choose an action for this show:
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="actionType"
                  value="watched"
                  onChange={() => setActionType("watched")}
                  checked={actionType === "watched"}
                />{" "}
                Watched
              </label>
              <label className="block text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="actionType"
                  value="planToWatch"
                  onChange={() => setActionType("planToWatch")}
                  checked={actionType === "planToWatch"}
                />{" "}
                Plan to Watch
              </label>
            </div>
            {actionType === "watched" && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block text-gray-700 dark:text-gray-300"
                  >
                    Rating (1 to 10)
                  </label>
                  <input
                    id="rating"
                    type="number"
                    min="1"
                    max="10"
                    value={rating || ""}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="review"
                    className="block text-gray-700 dark:text-gray-300"
                  >
                    Review
                  </label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                    rows={4}
                  />
                </div>
              </>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={submitWatchlistAction}
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
