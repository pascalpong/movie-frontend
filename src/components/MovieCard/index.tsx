import { MovieType } from '@/models';
import Image from 'next/image';

export default function MovieCard({ movie }: { movie: MovieType }) {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <div className="v-item-cover relative">
                <Image 
                    src={movie.img} 
                    alt={movie.title}
                    width={100}
                    height={100}
                    className="lazy-img w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
            </div>
        </div>
    );
}