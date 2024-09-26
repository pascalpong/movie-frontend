/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

export const MovieService = createApi({
  reducerPath: 'UserService',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    getMovies: builder.query<any, any>({
      query: ({category, page,limit}:{category: number, page: number,limit : string}) => ({
        url: `movies?${category ? `genre=${category}&` : ''}${page ? `page=${page}&` : ''}${limit ? `limit=${limit}&` : ''}`,
        method: 'GET'
      })
    }),
    searchMovies: builder.query<any, any>({
      query: ({ page, search}:{ page: number, search: string}) => ({
        url: `movies/search?${page ? `page=${page}&` : ''}${search ? `search=${search}&` : ''}`,
        method: 'GET'
      })
    }),
    getMovieDetails: builder.mutation<any, {id: string, title: string, number_ep?: string | null}>({
      query: (body) => ({
        url: `movie/detail`,
        method: 'POST',
        body
      })
    }),
    getCategoryMovies: builder.query<any, any>({
      query: ({ limit, latest, popularity }) => ({
        url: `movie/categories?${limit ? `limit=${limit}&`:''}${latest ? `latest=${latest}&`:''}${popularity ? `popularity=${popularity}&`:''}`,
        method: 'GET'
      })
    }),
    getEpisodes: builder.mutation<any, any>({
      query: ({id}: {id: number}) => ({
        url: `movies/episodes?id=${id}`,
        method: 'GET'
      })
    })
  })
});

export const {
  useGetMoviesQuery,
  useSearchMoviesQuery,
  useGetCategoryMoviesQuery,
  useGetMovieDetailsMutation,
  useGetEpisodesMutation
} = MovieService;
