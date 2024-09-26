"use client"

import AdminMovieDetails from "@/components/AdminMovieDetails";
import { ProfilesType } from "@/models/movie";
import { useGetMovieDetailsMutation } from "@/services/movieService";
import { decodeData } from "@/utils/utils";
import { useEffect, useState } from "react";


const MovieDetails = ({ params }: { params: { decode: string } }) => {
    const { decode } = params;
    const [movieDetails] = useGetMovieDetailsMutation()
    const [profile, setProfile] = useState<ProfilesType>()
    useEffect(() => {

        const getDetails = async () => {
            if(decode) {
                const decoded = decodeData(decode)
                const { data: details } = await movieDetails({id: decoded.title_id, title: decoded.title})
                if(details.status === "success") {
                    setProfile(details.data)
                }
            }
        }

        getDetails()

    },[decode, movieDetails])

    return (
        <>
            {profile ? <AdminMovieDetails profile={profile} /> : <div>No profile available</div>}
        </>
    )
}

export default MovieDetails;