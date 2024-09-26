"use client"

import Announcement from "@/components/Announcement";
import MovieCard from "@/components/MovieCard";
import NotFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
import CustomSkeleton from "@/components/Skeleton";
import { MovieType } from "@/models";
import { AnnouncementType } from "@/models/announcement";
import { movieCategoriesDetails, PageInfoType } from "@/models/movie";
import { useGetAnnouncementsQuery } from "@/services/announcementService";
import { useGetMoviesQuery } from "@/services/movieService";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Category = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [page, setPage] = useState(1);
    const categoryMovies = useGetMoviesQuery({ category: id, page, limit: 30 });
    const [pageInfo, setPageInfo] = useState<PageInfoType>()
    const [movies, setMovies] = useState<MovieType[]>([])
    const [loading, setIsLoading] = useState<boolean>(true)

    const [announcements, setAnnouncements] = useState<AnnouncementType[]>([])
    const {data: getAnnouncement} = useGetAnnouncementsQuery({active: true})
    useEffect(()=> {
      if(getAnnouncement)
        setAnnouncements(getAnnouncement.data)
    },[getAnnouncement])

    useEffect(() => {
        setIsLoading(true);
        if (categoryMovies.status === "fulfilled") {
            const { current_page, last_page, per_page, total } = categoryMovies.data;
            setPageInfo({ current_page, last_page, per_page, total })
            setMovies(categoryMovies.data.data)
            setIsLoading(false);
        }
    }, [categoryMovies])

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };




    return (
        <div>
            <div className="pb-2">
                <Announcement announcements={announcements} />
            </div>
            <h1 className="pb-2 text-xl font-bold transition-transform duration-300 hover:scale-105">
                {movieCategoriesDetails[id as unknown as keyof typeof movieCategoriesDetails]?.title}
            </h1>
            <Box display="grid" gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }} gap={2}>

                {loading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                        <div className="grid-item" key={index}>
                            <CustomSkeleton />
                        </div>
                    ))
                ) : (
                    <>
                        {movies?.length > 0 ? (
                            <>
                                {movies.map((movie: MovieType, index: number) => (
                                    <div className="grid-item" key={index}>
                                        <MovieCard movie={movie} />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <NotFound />
                        )}
                    </>
                )}
            </Box>
            {!!pageInfo && (
                <Pagination
                    currentPage={pageInfo.current_page ?? 1}
                    totalPages={pageInfo.last_page ?? 1}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}

export default Category;