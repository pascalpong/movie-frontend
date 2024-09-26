import { PlayType, ProfilesType } from '@/models/movie';
import { Button, Divider } from '@mui/material';
import Image from 'next/image';
import React, { MutableRefObject } from 'react';

const OldDetailMovie = ({ videoRef, profile, plays }: {
    videoRef: MutableRefObject<HTMLVideoElement | null>, profile:
        ProfilesType | undefined, plays: PlayType[] | undefined
}) => {
    return (
        <div className="flex flex-col items-center text-white bg-gray-900">
            <div className=''>
                <div data-vjs-player className="w-full">
                    <video ref={videoRef} className="video-js vjs-big-play-centered" />
                </div>
                <div className='flex flex-col gap-1'>
                    <h2>{profile?.title}</h2>
                    <div className='flex justify-between w-full text-xs'>
                        <p>재생목록</p>
                        <p>회차</p>
                    </div>
                    <div className='overflow-auto h-96'>
                        <div className='grid grid-cols-2 gap-1'>
                            {plays?.map((play: PlayType, index: number) => {
                                return (
                                    <Button
                                        key={index}
                                        className={`bg-[#393a43] text-xs text-white h-6 hover:bg-[#4a4b53]`}
                                        onClick={() => {

                                        }}
                                    >
                                        {play.title}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-md'>{profile?.title}</h2>
                    <p className='text-xs'>{profile?.des}</p>
                    <Divider />
                    <p className='text-xs'>출연:{profile?.actor}</p>
                    <p className='text-xs'>개봉:{profile?.release_date}</p>
                    <p className='text-xs'>국가:{profile?.location}</p>
                    <p className='text-xs'>장르:{profile?.genre}</p>
                    <p className='text-xs'>감독:{profile?.author}</p>
                </div>
                <div>
                    <Image
                        src={profile?.image ?? ''}
                        alt={profile?.title ?? ''}
                        width={150}
                        height={100}
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default OldDetailMovie;