"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Navigation from "../../Components/Navigation";

interface WatchlistItem {
  id: string;
  contentId: string;
  contentType: string; // "movie" or "show"
  status: string; // e.g., "plan to watch"
  rating: number;
  review: string;
}

interface ContentDetails {
  id: string;
  title: string;
  poster: string;
}

interface User {
  name: string;
  bio: string;
  avatar: string;
}

export default function Movie({ params }: { params: { id: number } }) {
  const { user, loading } = useAuth();
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<(WatchlistItem & ContentDetails)[]>([]);
  const [shows, setShows] = useState<(WatchlistItem & ContentDetails)[]>([]);
  const [activeTab, setActiveTab] = useState("movies");
  const [expandedItem, setExpandedItem] = useState<string | null>(null); 
  const userId = params.id;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setFetchedUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, API_URL]);

  useEffect(() => {
    if (!userId) return;

    const fetchWatchlist = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}/watchlist`);
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist data");
        }
        const watchlist: WatchlistItem[] = await response.json();

        const movieWatchlist = watchlist.filter((item) => item.contentType === "movie");
        const showWatchlist = watchlist.filter((item) => item.contentType === "show");

        const fetchContentDetails = async (contentId: string, type: string) => {
          const endpoint = type === "movie" ? "movies" : "shows";
          const response = await fetch(`${API_URL}/${endpoint}/${contentId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${type} details`);
          }
          return response.json();
        };

        const enrichedMovies = await Promise.all(
          movieWatchlist.map(async (movie) => {
            const details = await fetchContentDetails(movie.contentId, "movie");
            return { ...movie, ...details };
          })
        );

        const enrichedShows = await Promise.all(
          showWatchlist.map(async (show) => {
            const details = await fetchContentDetails(show.contentId, "show");
            return { ...show, ...details };
          })
        );

        setMovies(enrichedMovies);
        setShows(enrichedShows);
      } catch (error) {
        console.error("Error fetching watchlist data or details:", error);
      }
    };

    fetchWatchlist();
  }, [userId, API_URL]);

  if (loading || !user || !fetchedUser) {
    return <div>Loading...</div>;
  }

  return (

    <>
    <Navigation/>
    <div className="min-h-screen dark:bg-black bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center p-6 bg-purple-600 text-white">
          <img
            src={"https://picsum.photos/200/300"}
            alt={`${fetchedUser.name}'s avatar`}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{fetchedUser.name}</h2>
            <p className="mt-2">{fetchedUser.bio}</p>
          </div>
        </div>

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

          <div className="mt-4">
            {activeTab === "movies" && (
              <div>
                <h3 className="text-xl font-semibold">Movies</h3>
                <ul className="mt-2 space-y-4">
                  {movies.length ? (
                    movies.map((movie) => (
                      <li
                        key={movie.id}
                        className="cursor-pointer bg-gray-200 p-4 rounded shadow-sm"
                        onClick={() =>
                          setExpandedItem(expandedItem === movie.id ? null : movie.id)
                        }
                      >
                        <div className="flex items-center">

                          <div className="ml-4">
                            <h4 className="text-lg font-bold">{movie.title}</h4>
                            <p>{movie.status === "watched" ? "Watched" : "Plan to watch"}</p>
                          </div>
                        </div>
                        {expandedItem === movie.id && (
                          <div className="mt-4">
                            <p>
                              <strong>Rating:</strong> {movie.rating}
                            </p>
                            <p>
                              <strong>Review:</strong> {movie.review}
                            </p>

                          </div>
                        )}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No movies found.</p>
                  )}
                </ul>
              </div>
            )}

            {activeTab === "shows" && (
              <div>
                <h3 className="text-xl font-semibold">Shows</h3>
                <ul className="mt-2 space-y-4">
                  {shows.length ? (
                    shows.map((show) => (
                      <li
                        key={show.id}
                        className="cursor-pointer bg-gray-200 p-4 rounded shadow-sm"
                        onClick={() =>
                          setExpandedItem(expandedItem === show.id ? null : show.id)
                        }
                      >
                        <div className="flex items-center">
                          <img
                            src={show.poster || "/default-poster.png"}
                            alt={`${show.title} poster`}
                            className="w-16 h-24 object-cover rounded"
                          />
                          <div className="ml-4">
                            <h4 className="text-lg font-bold">{show.title}</h4>
                            <p>{show.status === "watched" ? "Watched" : "Plan to watch"}</p>
                          </div>
                        </div>
                        {expandedItem === show.id && (
                          <div className="mt-4">
                            <p>
                              <strong>Rating:</strong> {show.rating}
                            </p>
                            <p>
                              <strong>Review:</strong> {show.review}
                            </p>

                          </div>
                        )}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500">No shows found.</p>
                  )}
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
