import React from 'react';
import Image from 'next/image';
import { BannerType } from '@/models/ad';

const BannerMovies = ({ listBanners }: { listBanners: BannerType[] }) => {

  const server = process.env.NEXT_PUBLIC_API_URL

  return (
    <>
      <div className="">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          {listBanners.map((banner) => (
            <div key={banner._id}
              className='cursor-pointer'
              onClick={() => window.open(banner.url, '_blank')}
            >
              <Image
                src={`${server}${banner.image}`}
                alt={`Banner ${banner._id}`}
                width={100}
                height={100}
                className="object-cover w-full h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerMovies;