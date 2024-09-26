import React from 'react';
import notfound from '@/assets/images/notfound.jpg'
import Image from 'next/image';
const NotFound: React.FC = () => {
    return (
        <div className='relative w-full h-[500px] object-cover col-span-full'>
            <Image src={notfound} alt='notfound' fill/>
        </div>
    );
};

export default NotFound;