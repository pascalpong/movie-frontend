import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    };

    return (
        <Box display="flex" justifyContent="center" mt={2}>
            <MuiPagination
                count={totalPages}
                page={currentPage}
                variant="outlined"
                onChange={handleChange}
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'white',
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    },
                }}
            />
        </Box>
    );
};

export default Pagination;