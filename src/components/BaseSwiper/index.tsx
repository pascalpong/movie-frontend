import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieType } from '@/models';
import CustomSkeleton from '../Skeleton';
import MovieCard from '../MovieCard';
const BaseSwiper = ({ moviesByCategory }: {
    moviesByCategory: MovieType[];
}) => {
    console.log("moviesByCategory", moviesByCategory);

    return (
        <Swiper

            spaceBetween={24}
            breakpoints={{
                500: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                },
            }}

        >

            <div>
                {!!moviesByCategory && moviesByCategory.length > 0 ? (
                    moviesByCategory.map((movie: MovieType, index: number) => (
                        <SwiperSlide className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6" key={index}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))
                ) : (
                    Array.from({ length: 2 }).map((_, index) => (
                        <SwiperSlide className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6" key={index}>
                            <CustomSkeleton />
                        </SwiperSlide>
                    ))
                )}
            </div>

        </Swiper>
    );
};

export default BaseSwiper;