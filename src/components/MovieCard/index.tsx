import { MovieType } from '@/models';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard({ movie }: { movie: MovieType }) {
  return (
    <Link href={`/detail/${movie.id}`} className="block">
      <div className='flex flex-col'>
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <div className="aspect-[2/3] relative">
            <Image 
              src={movie.img} 
              alt={movie.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-gray-300 text-sm truncate text-center">{movie.sub_title}</p>
            </div>
          </div>
        </div>
        <div> 
          <h2 className="text-white text-sm font-bold mb-2 text-center py-1">{movie.title}</h2>
        </div>
      </div>
    </Link>
  );
}