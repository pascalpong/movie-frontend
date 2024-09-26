import React from 'react';

const ContainerDetailMovie = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-[#1A293E] w-full px-4 py-6 rounded-md'>
            {children}
        </div>
    );
};

export default ContainerDetailMovie;