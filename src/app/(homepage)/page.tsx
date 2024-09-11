"use client"

import MovieCard from '@/components/MovieCard';
import { useGetMoviesQuery } from '@/services/movieService';
import { useEffect, useState, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import { AdType, MovieType } from '@/models';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import Announcement from '@/components/Announcement';

const categories = [1, 2, 3, 4, 5, 6];

const HomePage = () => {
  const [moviesByCategory, setMoviesByCategory] = useState<{ [key: number]: MovieType[] }>({});
  const ads: AdType[] = [
      {
        "id": "3",
        "img": "https://tinypic.host/images/2024/03/29/639x85JPG.jpeg",
        "dis": "1",
        "domain": "https://test.com",
        "shop_name": null,
        "add_time": null,
        "rank": null,
        "w": "637",
        "h": "85"
      },
      {
        "id": "2",
        "img": "https://tinypic.host/images/2024/03/29/639x85JPG.jpeg",
        "dis": "1",
        "domain": "https://test.com",
        "shop_name": null,
        "add_time": null,
        "rank": null,
        "w": "637",
        "h": "85"
      },
      {
        "id": "1",
        "img": "https://tinypic.host/images/2024/03/29/639x85JPG.jpeg",
        "dis": "1",
        "domain": "https://test.com",
        "shop_name": null,
        "add_time": null,
        "rank": null,
        "w": "637",
        "h": "85"
      }
    ]

  const category1Query = useGetMoviesQuery({ category: 1, page: 1 });
  const category2Query = useGetMoviesQuery({ category: 2, page: 1 });
  const category3Query = useGetMoviesQuery({ category: 3, page: 1 });
  const category4Query = useGetMoviesQuery({ category: 4, page: 1 });
  const category5Query = useGetMoviesQuery({ category: 5, page: 1 });
  const category6Query = useGetMoviesQuery({ category: 6, page: 1 });

  const categoryQueries = useMemo(() => [
    category1Query, category2Query, category3Query, 
    category4Query, category5Query, category6Query
  ], [category1Query, category2Query, category3Query, 
      category4Query, category5Query, category6Query]);

  useEffect(() => {
    const newMoviesByCategory: { [key: number]: MovieType[] } = {};

    categoryQueries.forEach((query, index) => {
      if (query.data && query.data.data.data) {
        newMoviesByCategory[categories[index]] = query.data.data.data.slice(0, 12);
      }
    });

    setMoviesByCategory(newMoviesByCategory);
  }, [categoryQueries]);

  const categoryNames = ['HOME', '최신영화', '최신드라마', '최신예능', '최신음악', '생기', '시사/다큐']

  return (
    <>
      <Announcement announcements={['TV8282오신것을환영합니다']}/>
      <div className='py-2'>
        <AdBanner ads={ads}/>
      </div>
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <div className='flex justify-between'>
            <Typography variant="h4" className="font-bold mb-2">{categoryNames[category]}</Typography>
            <Link href={`/category/${category}`}>더보기</Link>
          </div>
          <Box display="grid" gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }} gap={2}>
            {moviesByCategory[category]?.map((movie: MovieType, index: number) => (
              <div className="grid-item" key={index}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </Box>
        </div>
      ))}
    </>
  );
}

export default HomePage;
