import React from 'react';
import "./loading-detail.css"
import { Container, Skeleton, Typography } from '@mui/material';
import ContainerDetailMovie from '../ContainerDetailMovie';
import CustomSkeleton from '../Skeleton';
import Image from 'next/image';
import play_ic from '@/assets/icons/ic_play.svg'
const LoadingPageDetail = () => {
    return (
        <Container className='flex flex-col gap-4 pb-6'>
            <div className='bg-black w-full h-[700px] flex justify-center items-center'>
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <ContainerDetailMovie>
                <div className='grid grid-cols-12 gap-6 xl:gap-[50px]'>
                    <div className='relative col-span-12 xl:col-span-3 w-full h-[340px]'>
                        <Skeleton
                            sx={{ bgcolor: 'grey.900', width: "100%", height: "340px", borderRadius: "10px" }}
                            variant="rectangular"

                        />
                    </div>
                    <div className='flex flex-col col-span-12 gap-5 mt-5 xl:col-span-6'>
                        <Skeleton animation="wave" width={200} height={40} sx={{ bgcolor: 'grey.900' }} />
                        <div className='flex gap-4'>
                            <Skeleton animation="wave" width={100} height={30} sx={{ bgcolor: 'grey.900' }} />
                            <Skeleton animation="wave" width={100} height={30} sx={{ bgcolor: 'grey.900' }} />
                        </div>
                        <Skeleton animation="wave" sx={{ bgcolor: 'grey.900', width: "100%", height: "100px" }} />
                    </div>
                    <div className='col-span-12 xl:col-span-3 flex flex-col gap-[70px] mt-5'>
                        <div className='flex items-center gap-10'>
                            <div className='flex items-center gap-2'>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton animation="wave" width={50} height={30} sx={{ bgcolor: 'grey.900' }} />
                            </div>
                            <div className='flex items-center gap-2'>
                                <Skeleton variant="rectangular" width={30} height={30} />
                                <Skeleton animation="wave" width={50} height={30} sx={{ bgcolor: 'grey.900' }} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-[2px] font-light text-base leading-5'>
                            <Skeleton animation="wave" width={200} height={30} sx={{ bgcolor: 'grey.900' }} />
                            <Skeleton animation="wave" width={200} height={30} sx={{ bgcolor: 'grey.900' }} />
                            <Skeleton animation="wave" width={200} height={30} sx={{ bgcolor: 'grey.900' }} />
                        </div>
                    </div>
                </div>
            </ContainerDetailMovie>
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
                {
                    Array.from({ length: 6 }).map((_, index) => (
                        <div className="col-span-12 xl:col-span-2 md:col-span-4 sm:col-span-6" key={index}>
                            <CustomSkeleton />
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default LoadingPageDetail;