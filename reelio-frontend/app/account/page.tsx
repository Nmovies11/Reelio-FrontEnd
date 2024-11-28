"use client";
import Navigation from "../Components/Navigation";

const account = () => {
  return (
    <main className="dark:bg-black dark:text-white min-h-screen">
      <Navigation />
      <div className="container mx-auto">
        {/* Banner Section */}
        <div
          className="backdrop relative flex h-[60vh] lg:h-[25vh]"
          style={{
            backgroundImage: `url(${"https://image.tmdb.org/t/p/original/oblUNeHlwV3VsjB5ITMlco5ZSOF.jpg"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="overlay absolute inset-0 bg-black bg-opacity-60"></div>

          {/* Settings Button */}
          <button
            className="absolute top-4 right-4 bg-white text-black dark:bg-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => alert("Go to Settings")}
          >
            Settings
          </button>
        </div>

        {/* Profile Picture */}
        <div className="relative">
          <div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2 z-10">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-black object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-20 text-center">
          <h1 className="text-2xl font-bold">Your Name</h1>
          <p className="text-gray-500 dark:text-gray-400">Your Bio or Tagline</p>
        </div>
      </div>
    </main>
  );
};

export default account;
