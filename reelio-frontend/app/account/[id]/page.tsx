"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Navigation from "../../Components/Navigation";

interface WatchlistItem {
  id: string;
  contentId: string;
  contentType: string; 
  status: string; 
  rating: number;
  review: string;
}

interface ContentDetails {
  watchlistId: string;
  movieId: string;
  title: string;
  poster: string;
}

interface User {
  username: string;
  email: string;
}

interface editData {
  status: string;
  rating: number;
  review: string;
  watchlistId: string;
}

export default function Movie({ params }: { params: { id: number } }) {
  const { user, loading } = useAuth();
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<(WatchlistItem & ContentDetails)[]>([]);
  const [shows, setShows] = useState<(WatchlistItem & ContentDetails)[]>([]);
  const [activeTab, setActiveTab] = useState("movies");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ContentDetails | null>(null);
  const [editItem, setEditItem] = useState<editData | null>(null); 
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

  // Fetch user data
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
            return { ...movie, ...details, watchlistId: movie.id }; 
          })
       )

        const enrichedShows = await Promise.all(
          showWatchlist.map(async (show) => {
            const details = await fetchContentDetails(show.contentId, "show");
            return { ...show, ...details, watchlistId: show.id };
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

  const openEditModal = (item: ContentDetails & WatchlistItem) => {
    setCurrentItem(item); 
    setEditItem({ status: item.status, rating: item.rating, review: item.review, watchlistId: item.watchlistId }); // Populate editItem with editable fields
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setCurrentItem(null);
    setEditItem(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem || !currentItem) return;

    try {
      const updatedItem = {
        status: editItem.status,
        rating: editItem.rating,
        review: editItem.review,
      };

      const response = await fetch(
        `${API_URL}/users/${userId}/watchlist/${editItem.watchlistId}?contentType=${"movie"}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedItem),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      // Update local state
      setEditModalOpen(false);
      setMovies((prev) =>
        prev.map((movie) =>
          movie.watchlistId === editItem.watchlistId ? { ...movie, ...updatedItem } : movie
        )
      );
      setShows((prev) =>
        prev.map((show) =>
          show.watchlistId === editItem.watchlistId ? { ...show, ...updatedItem } : show
        )
      );
    } catch (error) {
      console.error("Error updating watchlist item:", error);
    }
  };

  if (loading || !user || !fetchedUser) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="text-center">
        <svg
        className="animate-spin h-10 w-10 text-purple-600 mx-auto mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
        </svg>
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen dark:bg-black bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center p-6 bg-purple-600 text-white">
            <img
              src={"https://picsum.photos/200/300"}
              alt="User profile picture"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{fetchedUser.username}</h2>
            </div>
            </div>

          <div className="p-6">
            <div className="flex space-x-4 border-b-2">
              <button
                className={`pb-2 ${activeTab === "movies" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-600"}`}
                onClick={() => setActiveTab("movies")}
              >
                Movies
              </button>
              <button
                className={`pb-2 ${activeTab === "shows" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-600"}`}
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
            onClick={() =>
              setExpandedItem(expandedItem === movie.id ? null : movie.id)
            }
            className="cursor-pointer bg-gray-200 p-4 rounded shadow-sm"
          >
            <div className="flex items-center">
 
              <div className="ml-4">
                <h4 className="text-lg font-bold">{movie.title}</h4>
                <p>{movie.status === "watched" ? "Watched" : "Plan to watch"}</p>
              </div>
              {/* Edit button */}
              <button
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering expansion
                  openEditModal(movie);
                }}
              >
                Edit
              </button>
              <button
                className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
                onClick={async (e) => {
                  e.stopPropagation(); // Prevent click from triggering expansion
                  try {
                    const response = await fetch(
                      `${API_URL}/users/${userId}/watchlist/${movie.id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    if (!response.ok) {
                      throw new Error("Failed to delete movie");
                    }
                    setMovies(movies.filter((m) => m.id !== movie.id));
                  } catch (error) {
                    console.error("Error deleting movie:", error);
                  }
                }}
              >
                Delete
              </button>
            </div>

            {/* Expand details (rating and review) */}
            <div
              onClick={() =>
                setExpandedItem(expandedItem === movie.id ? null : movie.id)
              }
            >
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
            </div>
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
            onClick={() =>
              setExpandedItem(expandedItem === show.id ? null : show.id)
            }
            className="cursor-pointer bg-gray-200 p-4 rounded shadow-sm"
          >
            <div className="flex items-center">

              <div className="ml-4">
                <h4 className="text-lg font-bold">{show.title}</h4>
                <p>{show.status === "watched" ? "Watched" : "Plan to watch"}</p>
              </div>
              {/* Edit button */}
              <button
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from triggering expansion
                  openEditModal(show);
                }}
              >
                Edit
              </button>
              <button
                className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
                onClick={async (e) => {
                  e.stopPropagation(); // Prevent click from triggering expansion
                  try {
                    const response = await fetch(
                      `${API_URL}/users/${userId}/watchlist/${show.id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    if (!response.ok) {
                      throw new Error("Failed to delete show");
                    }
                    setShows(shows.filter((s) => s.id !== show.id));
                  } catch (error) {
                    console.error("Error deleting show:", error);
                  }
                }}
              >
                Delete
              </button>
            </div>

            {/* Expand details (rating and review) */}
            <div
              onClick={() =>
                setExpandedItem(expandedItem === show.id ? null : show.id)
              }
            >
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
            </div>
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

      {editModalOpen && currentItem && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Watchlist Item</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={editItem.status}
                  onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                  className="w-full p-2 border rounded"
                >
                  <option value="planToWatch">Plan to Watch</option>
                  <option value="watched">Watched</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={editItem.rating}
                  min="1"
                  max="10"
                  onChange={(e) => setEditItem({ ...editItem, rating: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Review</label>
                <textarea
                  name="review"
                  value={editItem.review}
                  onChange={(e) => setEditItem({ ...editItem, review: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
