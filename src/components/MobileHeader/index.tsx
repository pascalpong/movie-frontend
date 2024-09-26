import React, { useState } from 'react';
import logo from '@/assets/logo.png'
import sort_ic from '@/assets/icons/sort_ic.svg'
import Image from 'next/image';
import { IHeaderMovie, movieCategoriesDetails } from "@/models/movie";
import './mobile-header.css';
import SearchMovie from '../SearchMovie';
import ic_close from '@/assets/icons/ic_close.svg'
import { useParams, useRouter } from 'next/navigation';
// import { Button } from '@mui/material';
const MobileHeader: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const params = useParams()
    const router = useRouter()
    const [active, setActive] = useState<number>(!params?.id ? 0 : Number(params?.id));

    const handleNavigate = (detail?: IHeaderMovie) => {
        if (!!detail) {
            router.push(`/category/${detail.id}`)
            setActive(detail.id)
            toggleDropdown()
        }
        else {
            router.push('/')
            setActive(0)
            toggleDropdown()
        }

    }
    const toggleDropdown = () => {
        if (isDropdownOpen) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsDropdownOpen(false);
                setIsAnimating(false);
            }, 100);
        } else {
            setIsDropdownOpen(true);
        }
    };
    return (
        <>
            <div className='flex justify-between gap-6 p-4 bg-mobile-header'>
                <div className='relative w-[100px] h-10 object-fill'>
                    <Image src={logo} alt='logo' fill />
                </div>
                <div className='flex items-center justify-end flex-1 gap-3'>
                    <SearchMovie />
                    <div className='relative w-10 h-10 cursor-pointer' onClick={toggleDropdown}>
                        <Image src={sort_ic} alt='sort_ic' fill />
                    </div>
                </div>
            </div>
            <div
                className={`absolute top-[70px] right-0 left-0 bg-submenu-header  overflow-hidden transition-all duration-300 ${isDropdownOpen
                    ? 'min-h-[700px] opacity-100 animate-slide-down'
                    : isAnimating
                        ? 'max-h-0 opacity-0 animate-slide-up'
                        : 'max-h-0 opacity-0'
                    }`}
                style={{
                    minHeight: isDropdownOpen ? '700px' : '0px',
                }}
            >
                <Image src={ic_close} alt='ic_close' width={20} height={20} onClick={toggleDropdown} className='absolute right-4 top-6' />
                <ul className='flex flex-col gap-8 py-2 text-white my-7'>
                    <div className={`relative w-full text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-yellow-500 ${active === 0 ? 'text-[#5176FF]' : 'text-white'}`} onClick={() => handleNavigate()}>
                        <span className='px-4'>HOME</span>
                        <div className='absolute -bottom-2 border-b border-[#2F4159] border-solid border-[1px] w-full' />
                    </div>
                    {Object.values(movieCategoriesDetails).map((detail) => {
                        return (
                            <div key={detail.id} className='relative w-full'>
                                <div onClick={() => handleNavigate(detail)}
                                    className={`text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-yellow-500 ${active === detail.id ? 'text-[#5176FF]' : 'text-white'}`}>
                                    <span className='px-4'> {detail.title}</span>
                                </div>
                                <div className='absolute -bottom-2 border-b border-[#2F4159] border-solid border-[1px] w-full' />
                            </div>
                        )
                    })}
                </ul>
                {/* <div className='px-4 flex gap-[5px] mt-10 items-center'>
                    <Button sx={{
                        height: "40px",
                        width: "110px",
                        background: "#4C3D59",
                        color: "white",
                        borderRadius: "5px",
                        marginTop: "1px"
                    }}>
                        로그인
                    </Button>
                    <Button sx={{
                        height: "40px",
                        width: "110px",
                        background: "#5176FF",
                        color: "white",
                        borderRadius: "5px",
                        marginTop: "1px"
                    }}>
                        가입
                    </Button>
                </div> */}
            </div>

        </>
    );
};



export default MobileHeader;