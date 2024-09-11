"use client";

import { AdType } from "@/models";
import Image from "next/image";

const AdBanner = ({ads}: {ads: AdType[]}) => {
    return (
        <div className="w-full">
            <div className="grid lg:grid-cols-3 grid-cols-1">
                {ads.map((ad: AdType, index: number) => {
                    return (
                        <div className="relative" key={index}>
                            <Image 
                                src={ad.img}
                                alt=""
                                height={Number(ad.h)}
                                width={Number(ad.w)}
                                objectFit="cover"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdBanner;