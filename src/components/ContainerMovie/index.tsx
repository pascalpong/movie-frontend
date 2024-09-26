"use client"
import { MovieType } from '@/models';
import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard';
import CustomSkeleton from '../Skeleton';
import BannerFirstMovie from '../BannerFirstMovie';
import { useRouter } from 'next/navigation';
import TopMovieComponent from '../TopMovieComponent';
import './TopFilm.css'
import { useGetMoviesQuery } from '@/services/movieService';
import { getGenreByName } from '@/utils/utils';
import { useGetBannersQuery } from '@/services/bannerService';
import { BannerType } from '@/models/ad';
interface IRankMovies {
    id: number,
    image: string,
    title: string,
    des: string,
    new: number
}

interface IRankMoviesCustom {
    id: number,
    img: string,
    title: string,
    des: string,
    isNew: boolean
}

const ContainerMovie = ({ category, moviesByCategory }: {
    category: string, moviesByCategory: {
        [key: string]: MovieType[];
    }
}) => {

    const router = useRouter()
    const [loading, setIsLoading] = useState<boolean>(true)
    const [rankMovies, setRankMovies] = useState([])
    const getRankMovies = useGetMoviesQuery({ limit: 10, page: 1 })
    const {data: getBanners} = useGetBannersQuery({})
    const [banners, setBanners] = useState<BannerType[]>([])
    useEffect(()=>{
        if(getBanners)
          setBanners(getBanners.data)
      },[getBanners])

    useEffect(() => {
        setIsLoading(true);
        try {
            if (getRankMovies.status === "fulfilled") {
                const customRankMovies = getRankMovies.data?.data?.map((rank: IRankMovies) => (
                    {
                        id: rank.id,
                        img: rank.image,
                        title: rank.title,
                        des: rank.des,
                        isNew: rank.new === 1 ? true : false
                    }
                ))
                setRankMovies(customRankMovies)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }, [getRankMovies])

    return (
        <div className={`w-full ${category === 'k-drama' ? 'flex gap-[52px]' : 'block'}`}>

            <div className={`grid grid-cols-12 gap-3 ${category === 'k-drama' ? 'md:w-[60%] w-full' : 'w-full'}`}>
                {!!moviesByCategory[category] && moviesByCategory[category].length > 0 && (
                    moviesByCategory[category].map((movie: MovieType, index: number) => (
                        <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6" key={index}>
                            <MovieCard movie={movie} />
                        </div>
                    ))
                )}
                <div onClick={() => router.push(`/category/${getGenreByName(category)?.id}`)} className='flex justify-end w-full cursor-pointer col-span-full'>
                    <div style={{
                        background: "linear-gradient(90deg, #1C232C 0%, #425DC0 100%)",

                    }} className='flex justify-end xl:w-[50%] md:w-[60%] w-full h-8 items-center rounded-tr-2xl rounded-br-2xl pr-4'>더보기</div>
                </div>
                {
                    category === 'k-movies' && <BannerFirstMovie banners={banners} />
                }
            </div>
            {
                category === 'k-drama' &&
                <div style={{
                    background: 'linear-gradient(270deg, #262E39 0%, #12171E 100%)'

                }} className='flex flex-col flex-1 scrollbar w-full gap-8 pt-4 pb-10 pl-2 pr-4  rounded-2xl h-[800px] overflow-y-scroll' id='style-14'>

                    {
                        loading ? (
                            <>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CustomSkeleton key={index} height='100px' />
                                ))}
                            </>
                        ) : <>
                            {
                                rankMovies?.map((topFilm: IRankMoviesCustom) => {
                                    return (
                                        <TopMovieComponent key={topFilm.id} img={topFilm.img} title={topFilm.title} des={topFilm.des} isNew={topFilm.isNew} />
                                    )
                                })
                            }
                        </>
                    }
                </div>
            }
        </div>
    );
};

export default ContainerMovie;