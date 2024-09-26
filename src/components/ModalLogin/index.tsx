import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import logo from '@/assets/logo.png'
import Image from 'next/image';
import ic_close from '@/assets/icons/ic_close.svg'
import LoginForm from '../LoginForm';
const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#2C3339',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: "81px",
};

const ModalLogin = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <>
                    <div className='absolute z-30 -translate-x-1/2 left-1/2 top-20'>
                        <div className='relative w-[223px] h-[93px] object-fill'>
                            <Image src={logo} alt='logo' fill />
                        </div>
                    </div>
                    <Box sx={{ ...style, width: 400, borderRadius: "12px" }}>
                        <div className='absolute cursor-pointer top-4 right-4' onClick={handleClose}>
                            <div className='relative w-[20px] h-[20px]'>
                                <Image src={ic_close} alt='ic_close' fill />
                            </div>
                        </div>
                        <div className='mt-[50px] flex flex-col'>
                            <Typography sx={{
                                fontWeight: 700,
                                fontSize: 32,
                                marginBottom: "24px"
                            }}>로그인</Typography>
                            <LoginForm />
                        </div>
                    </Box>
                </>

            </Modal>
        </>
    );
};

export default ModalLogin;