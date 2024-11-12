import Image from 'next/image';

interface CastInfoProps {
  cast: { name: string; role: string; imageUrl: string }[];
}

export default function CastInfo({ cast }: CastInfoProps) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">Cast</h2>
      <div className="flex space-x-6 overflow-x-scroll">
        {cast.map((member, index) => (
          <div key={index} className="text-center cast">
            <Image
              className="h-24 w-24 rounded-full object-cover"
              src={member.imageUrl}
              alt={member.name}
              width={96} 
              height={96} 
            />
            <p className="mt-2">{member.name}</p>
            <p className="text-sm text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}