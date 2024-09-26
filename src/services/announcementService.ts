import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithoutToken } from "./baseQuery"

export const announcementService = createApi({
    reducerPath: 'announcementService',
    baseQuery: baseQueryWithoutToken,
    endpoints: (builder) => ({
        getAnnouncements: builder.query({
            query: ({active}: {active: boolean|null}) => ({
                url: `/announcement?${active ? `active=${active}` : ''}`,
                method: 'GET'
            })
        }),
        addAnnouncement: builder.mutation({
            query: (body) => ({
                url: '/announcement',
                method: 'POST',
                body
            })
        }),
        updateAnnouncement: builder.mutation({
            query: (id: string) => ({
                url: `/announcement/${id}`,
                method: 'PATCH'
            })
        }),
        deleteAnnouncement: builder.mutation({
            query: (id: string) => ({
                url: `/announcement/${id}`,
                method: 'DELETE'
            })
        })
      })
})
export const {useGetAnnouncementsQuery, useAddAnnouncementMutation, useUpdateAnnouncementMutation, useDeleteAnnouncementMutation} = announcementService