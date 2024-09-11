"use client"

import Announcement from "@/components/Announcement";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { MovieType } from "@/models";
import { movieCategoriesDetails, PageInfoType } from "@/models/movie";
import { useGetMoviesQuery } from "@/services/movieService";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Category = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [page, setPage] = useState(1);
    const categoryMovies = useGetMoviesQuery({ category: id, page });
    const [pageInfo, setPageInfo] = useState<PageInfoType>()
    const [movies, setMovies] = useState<MovieType[]>([])
    const [notice, setNotice] = useState<string[]>([])

    useEffect(() => {
        if(categoryMovies.status === "fulfilled") { 
            const { current_page, last_page, per_page, total } = categoryMovies.data.data;
            setPageInfo({ current_page, last_page, per_page, total })
            setNotice([categoryMovies.data.notice])
            setMovies(categoryMovies.data.data.data)
        }
    },[categoryMovies])

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <div className="pb-2">
                <Announcement announcements={notice}/>
            </div>
            <h1 className="text-xl font-bold transition-transform duration-300 hover:scale-105 pb-2">
                { movieCategoriesDetails[id as unknown as keyof typeof movieCategoriesDetails]?.title }
            </h1>
            <Box display="grid" gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(6, 1fr)' }} gap={2}>
                {movies.map((movie: MovieType, index: number) => (
                    <div className="grid-item" key={index}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </Box>
            {pageInfo && (
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