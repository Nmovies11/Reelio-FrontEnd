"use client";
import React, { useEffect, useState } from "react";
import Navigation from "../../Components/Navigation";
import { useAuth } from "@/app/context/AuthContext";

interface MovieData {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  imageUrl: string;
  backdropUrl: string;
  director: string;
  runtime: number;
  actors: {
    id: number;
    name: string;
    role: string;
    imageUrl: string | null;
  }[];
}

export default function Movie({ params }: { params: { id: number } }) {
  const { id } = params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const user = useAuth();


  const [backdropImageLoaded, setBackdropImageLoaded] = useState(false);
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [token, setToken] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"watched" | "planToWatch" | null>(
    null
  );
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`${API_URL}/movies/${id}`);
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [API_URL, id]);


    // Preload the backdrop image (if it's not already)
    useEffect(() => {
      if (movieData?.backdropUrl) {
        const image = new Image();
        image.src = movieData.backdropUrl;
        image.onload = () => setBackdropImageLoaded(true);
      }
    }, [movieData?.backdropUrl]);

    const formatRuntime = (runtimeInMinutes: number) => {
      const hours = Math.floor(runtimeInMinutes / 60);
      const minutes = runtimeInMinutes % 60;
      return `${hours}h ${minutes}min`;
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

      console.log(movieData?.id)
      console.log(movieData?.id.toString())
      const payload = {
        contentId: movieData?.id.toString(),
        contentType: "movie",
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
    <main className="dark:bg-black  bg-white h-screen">
      <Navigation />

      <div
        className="backdrop relative flex h-[60vh] lg:h-[95vh]"
        style={{
          backgroundImage: `url(${backdropImageLoaded ? movieData?.backdropUrl : ''})`,
        }}
        data-test-id="movie-backdrop"
      >
        <div className="overlay absolute inset-0"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white lg:items-start lg:p-12">
          <div className="space-y-4 lg:space-y-6 lg:max-w-2xl">
            <h1
              data-test-id="movie-title"
              className="text-4xl font-bold text-white lg:text-6xl"
            >
              {movieData?.title}
            </h1>
            <div
              className="flex items-center space-x-4 text-sm lg:text-lg"
              data-test-id="movie-details"
            >

              <span>
                Release Date: <strong>{movieData?.releaseDate}</strong>
              </span>
              <span>{movieData?.runtime && formatRuntime(movieData.runtime)}</span>
            </div>
            <p
              className="text-gray-300 leading-relaxed text-sm lg:text-lg"
              data-test-id="movie-description"
            >
              {movieData?.description}
            </p>

            <div className="flex space-x-4">
              {token && (
                <button
                  onClick={handleAddToWatchlist}
                  className="rounded-lg bg-gray-800 px-4 py-2 text-sm lg:text-base hover:bg-gray-700"
                  data-test-id="add-to-watchlist"
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              Watchlist Options
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Choose an action for this movie:
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

<div className="container dark:bg-black mx-auto py-6">
        <div className="p-4 m-4 border-purple-700 border bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-2xl dark:text-white font-bold mb-4" data-test-id="actors-crew-title">Actors & Crew</h2>
          <div className="flex overflow-x-auto space-x-4 p-2" data-test-id="actors-list">
            {movieData?.actors.map((actor: MovieData['actors'][0]) => (
              <div key={actor.id} className="flex-shrink-0 hover:text-yellow-500 transition duration-300 text-center" data-test-id={`actor-${actor.id}`}>
                <img 
                  src={actor.imageUrl || "https://picsum.photos/200"} 
                  alt={actor.name} 
                  className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                  data-test-id={`actor-image-${actor.id}`}
                />
                <p data-test-id={`actor-name-${actor.id}`}>{actor.name}</p>
                <p className="text-sm text-gray-400 italic" data-test-id={`actor-role-${actor.id}`}>{actor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

