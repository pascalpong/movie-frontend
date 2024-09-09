"use client"

import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { useGetMoviesQuery } from '@/services/movieService';
import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { MovieType } from '@/models';

export default function Home() {
  const { data } = useGetMoviesQuery({});
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    if(data && data.data.data) {
      setMovies(data.data.data)
    } 
  }, [data, setMovies]); 

  return (
    <div>
      <Header />
      <main>
        <Container>
          <Typography variant="h3" className="font-bold mb-4" color="error">Free Movies</Typography>
          <Box display="grid" gridTemplateColumns={{ xs: 'repeat(2, 1fr)', lg: 'repeat(6, 1fr)' }} gap={2}>
            {movies.map((movie, index) => (
              <div className="grid-item" key={index}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </Box>
        </Container>
      </main>
    </div>
  );
}
