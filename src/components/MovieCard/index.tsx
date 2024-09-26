import { MovieType } from '@/models';
import { encodeData } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard({ movie }: { movie: MovieType }) {

  const encoded = encodeData({ id: movie.title_id, title: movie.title, number_ep: movie.number_ep })

  return (
    <Link href={`/detail/${encoded}`} className="block">
      <div className='flex flex-col'>
        <div className="relative overflow-hidden rounded-lg shadow-lg group">
          <div className="aspect-[2/3] relative">
            <Image
              src={movie.image ?? ''}
              alt={movie.title}
              fill
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-sm text-center text-gray-300 truncate">{movie.latest_ep_date}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="py-1 mb-2 text-sm font-bold text-center text-white">{movie.title}</h2>
        </div>
      </div>
    </Link>
  );
}