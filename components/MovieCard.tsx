import Image from 'next/image';

interface MovieProps {
  movie: {
    title: string;
    description: string;
    image: string;
  };
}

export default function MovieCard({ movie }: MovieProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Image src={movie.image} alt={movie.title} width={150} height={150} />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{movie.title}</h2>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}