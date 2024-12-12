import Image from "next/image";
import Navigation from "./Components/Navigation";

export default function Home() {
  return (
    <main className="dark:bg-black bg-white h-screen">
                 <Navigation />

                 
                <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 h-full">
                  <div className="col-span-1 row-span-1 bg-gray-800 p-4">
                  <h2 className="text-white text-xl mb-4">Movies</h2>
                  <div className="flex flex-wrap gap-2">
                    <Image src="/path/to/movie1.jpg" alt="Movie 1" width={100} height={150} />
                    <Image src="/path/to/movie2.jpg" alt="Movie 2" width={100} height={150} />
                    <Image src="/path/to/movie3.jpg" alt="Movie 3" width={100} height={150} />
                  </div>
                  </div>
                  <div className="col-span-1 row-span-1 bg-gray-800 p-4">
                  <h2 className="text-white text-xl mb-4">Shows</h2>
                  <div className="flex flex-wrap gap-2">
                    <Image src="/path/to/show1.jpg" alt="Show 1" width={100} height={150} />
                    <Image src="/path/to/show2.jpg" alt="Show 2" width={100} height={150} />
                    <Image src="/path/to/show3.jpg" alt="Show 3" width={100} height={150} />
                  </div>
                  </div>
                  <div className="col-span-2 row-span-1 bg-gray-800 p-4">
                    <h2 className="text-white text-xl mb-4">Celebs</h2>
                    {/* Add celeb content here */}
                  </div>
                </div>
    </main>

  
  );
}
