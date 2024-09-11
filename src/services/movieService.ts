/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

export const MovieService = createApi({
  reducerPath: 'UserService',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    getMovies: builder.query<any, any>({
      query: ({category, page}:{category: number, page: number}) => ({
        url: `movies?${category || page ? `category=${category}&page=${page}` : ''}`,
        method: 'GET'
      })
    }),
    playVideo: builder.mutation<any, any>({
      query: (body) => ({
        url: `movie/play`,
        method: 'POST',
        body
      })
    })
  })
});

export const {
  useGetMoviesQuery,
  usePlayVideoMutation
} = MovieService;
