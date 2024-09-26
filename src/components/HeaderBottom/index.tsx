"use client"
import { Container } from '@mui/material';
import React, { useState } from 'react';
import { IHeaderMovie, movieCategoriesDetails } from "@/models/movie";
import { useParams, useRouter } from 'next/navigation';



const HeaderBottom: React.FC = () => {
    const params = useParams()
    const [active, setActive] = useState<number>(!params?.id ? 0 : Number(params?.id));
    const router = useRouter()
    const handleNavigate = (detail?: IHeaderMovie) => {
        if (!!detail) {
            router.push(`/category/${detail.id}`)
            setActive(detail.id)
        }
        else {
            router.push('/')
            setActive(0)
        }
    }

    return (
        <div className='flex flex-col bg-[#151E29] items-center'>
            <Container>
                <div className='flex items-center gap-9'>
                    <div
                        className={`relative py-4 w-fit text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-[#5176FF] ${active === 0 ? 'text-[#5176FF]' : 'text-white'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b after:border-[#A9BBFF] after:border-solid after:border-[1px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100`}
                        onClick={() => handleNavigate()}
                    >
                        <span>HOME</span>
                        {active === 0 && <div className='absolute bottom-0 border-b border-[#A9BBFF] border-solid border-[1px] w-full'></div>}
                    </div>
                    {Object.values(movieCategoriesDetails).map((detail) => {
                        return (
                            <div key={detail.id} className='relative w-fit'>
                                <div onClick={() => handleNavigate(detail)}
                                    className={`relative py-4 w-fit text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-[#5176FF] ${active === detail.id ? 'text-[#5176FF]' : 'text-white'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b after:border-[#A9BBFF] after:border-solid after:border-[1px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100`}

                                >
                                    <span> {detail.title}</span>
                                    {active === detail.id && <div className='absolute bottom-0 border-b border-[#A9BBFF] border-solid border-[1px] w-full'></div>}
                                </div>

                            </div>
                        )
                    })}

                </div>
            </Container>
        </div>
    );
};

export default HeaderBottom;