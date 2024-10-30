"use client";
import React from "react";
import { useEffect, useState } from "react";
import Navigation from "../../Components/Navigation";
import CastInfo from "@/app/Components/CastInfo";

interface Movie {
  params: {
    id: number;
    title: string;
    description: string;
    releaseDate: string;
    imageUrl: string;
    backdropUrl: string;
    director: string;
    actors: {
      id: number;
      name: string;
      birthDate: string;
      bio: string | null;
      imageUrl: string | null;
    }[];
  };
}

export default function movie({ params }: Movie) {
  const { id } = params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [movieData, setMovieData] = useState<any>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`${API_URL}/movie/${id}`);
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [id]);

  return (
    <main className="dark:bg-black bg-white h-screen  ">
      <Navigation />

      <div
        className="backdrop relative flex h-[60vh] lg:h-[95vh]"
        style={{
          backgroundImage: `url(${movieData?.backdropUrl})`,
        }}
      >

        <div className="overlay absolute inset-0">                </div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white lg:items-start lg:p-12">
            <div className="space-y-4 lg:space-y-6 lg:max-w-2xl">
              <h1 className="text-4xl font-bold text-white lg:text-6xl">
                {movieData?.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm lg:text-lg">
                <span className="rounded bg-green-600 px-2 py-1 text-xs lg:text-sm">
                  PG-13
                </span>
                <span>
                  Release Date: <strong>{movieData?.releaseDate}</strong>
                </span>
                <span>2h 14min</span>
              </div>
              <div className="flex space-x-2">
                <span className="rounded bg-gray-800 px-2 py-1 text-xs lg:text-sm">
                  Action
                </span>
                <span className="rounded bg-gray-800 px-2 py-1 text-xs lg:text-sm">
                  Adventure
                </span>
                <span className="rounded bg-gray-800 px-2 py-1 text-xs lg:text-sm">
                  Sci-Fi
                </span>
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
                {movieData?.description}
              </p>
              <div className="flex space-x-4">
                <button className="rounded-lg bg-gray-800 px-4 py-2 text-sm lg:text-base hover:bg-gray-700">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container dark:bg-black mx-auto py-6 ">
        <div className="p-4 m-4 border-purple-700 border  bg-gray-800 text-white rounded-lg shadow-lg">
    <h2 className="text-2xl dark:text-white font-bold mb-4">Actors & Crew</h2>
    <div className="flex overflow-x-auto space-x-4 p-2">
    {movieData?.actors.map((actor: any) => (
      <div key={actor.id} className="flex-shrink-0 hover:text-yellow-500 transition duration-300 text-center">
        <img 
          src={actor.imageUrl || "https://picsum.photos/200"} 
          alt={actor.name} 
          className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
        />
        <p>{actor.name}</p>
      </div>
    ))}
      </div>
      </div>
</div>
    </main>

    /*
<main className='dark:bg-black h-screen flex flex-col '>
  <Navigation />
  <div className="relative  font-sans pt-14 before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10 ">
      <img src={movieData?.backdropUrl.trim()} alt="Banner Image" className="absolute inset-0   w-full h-full object-cover" />

      <div className="min-h-[350px] relative z-40 h-full max-w-6xl mx-auto flex flex-col   text-white p-6">
      <div className="md:w-1/2 p-8 space-y-4 bg-gradient-to-r from-black to-transparent">
    <h1 className="text-4xl text-white font-bold hover:underline cursor-pointer transition duration-300">
      {movieData?.title}
    </h1>
    <p className="text-lg text-gray-300 leading-relaxed">
      {movieData?.description}
    </p>
    <div className="text-md text-gray-400">
      <p><span className="font-semibold">Release Date:</span> <span className="text-gray-200">{movieData?.releaseDate}</span></p>
      <p><span className="font-semibold">Genre:</span> <span className="text-gray-200">Action, Drama</span></p>
      <p><span className="font-semibold">Director:</span> <span className="text-gray-200">{movieData?.director}</span></p>
    </div>
  </div>
      </div>
    </div>

  
  <div className="p-4 m-4  bg-gray-800 text-white rounded-lg shadow-lg">
    <h2 className="text-2xl dark:text-white font-bold mb-4">Actors & Crew</h2>
    <div className="flex overflow-x-auto space-x-4 p-2">
      <div className="flex-shrink-0 hover:text-yellow-500 transition duration-300 text-center">
        <img 
          src="https://picsum.photos/200/700" 
          alt="Actor 1" 
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <p>Actor 1</p>
      </div>
      <div className="flex-shrink-0 hover:text-yellow-500 transition duration-300 text-center">
        <img 
          src="https://picsum.photos/200/500" 
          alt="Actor 2" 
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <p>Actor 2</p>
      </div>
      <div className="flex-shrink-0 hover:text-yellow-500 transition duration-300 text-center">
        <img 
          src="https://picsum.photos/200/200" 
          alt="Actor 3" 
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <p>Actor 3</p>
      </div>
      <div className="flex-shrink-0 hover:text-yellow-500 transition duration-300 text-center">
        <img 
          src="https://picsum.photos/200/100" 
          alt="Actor 4" 
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        <p>Actor 4</p>
      </div>
    </div>
  </div>
</main>
*/
  );
}
