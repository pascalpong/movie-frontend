import { ProfilesType } from '@/models/movie';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ContainerDetailMovie from '../ContainerDetailMovie';
import { Button, Tooltip } from '@mui/material';
import InformationMovie from '../InformationMovie';
import "./presentation-movie.css"
import { useGetBannersQuery } from '@/services/bannerService';
import { BannerType } from '@/models/ad';

const PresentationMovie = ({ profile, plays, changeEp }: {
    profile: ProfilesType, plays: {total: number, data: {id: number, title_id: number, number_ep: string}[]},
    changeEp: (number: number) => void
}) => {

    const server = process.env.NEXT_PUBLIC_API_URL

    const {data: getBanners} = useGetBannersQuery({})
    const [banners, setBanners] = useState<BannerType[]>([])
    useEffect(()=>{
        if(getBanners)
            setBanners(getBanners.data)
    },[getBanners])

    return (
        <>
            <div className='flex flex-col gap-4 px-4'>
                <ContainerDetailMovie>
                    <div className='flex items-center gap-5'>
                        <span className='text-lg font-semibold xl:text-2xl'>끊다 :</span>
                        <div className='flex items-center gap-1'>
                            <Button sx={{
                                background: "#5176FF",
                                borderRadius: "11px",
                                width: { xs: "106px", sm: "124px" },
                                height: "40px",
                                color: "white",
                                fontSize: "16px"
                            }}>서버 1</Button>
                            <Button sx={{
                                background: "#263750",
                                borderRadius: "11px",
                                width: { xs: "106px", sm: "124px" },
                                height: "40px",
                                color: "white",
                                fontSize: "16px"
                            }}>서버 2</Button>
                        </div>
                    </div>
                </ContainerDetailMovie>
                <ContainerDetailMovie>
                    <div className='flex flex-col gap-7 xl:gap-8'>
                        <span className='text-lg font-semibold leading-7 xl:text-2xl'>영화 목록</span>
                        <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
                            {plays.data.map((episode, index) => {
                                return (
                                    <Tooltip key={index} title={episode.number_ep} onClick={() => changeEp(parseInt(episode.number_ep))}>
                                        <div className={`bg-[#263750] ${ profile.number_ep === episode.number_ep ? "bg-[#FFF]/40" : ""} flex justify-center items-center text-center text-white font-semibold text-base leading-5 w-[78px] xl:w-[120px] px-3 h-10 rounded cursor-pointer overflow-hidden whitespace-nowrap`}>
                                            {episode.number_ep ?? "No Episode" }
                                        </div>
                                    </Tooltip>
                                )
                            })}
                        </div>
                    </div>
                </ContainerDetailMovie>
                <div className='grid grid-cols-12'>
                    {banners.map((item) => {
                        return (
                            <div key={item._id} className='xl:col-span-3 md:col-span-6 col-span-12 relative w-full h-[87px]'>
                                <Image 
                                    src={`${server}${item.image}`} 
                                    alt={item.image?? ''} 
                                    fill 
                                    className='object-cover cursor-pointer'
                                    onClick={() => window.open(item.url, '_blank')}
                                />
                            </div>
                        )
                    })}
                </div>
                {<InformationMovie profile={profile} />}
                <div className='grid grid-cols-12'>
                    {banners.map((item) => {
                        return (
                            <div key={item._id} className='xl:col-span-3 md:col-span-6 col-span-12 relative w-full h-[87px]'>
                               <Image 
                                    src={`${server}${item.image}`} 
                                    alt={item.image?? ''} 
                                    fill 
                                    className='object-cover cursor-pointer'
                                    onClick={() => window.open(item.url, '_blank')}
                                />
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    );
};

export default PresentationMovie;