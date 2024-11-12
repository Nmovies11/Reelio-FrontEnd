import Image from 'next/image';

interface ShowCardProps {
  id: number;
  title: string;
  poster: string;
}
const MovieCard = ({id, title, poster }: ShowCardProps) => {
  return (
    <a href={`/shows/${id}`} className="block transform transition duration-500 
                                hover:scale-110  max-w-xs rounded overflow-hidden shadow-lg bg-purple-700">
      <div className="h-72"> {/* Fixed height for image container */}
        <Image
          className="w-full h-full object-cover" // Use object-cover for uniformity
          src={poster}
          alt={`Poster of ${title}`}
          width={300} 
          height={400}
          layout="responsive"
        />
      </div>
      
      <div className="px-6 py-4" title={title}>
      <div className="font-bold mb-2 text-center truncate">{title}</div>
      </div>
    </a>
  );
};

export default MovieCard;