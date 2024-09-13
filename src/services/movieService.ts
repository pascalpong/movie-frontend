/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

export const MovieService = createApi({
  reducerPath: 'UserService',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    getMovies: builder.query<any, any>({
      query: ({category, page, search}:{category: number, page: number, search: string}) => ({
        url: `movies?${category ? `category=${category}&` : ''}${page ? `page=${page}&` : ''}${search ? `search=${search}&` : ''}`,
        method: 'GET'
      })
    }),
    playVideo: builder.mutation<any, any>({
      query: (body) => ({
        url: `movie/play`,
        method: 'POST',
        body
      })
    }),
  })
});

export const {
  useGetMoviesQuery,
  usePlayVideoMutation
} = MovieService;
