import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutToken } from "./baseQuery";

export const topFilmService = createApi({
    reducerPath: 'topFilmService',
    baseQuery: baseQueryWithoutToken,
    endpoints: (builder) => ({
        getRankMovies: builder.query({
          query: () => ({
            url: `movies?orderBy=rank`,
            method: 'GET'
          })
        }),

      })
})
export const {useGetRankMoviesQuery} = topFilmService