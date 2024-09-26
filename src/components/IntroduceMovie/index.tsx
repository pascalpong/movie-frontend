import React, { useEffect, useState } from 'react';
import { useGetMoviesQuery } from '@/services/movieService';
import IntroduceMovieDesktop from '../IntroduceMovieDesktop';
import useBreakpoint from '@/hook/useBreakpoint';
import IntroduceMovieMobile from '../IntroduceMovieMobile';
export default function IntroduceMovie() {
    const [introduceHomePage, setIntroduceHomePage] = useState([])
    const dataIntroduceHomePage = useGetMoviesQuery({ page: 1 })
    const screenSize = useBreakpoint();
    useEffect(() => {
        if (dataIntroduceHomePage.status === "fulfilled") {
            setIntroduceHomePage(dataIntroduceHomePage.data.data.data)
        }
    }, [dataIntroduceHomePage])
    return (
        <>
            {screenSize === 'desktop' ? <IntroduceMovieDesktop introduceHomePage={introduceHomePage} /> : <IntroduceMovieMobile introduceHomePage={introduceHomePage} />}

        </>
    );
}