import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useRouter } from "next/navigation"; 

const SearchBar = () => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');

    const searchValue = () => { 
        router.push(`/search/${inputValue}`)
    }

    return (
        <div>
            <Paper
                component="form"
                sx={{ 
                    p: '2px 2px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: 400 
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="검색어 입력"
                    inputProps={{ 'aria-label': '검색어 입력' }}
                    size="small"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" size="small" onClick={searchValue}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    )
}


export default SearchBar;