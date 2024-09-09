/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

export const MovieService = createApi({
  reducerPath: 'UserService',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    getMovies: builder.query<any, any>({
      query: () => ({
        url: `movies`,
        method: 'GET'
      })
    }),
  })
});

export const {
  useGetMoviesQuery
} = MovieService;
