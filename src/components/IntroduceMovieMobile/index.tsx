import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip, Navigation } from 'swiper/modules';
import { IMovieIntroduce } from '@/models/movie';
import Image from 'next/image';
import { Button } from '@mui/material';
import "./introduce-mobile.css"
const IntroduceMovieMobile = ({ introduceHomePage }: { introduceHomePage: IMovieIntroduce[] }) => {
    return (
        <div className='introduce-mobile'>
            <Swiper
                effect={'flip'}
                grabCursor={true}
                pagination={true}
                navigation={true}
                modules={[EffectFlip, Navigation]}
                className="mySwiper"
            >
                <div>
                    {introduceHomePage?.map((intro: IMovieIntroduce) => {
                        return (
                            <SwiperSlide key={intro.id}>
                                <div className='relative w-full h-full'>
                                    <div className='relative w-full pt-[80%]'>
                                        <Image
                                            src={intro.img}
                                            alt={intro.title}
                                            fill
                                            objectFit='center'
                                            className="top-0 left-0 object-center w-full h-full rounded-2xl"
                                        />
                                    </div>
                                    <div className='absolute -translate-x-1/2 bottom-4 left-1/2'>
                                        <h4 className='flex justify-center text-2xl font-normal leading-7 text-center text-white text-introduce'>{intro.title}</h4>
                                        {intro.views && <span>{`${intro.views} views`}</span>}
                                        <div className='flex items-center justify-center gap-4 mt-2'>
                                            <Button sx={{
                                                background: "red",
                                                color: "white",
                                                fontSize: "10px",
                                                fontWeight: "700",
                                                lineHeight: "12px",
                                                height: "24px",
                                                width: "90px",
                                                textTransform: "none",
                                                borderRadius: "4px"
                                            }}>
                                                Watch now
                                            </Button>
                                            <Button sx={{
                                                background: "transparent",
                                                color: "white",
                                                fontSize: "10px",
                                                fontWeight: "700",
                                                lineHeight: "12px",
                                                height: "24px",
                                                width: "90px",
                                                border: "1px solid #ccc",
                                                textTransform: "none",
                                                borderRadius: "4px"
                                            }}>
                                                Trailer
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        )
                    })}
                </div>

            </Swiper>
        </div>
    );
};

export default IntroduceMovieMobile;