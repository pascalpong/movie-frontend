import Image from 'next/image';

interface Movie {
    title: string;
    description: string;
    image: string;
}

export default function MovieCard({ movie }: {movie: Movie}) {
    return (
      <div className="border rounded-lg overflow-hidden shadow-lg">
        <Image src={movie.image} alt={movie.title} width={500} height={200} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="font-bold">{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      </div>
    );
  }