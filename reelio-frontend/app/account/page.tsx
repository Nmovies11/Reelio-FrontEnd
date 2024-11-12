"use client";
import Navigation from "../Components/Navigation";

const account = () => {
  return (
    <main className="dark:bg-black dark:text-white min-h-screen ">
      <Navigation />
      <div className="container mx-auto">
        <div
          className="backdrop relative flex h-[60vh] lg:h-[25vh]"
          style={{
            backgroundImage: `url(${"https://image.tmdb.org/t/p/original/oblUNeHlwV3VsjB5ITMlco5ZSOF.jpg"})`,
          }}
        >
          <div className="overlay absolute inset-0 bg-black bg-opacity-100"></div>
        </div>
      </div>
    </main>
  );
};

export default account;
