"use client";
 
import { useEffect, useState, useRef } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import { usePlayVideoMutation } from '@/services/movieService';
import { PlayType, ProfilesType, VodsType } from '@/models/movie';
import { Button, Divider } from '@mui/material';
import Image from 'next/image';
import AdBanner from '@/components/AdBanner';
import { AdType } from '@/models';

const Details = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [ playVideo ] = usePlayVideoMutation();
    const [ toPlay, setToPlay ] = useState<{ url?: string; data?: VodsType }>({});
    const [ profile, setProfile ] = useState<ProfilesType>()
    const [ plays, setPlays ] = useState<PlayType[]>()
    const [ ads, setAds ] = useState<AdType[]>([])
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<Player | null>(null);

    useEffect(() => {
        if(id) {
            const fetchData = async () => {
                const { data } = await playVideo({id});
                setToPlay(data.data);
            };
            fetchData();
        }
    },[playVideo, id]) 

    useEffect(() => { 
        if(toPlay.data) {
            setProfile(toPlay.data.profiles[0])
            setPlays(toPlay.data.plays)
            setAds(toPlay.data.ad)
        }
    },[toPlay])

    useEffect(() => {
        if (toPlay.url && videoRef.current) {
            const videoJsOptions = {
                autoplay: true,
                controls: true,
                responsive: true,
                fluid: true,
                sources: [{
                    src: toPlay.url,
                    type: 'application/x-mpegURL'
                }]
            };

            playerRef.current = videojs(videoRef.current, videoJsOptions);

            return () => {
                if (playerRef.current) {
                    playerRef.current.dispose();
                }
            };
        }
    }, [toPlay]);

    return (
        <> 
        <AdBanner ads={ads}/>
        <div className="flex flex-col items-center bg-gray-900 text-white">
            <div className=''>
                <div data-vjs-player className="w-full">
                    <video ref={videoRef} className="video-js vjs-big-play-centered" />
                </div>
                <div className='flex flex-col gap-1'>
                    <h2>{profile?.title}</h2>
                    <div className='flex w-full justify-between text-xs'>
                        <p>재생목록</p>
                        <p>회차</p>
                    </div>
                    <div className='h-96 overflow-auto'>
                        <div className='grid grid-cols-2 gap-1'> 
                            {plays?.map((play: PlayType, index: number) => {
                                return(
                                    <Button
                                        key={index}
                                        className={`bg-[#393a43] text-xs text-white h-6 hover:bg-[#4a4b53]`}
                                        onClick={()=>{
                                            
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
                    <p className='text-xs'>{profile?.intro}</p>
                    <Divider/>
                    <p className='text-xs'>출연:{profile?.doc1}</p>
                    <p className='text-xs'>개봉:{profile?.doc2}</p>
                    <p className='text-xs'>국가:{profile?.doc3}</p>
                    <p className='text-xs'>장르:{profile?.doc4}</p>
                    <p className='text-xs'>감독:{profile?.doc5}</p>
                </div>
                <div>
                    <Image
                        src={profile?.img ?? ''}
                        alt={profile?.title ?? ''}
                        width={150}
                        height={100}
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
        </>
        
    );
};

export default Details;
