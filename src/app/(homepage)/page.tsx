"use client"


import { useGetCategoryMoviesQuery } from '@/services/movieService';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import Announcement from '@/components/Announcement';

import BannerMovies from '@/components/BannerMovies';
import play_ic from '@/assets/icons/ic_play.svg'
import Image from 'next/image';
import ContainerMovie from '@/components/ContainerMovie';
import useBreakpoint from '@/hook/useBreakpoint';
import BaseSwiper from '@/components/BaseSwiper';
import IntroduceMovie from '@/components/IntroduceMovie';
import { MovieType } from '@/models';
import CustomSkeleton from '@/components/Skeleton';
import { useGetAnnouncementsQuery } from '@/services/announcementService';
import { AnnouncementType } from '@/models/announcement';
import { useGetBannersQuery } from '@/services/bannerService';
import { BannerType } from '@/models/ad';
import { getGenreByName } from '@/utils/utils';



const HomePage = () => {
  const [cate, setCate] = useState<string[]>([]);
  const [movies, setMovies] = useState<{ [key: string]: MovieType[] }>({})
  const screenSize = useBreakpoint();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const categories = useGetCategoryMoviesQuery({ limit: 12 });
  const {data: getBanners} = useGetBannersQuery({})
  const [banners, setBanners] = useState<BannerType[]>([])
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([])
  const {data: getAnnouncement} = useGetAnnouncementsQuery({active: true})
  useEffect(()=> {
    if(getAnnouncement)
      setAnnouncements(getAnnouncement.data)
  },[getAnnouncement])
  useEffect(()=>{
    if(getBanners)
      setBanners(getBanners.data)
  },[getBanners])

  useEffect(() => {

    try {
      if (categories.status === 'pending') {
        setIsLoading(true);
      }
      if (categories && categories.data && categories.status === 'fulfilled') {
        setCate(Object.keys(categories.data.data));        
        setMovies(categories.data.data)
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <>
      <IntroduceMovie />
      <Announcement announcements={announcements} />
      <div className='py-2'>
        <BannerMovies listBanners={banners} />
      </div>
      {
        isLoading ? <div className='grid grid-cols-12 gap-3 my-6'>{
          Array.from({ length: 24 }).map((_, index) => (
            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6" key={index}>
              <CustomSkeleton />
            </div>
          ))

        }</div> : <>
          {cate.map((category) => (
            <div key={category} className="mb-8">
              {
                category === 'k-drama' ? <div className='flex gap-[52px] items-center'>
                  <div className='relative my-8 md:w-[60%] w-full'>
                    <div className='flex items-center gap-4'>
                      <div className='relative w-7 h-7'>
                        <Image src={play_ic} alt='play_ic' fill />
                      </div>
                      <Typography variant="h4" className="font-semibold text-2xl text-[#B7C6FF]">{getGenreByName(category)?.title}</Typography>
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
                  <div className='relative flex-1 hidden md:block'>
                    <div className='flex items-center gap-4'>
                      <Typography variant="h4" className="font-semibold text-2xl text-[#B7C6FF]">TOP 조회수가 많음</Typography>
                    </div>
                    <div style={{
                      border: "1px solid",
                      borderImageSource: "linear-gradient(90deg, #5176FF 0%, #1C232C 100%)",
                      borderImageSlice: 1,
                      width: "100%",
                      position: "absolute",
                      bottom: "-12px"
                    }}></div>
                  </div>
                </div> :
                  <>
                    <div className='relative my-8'>
                      <div className='flex items-center gap-4'>
                        <div className='relative w-7 h-7'>
                          <Image src={play_ic} alt='play_ic' fill />
                        </div>
                        <Typography variant="h4" className="font-semibold text-2xl text-[#B7C6FF]">{getGenreByName(category)?.title}</Typography>
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
                  </>
              }
              {
                screenSize === 'desktop' ?
                  <>
                    <ContainerMovie
                      category={category}
                      moviesByCategory={movies}
                    />
                  </>
                  :
                  <>
                    <BaseSwiper moviesByCategory={movies[category]} />
                  </>
              }

            </div >
          ))}</>
      }


    </>
  );
}

export default HomePage;
