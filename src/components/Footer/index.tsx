import useBreakpoint from '@/hook/useBreakpoint';
import { IHeaderMovie, movieCategoriesDetails } from '@/models/movie';
import { Container } from '@mui/material';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import logo from '@/assets/logo.png'
const Footer: React.FC = () => {
    const screenSize = useBreakpoint();
    const params = useParams()
    const [active, setActive] = useState<number>(params?.id ? Number(params.id) : 0);
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
        <div className='w-full pt-10 pb-[62px] bg-[#12171E]'>
            <Container>
                <div className='flex flex-col gap-4'>
                    {screenSize === 'desktop' ?
                        <div className='flex items-center gap-9'>
                            <div className={`relative py-4 w-fit text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-white ${active === 0 ? 'text-white' : 'text-[#5176FF]'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b after:border-[#A9BBFF] after:border-solid after:border-[1px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100`} onClick={() => handleNavigate()}>
                                <span>HOME</span>
                            </div>
                            {Object.values(movieCategoriesDetails).map((detail) => {
                                return (
                                    <div key={detail.id} className='relative py-4 w-fit'>
                                        <div onClick={() => handleNavigate(detail)}
                                            className={`text-sm font-semibold transition-colors duration-300 cursor-pointer hover:text-white ${active === detail.id ? 'text-white' : 'text-[#5176FF]'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b after:border-[#A9BBFF] after:border-solid after:border-[1px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100`}>
                                            <span> {detail.title}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div> :
                        <div className='relative w-[100px] h-[40px] object-fill mb-7'>
                            <Image src={logo} alt='logo' fill />
                        </div>
                    }

                    <span className='text-[12px]'>티비몬은 무료 다시보기 서비스입니다</span>
                    <div className='text-[12px]'>티비몬은 링크 제공 사이트입니다. 이 웹 사이트에는 음악, 비디오, 멀티미디어 파일을 저장하지 않습니다. 또한 이 사이트에서 제공 되는 콘텐츠는 링크 된 콘텐츠 이므로 <br />
                        저작권, 적법성, 정확성, 규정 준수 또는 기타 측면에 대해 티비몬은 책임이 없습니다.저작권 등 법적 문제가 있는 경우 적절한 미디어 파일 소유자 또는 호스팅 업체에 문의하십시오. <br />
                        연락처 :+93 79 965 4111
                    </div>
                    <span className='text-[12px]'>Copyright © 티비몬 All right reserved.</span>
                </div>
            </Container>
        </div>
    );
};

export default Footer;