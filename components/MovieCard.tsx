import { MovieType } from '@/models';
import Image from 'next/image';


export default function MovieCard({ movie }: { movie: MovieType }) {
  return (
    <div className="border rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"> {/* Tailwind classes for animation */}
      <Image src={movie.img} alt={movie.title} width={150} height={150} />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{movie.title}</h2>
        <p>{movie.intro}</p>
      </div>
    </div>
  );
}