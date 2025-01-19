"use client";
import React, { useEffect, useState } from "react";
import Navigation from "../../Components/Navigation";
import { useAuth } from "@/app/context/AuthContext";

interface ActorData {
  id: number;
  name: string;
  bio: string;
  birthDate: string;
  imageUrl: string;
}

export default function ActorDetail({ params }: { params: { id: number } }) {
  const { id } = params;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const user = useAuth();

  const [actorData, setActorData] = useState<ActorData | null>(null);
  const [backdropImageLoaded, setBackdropImageLoaded] = useState(false);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const response = await fetch(`${API_URL}/actors/${id}`);
        const data = await response.json();
        setActorData(data);
      } catch (error) {
        console.error("Error fetching actor data:", error);
      }
    };

    fetchActorData();
  }, [API_URL, id]);

  // Preload the actor's image
  useEffect(() => {
    if (actorData?.imageUrl) {
      const image = new Image();
      image.src = actorData.imageUrl;
      image.onload = () => setBackdropImageLoaded(true);
    }
  }, [actorData?.imageUrl]);

  return (
    <main className="dark:bg-black bg-white">
      <Navigation />

      <div className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center bg-cover bg-center"
           style={{ backgroundImage: `url(${actorData?.imageUrl})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col items-center justify-center text-center p-6 text-white z-10">
          <img
            src={actorData?.imageUrl || "https://picsum.photos/200"}
            alt={actorData?.name}
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h1 className="text-4xl font-bold">{actorData?.name}</h1>
          <p className="text-lg text-gray-300">{actorData?.birthDate}</p>
        </div>
      </div>

      <div className="py-6 lg:py-12 px-4 lg:px-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="container mx-auto space-y-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Biography</h2>
            <p className="text-gray-300">{actorData?.bio}</p>
          </div>

     
        </div>
      </div>
    </main>
  );
}
