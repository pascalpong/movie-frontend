import { BannerType } from '@/models/ad';
import Image from 'next/image';
import React from 'react';

const BannerFirstMovie = ({banners}: {banners: BannerType[]}) => {
    const server = process.env.NEXT_PUBLIC_API_URL
    return (
        <div className='grid grid-cols-12 col-span-full'>
            {
                banners.map((ad) => {
                    return (
                        <div className='relative w-full h-[87px] xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12 cursor-pointer'
                            key={ad._id} 
                            onClick={() => window.open(ad.url, '_blank')}
                        >
                            <Image src={`${server}${ad.image}`} fill alt='img' className='object-cover' />
                        </div>
                    )
                })
            }
        </div>
    );
};

export default BannerFirstMovie;