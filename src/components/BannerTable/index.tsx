"use client"

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BannerType } from '@/models/ad';
import Image from 'next/image';
import { Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDeleteBannerMutation } from '@/services/bannerService';

const BannerTable = ({banners, refetch}: {banners: BannerType[], refetch: () => void}) => {

    const server = process.env.NEXT_PUBLIC_API_URL

    const [deleteBanner] = useDeleteBannerMutation()
    const toDelete = async (id: string) => {
        await deleteBanner(id)
        refetch()
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell className='text-center'>Banner</TableCell>
                        <TableCell className='text-center'>Shopname</TableCell>
                        <TableCell className='text-center'>URL</TableCell>
                        <TableCell className='text-center'>Added at</TableCell>
                        <TableCell className='text-center'>Expired date</TableCell>
                        <TableCell className='text-center'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {banners.map((banner) => (
                    <TableRow
                        key={banner._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Image src={`${server}${banner.image}`} width={100} height={100} alt='' />
                        </TableCell>
                        <TableCell align="left">
                            <TextField size='small' className='w-full' label='Shop name' id='shop_name' value={banner.shop_name} />
                        </TableCell>
                        <TableCell align="left">
                            <TextField size='small' className='w-full' label='URL' id='url' value={banner.url} />
                        </TableCell>
                        <TableCell align="left">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label={'Time added'}
                                    className='w-full'
                                    value={dayjs(banner.add_time)}
                                    // onChange={(newValue) => setFromDate(newValue)}
                                />
                            </LocalizationProvider>
                        </TableCell>
                        <TableCell align="left">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label={'Finish at'}
                                    className='w-full'
                                    value={dayjs(banner.until)}
                                    // onChange={(newValue) => setFromDate(newValue)}
                                />
                            </LocalizationProvider>
                        </TableCell>
                        <TableCell align="center">
                            <div className='flex gap-1'>
                                <Button variant='outlined' disabled color='warning'>Edit</Button>
                                <Button variant='contained' color='error' onClick={() => toDelete(`${banner._id}`)}>Delete</Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BannerTable;