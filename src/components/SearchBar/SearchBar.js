import React from 'react'
import { Container, InputAdornment } from '@mui/material'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    return (
        <div className='search'>
            <TextField fullWidth label="search for cryptocurrency" />
        </div>
    )
}
