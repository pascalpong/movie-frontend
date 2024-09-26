"use client"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { Button, Typography } from '@mui/material';
import { MovieType } from '@/models';
import { useRouter } from 'next/navigation';
import { encodeData } from '@/utils/utils';


const SortingTable = ({HeadCell, data}: {HeadCell: string[], data: MovieType[]}) => {

  const router = useRouter()
  const seeDetails = (title_id: string, title: string) => {
    const encode = encodeData({title_id, title});
    router.push(`/admin/movies/${encode}`)
  }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {HeadCell.map((head, index) => (
                  <TableCell key={index} 
                    sx={{
                        textAlign:'center'
                    }}
                  >{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {HeadCell.map((head) => (
                  <TableCell align="left" key={head}>
                    {head === 'image' ? (
                      <div className='w-full flex justify-center'>
                        <Image src={row[head] ?? ""} alt='' 
                            width={100}
                            height={100}
                        />
                      </div>
                    ) : head === '' ? (
                      <div className='flex justify-between gap-2'>
                        <Button variant='outlined' onClick={() => seeDetails(`${row.title_id}`, row.title)}>Details</Button>
                      </div>
                    ) : ( 
                      <Typography variant='body1'>
                        {row[head as keyof MovieType]}
                      </Typography>
                    )
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default SortingTable;