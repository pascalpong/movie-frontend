import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutToken } from "./baseQuery";
import { ResponseType } from "@/models";

export const bannerService = createApi({
  reducerPath: "bannerService",
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url: "/ad-banner",
        method: "GET",
      }),
    }),
    postAnnouncement: builder.mutation<{status: string, data: {id: string, announcement: string}}, {announcement: string}>({
      query: (body) => ({
        url: "/announcement",
        method: "POST",
        body
      })
    }),
    postBanner: builder.mutation<
      ResponseType<{
        message: string;
        banner: {
          url: string;
          shop_name?: string;
          rank?: string;
          add_time?: string;
          until?: string;
        };
      }>,
      FormData
    >({
      query: (formData) => ({
        url: "/ad-banner",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
    deleteBanner: builder.mutation({
      query: (id: string) => ({
        url: `/ad-banner/${id}`,
        method: "DELETE"
      })
    })
  }),
});

export const { useGetBannersQuery, usePostBannerMutation, useDeleteBannerMutation } = bannerService;
