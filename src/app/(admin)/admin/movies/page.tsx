"use client"

import Pagination from "@/components/Pagination";
import SortingTable from "@/components/SortingTable";
import { MovieType } from "@/models";
import { PageInfoType } from "@/models/movie";
import { useGetMoviesQuery } from "@/services/movieService";
import { useEffect, useState } from "react";

const Movies = () => {
    const [movies, setMovies] = useState<MovieType[]>([])
    const [page, setPage] = useState<number>(1)
    const { data:getMovies } = useGetMoviesQuery({ page:page });
    const [pageInfo, setPageInfo] = useState<PageInfoType>()
    const headCell = ['id', 'image', 'title', 'title_id', 'number_ep', 'latest_ep_date',""]
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    useEffect(() => {
        if(getMovies) {
            setMovies(getMovies.data)
            setPageInfo({ 
                current_page: getMovies.current_page, 
                last_page: getMovies.last_page, 
                per_page: getMovies.per_page, 
                total: getMovies.total 
            })
        }
    },[getMovies])
    
    return(
        <div className="p-4">
            <SortingTable HeadCell={headCell} data={movies}/>
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

export default Movies;