import React from 'react';
import { Skeleton as MuiSkeleton, } from "@mui/material";
const CustomSkeleton = ({ height }: { height?: string }) => {
    return (
        <div className='flex flex-col gap-1'>
            <MuiSkeleton variant="rectangular" animation="wave" sx={{
                width: "100%",
                height: height ? height : "300px",
                bgcolor: 'grey.900',
                borderRadius: "8px",


            }} />
            <MuiSkeleton animation="wave" variant="text" sx={{ fontSize: '1rem', bgcolor: 'grey.900' }} />
        </div>

    );
};

export default CustomSkeleton;