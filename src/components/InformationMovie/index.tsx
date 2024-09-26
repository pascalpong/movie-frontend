import React from 'react';
import ContainerDetailMovie from '../ContainerDetailMovie';
import Image from 'next/image';
import { ProfilesType } from '@/models/movie';
import not_img from '@/assets/images/no_img.jpg'
import ic_heart from "@/assets/icons/ic_heart.svg"
import ic_share from "@/assets/icons/ic_share.svg"
import { Rating } from '@mui/material';
const InformationMovie = ({ profile }: { profile: ProfilesType }) => {


        
    return (
        <ContainerDetailMovie>
            <div className='grid grid-cols-12 gap-6 xl:gap-[50px]'>
                <div className='relative col-span-12 xl:col-span-3 w-full h-[340px]'>
                    <Image src={profile?.image ?? not_img} alt={profile?.title ?? 'title'} fill className='rounded-[10px]' />
                </div>
                <div className='flex flex-col col-span-12 gap-5 mt-5 xl:col-span-6'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='font-semibold text-[32px]'>{profile?.title ?? "No title"}</h4>
                        <Rating name="read-only" value={4.5} readOnly />
                    </div>
                    <div className='flex items-center gap-8'>
                        <span className='text-sm font-medium'>{`개봉: ${profile.release_date}`}</span>
                        <span className='text-sm font-medium'>국가:{profile.location}</span>
                    </div>
                    <span className='text-sm font-medium'>{profile?.des ?? "No intro"}</span>
                </div>
                <div className='col-span-12 xl:col-span-3 flex flex-col gap-4 xl:gap-[70px] mt-0 xl:mt-5'>
                    <div className='flex items-center gap-10'>
                        <div className='flex items-center gap-2'>
                            <div className='relative w-6 h-6'>
                                <Image src={ic_heart} alt='ic_heart' fill />
                            </div>
                            <span className='text-sm font-medium'>Follow</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='relative w-6 h-6'>
                                <Image src={ic_share} alt='ic_share' fill />
                            </div>
                            <span className='text-sm font-medium'>Share</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[2px] font-light text-base leading-5'>
                        <span>출연:{profile.actor ? JSON.parse(profile.actor).map((act: string) => act).join(", ") : ''}</span>
                        <span>장르:{profile.genre}</span>
                        <span>감독:김재훈</span>
                    </div>
                </div>
            </div>
        </ContainerDetailMovie>
    );
};

export default InformationMovie;