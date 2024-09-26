import MovieCard from '@/components/MovieCard';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import play_ic from '@/assets/icons/ic_play.svg'
import useBreakpoint from '@/hook/useBreakpoint';
import BaseSwiper from '@/components/BaseSwiper';
import { MovieType } from '@/models';

const NewsFilm = ({movies}: {movies: MovieType[]}) => {
    const screenSize = useBreakpoint(); 
    return (
        <div className='px-4'>
            {screenSize === 'desktop' ? <>
                <div className='relative mb-4'>
                    <div className='flex items-center gap-4'>
                        <div className='relative w-7 h-7'>
                            <Image src={play_ic} alt='play_ic' fill />
                        </div>
                        <Typography variant="h4" className="font-semibold text-2xl text-[#B7C6FF]">최신드라마</Typography>
                    </div>
                    <div style={{
                        border: "1px solid",
                        borderImageSource: "linear-gradient(90deg, #5176FF 0%, #1C232C 100%)",
                        borderImageSlice: 1,
                        width: "70%",
                        position: "absolute",
                        bottom: "-12px"
                    }}></div>
                </div>
                <div className='grid grid-cols-12 gap-4'>
                    {movies.map((movie, index) => {
                        return (
                            <div className="col-span-12 xl:col-span-2 md:col-span-4 sm:col-span-6" key={index}>
                                <MovieCard movie={movie} />
                            </div>
                        )
                    })}
                </div>
            </> :
                <>
                    <div className='relative mb-8'>
                        <div className='flex items-center gap-4'>
                            <div className='relative w-7 h-7'>
                                <Image src={play_ic} alt='play_ic' fill />
                            </div>
                            <Typography variant="h4" className="font-semibold text-2xl text-[#B7C6FF]">최신드라마</Typography>
                        </div>
                        <div style={{
                            border: "1px solid",
                            borderImageSource: "linear-gradient(90deg, #5176FF 0%, #1C232C 100%)",
                            borderImageSlice: 1,
                            width: "70%",
                            position: "absolute",
                            bottom: "-12px"
                        }}></div>
                    </div>
                    <BaseSwiper moviesByCategory={movies} />
                </>
            }
        </div>
    );
};

export default NewsFilm;