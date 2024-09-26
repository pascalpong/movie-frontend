import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './introduce-desktop.css';
import { Swiper as SwiperClass } from 'swiper/types';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { Button } from '@mui/material';
import { IMovieIntroduce } from '@/models/movie';
const IntroduceMovieDesktop = ({ introduceHomePage }: { introduceHomePage: IMovieIntroduce[] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    console.log("introduceHomePage", introduceHomePage);

    return (
        <div className='relative swiper-introduce'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="customSwiper2"
            >
                {JSON.stringify(introduceHomePage)}
                {introduceHomePage ? introduceHomePage?.map((intro: IMovieIntroduce) => {
                    return (
                        <SwiperSlide key={intro.id}>
                            <div className='relative w-full h-full'>
                                <div className='relative w-full pt-[60%]'>
                                    <Image
                                        src={intro.img}
                                        alt={intro.title}
                                        fill
                                        objectFit='center'
                                        className="top-0 left-0 object-center w-full h-full rounded-2xl"
                                    />
                                </div>
                                <div className='absolute top-1/2 left-7'>
                                    <h4 className='text-white font-normal text-[54px] leading-[66px] text-introduce'>{intro.title}</h4>
                                    {intro.views && <span>{`${intro.views} views`}</span>}
                                    <div className='flex items-center gap-4 mt-9'>
                                        <Button sx={{
                                            background: "red",
                                            color: "white",
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            lineHeight: "30px",
                                            height: "59px",
                                            width: "221px",
                                            textTransform: "none",
                                            borderRadius: "11px"
                                        }}>
                                            Watch now
                                        </Button>
                                        <Button sx={{
                                            background: "transparent",
                                            color: "white",
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            lineHeight: "30px",
                                            height: "59px",
                                            width: "221px",
                                            border: "1px solid #ccc",
                                            textTransform: "none",
                                            borderRadius: "11px"
                                        }}>
                                            Trailer
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    )
                }) : <></>}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="customSwiper"
            >
                {introduceHomePage?.map((intro: IMovieIntroduce) => {
                    return (
                        <SwiperSlide key={intro.id}>
                            <div className='relative w-full h-[120px]'>
                                <Image src={intro.img} alt={intro.title} fill className='object-cover rounded-md' />
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
};

export default IntroduceMovieDesktop;