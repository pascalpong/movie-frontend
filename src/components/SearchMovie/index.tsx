"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import ic_search from "@/assets/icons/search.svg"
import { useParams, useRouter } from 'next/navigation';
import useBreakpoint from '@/hook/useBreakpoint';
const SearchMovie: React.FC = () => {
    const screenSize = useBreakpoint();
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const param = useParams()
    const [inputValue, setInputValue] = useState(!!param ? param.key : '');
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputValue) {
                router.push(`/search/${inputValue}`);
            }
            else {
                router.replace('/')
            }

        }
    };

    const handleSearch = () => {
        if (inputValue) {
            router.push(`/search/${inputValue}`);
        }
        else {
            router.replace('/')
        }
    }

    return (
        <>
            {screenSize === 'desktop' ?
                <div className='relative w-full'>
                    <div className='absolute -translate-y-1/2 cursor-pointer left-2 top-1/2' onClick={handleSearch}>
                        <Image src={ic_search} width={24} height={24} alt='ic_search' />
                    </div>
                    <input onKeyDown={handleKeyDown} type="text" className='w-full rounded-[60px] h-9 border-solid border-[1px] border-[#4A688E] bg-[#12253E] px-12' placeholder='Search movie in here' value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }} />
                </div> :
                <div className="relative flex justify-end w-full">
                    <div className='absolute -translate-y-1/2 cursor-pointer right-4 top-1/2' onClick={handleSearch}>
                        <Image src={ic_search} width={24} height={24} alt='ic_search' />
                    </div>
                    <input
                        type="text"
                        className={`transition-all duration-300 ease-in-out bg-gray-800 text-white py-2 px-4 rounded-full focus:outline-none
                        ${isExpanded ? 'w-full' : 'w-20'}`}
                        onFocus={() => setIsExpanded(true)}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            }
        </>
    );
};

export default SearchMovie;