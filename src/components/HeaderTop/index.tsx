import { Button, Container } from '@mui/material';
import React from 'react';
import './header-top.css'
import Image from 'next/image';
import logo from '@/assets/logo.png'
import SearchMovie from '../SearchMovie';
import ModalLogin from '../ModalLogin';
import { useRouter } from 'next/navigation';
import LogoutButton from '../LogoutButton';

const HeaderTop: React.FC = () => {
    const router = useRouter()
    const [openLogin, setOpenLogin] = React.useState(false);
    const handleCloseLogin = () => {
        setOpenLogin(false);
    };
    const handleOpenLogin = () => {
        setOpenLogin(true);
    };
    const accessToken = localStorage.getItem('accessToken');

    return (
        <>
            <div className='flex flex-col justify-center bg-header-top h-[79px]'>
                <Container>
                    <div className='flex justify-between gap-4'>
                        <div className='flex gap-[72px] items-center w-[70%]'>
                            <div className='relative w-[151px] h-[64px] object-fill cursor-pointer'>
                                <Image src={logo} alt='logo' fill onClick={() => router.push('/')}/>
                            </div>
                            <SearchMovie />
                        </div>
                        
                        <div className='flex gap-[5px] items-center w-[30%] justify-end'>
                            {accessToken ? (
                                <LogoutButton/>
                            ) : (
                                <>
                                    <Button
                                        onClick={handleOpenLogin}
                                        sx={{
                                            height: "40px",
                                            width: "110px",
                                            background: "#4C3D59",
                                            color: "white",
                                            borderRadius: "5px",
                                            marginTop: "1px",
                                            boxShadow: '0px 2px 5px 0px #1D1327'
                                        }}>
                                        로그인
                                    </Button>
                                    <Button sx={{
                                        height: "40px",
                                        width: "110px",
                                        background: "#5176FF",
                                        color: "white",
                                        borderRadius: "5px",
                                        marginTop: "1px",
                                        boxShadow: '0px 2px 5px 0px #1D1327'
                                    }}>
                                        가입
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
            <ModalLogin
                handleClose={handleCloseLogin}
                open={openLogin}
            />
        </>
    );
};
export default HeaderTop;