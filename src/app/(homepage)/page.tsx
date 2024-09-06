import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '@/slices/movie/moviesSlice';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { RootState } from '@/store/store';
import type AppDispatch from '@/store/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const movieStatus = useSelector((state: RootState) => state.movies.status);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(getMovies()); // Cast to any if necessary
    }
  }, [movieStatus, dispatch]);

  return (
    <div>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Free Movies</h1>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
