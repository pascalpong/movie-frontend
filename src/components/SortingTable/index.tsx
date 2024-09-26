"use client"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { TextField } from '@mui/material';
import { MovieType } from '@/models';


const SortingTable = ({HeadCell, data}: {HeadCell: string[], data: MovieType[]}) => {
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
                        <Image src={row[head] ?? ""} alt='' 
                            width={100}
                            height={100}
                        />
                    ) : ( <TextField multiline={head === 'intro' ? true : false} value={row[head as keyof MovieType]} /> )
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