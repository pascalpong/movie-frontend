"use client"

import Announcement from "@/components/Announcement";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { MovieType } from "@/models";
import { PageInfoType } from "@/models/movie";
import { useGetMoviesQuery } from "@/services/movieService";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const Search = () => {
    const params = useParams()
    const { key } = params;
    
    const [movies, setMovies] = useState<MovieType[]>([])
    const [page, setPage] = useState<number>()
    const [notice, setNotice] = useState<string[]>(['No Notice'])
    const [pageInfo, setPageInfo] = useState<PageInfoType>()
    const { data } = useGetMoviesQuery({search: key, page})

    useEffect(() => {
        if(data) {
            const { current_page, last_page, per_page, total } = data.data;
            setPageInfo({ current_page, last_page, per_page, total })
            setMovies(data.data.data)
        }
    },[data])

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <div className="pb-2">
                <Announcement announcements={notice}/>
            </div>
            <h1 className="text-xl font-bold transition-transform duration-300 hover:scale-105 pb-2">
                Search
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

export default Search;