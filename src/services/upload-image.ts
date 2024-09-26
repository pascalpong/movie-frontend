import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutToken } from "./baseQuery";
import { ResponseType } from "@/models";

export const uploadService = createApi({
  reducerPath: "uploadService",
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    uploadImage: builder.mutation<
      ResponseType<{
        message: string;
        fileUrls: string[];
      }>,
      {
        files: File;
      }
    >({
      query: ({ files }) => {
        const formData = new FormData();
        formData.append("files", files);
        return {
          url: "/upload-image",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = uploadService;
