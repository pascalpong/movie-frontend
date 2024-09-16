"use client"

import { useState } from "react";
import { movieCategoriesDetails } from "@/models/movie";
import { Container, Button, Menu, MenuItem } from "@mui/material";
import SearchBar from "../SearchBar";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className="bg-gray-800 text-white py-4 shadow-md fixed w-full z-10">
            <Container>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold transition-transform duration-300 hover:scale-105">
                        New TV 1
                    </h1>
                    <div className="md:hidden">
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                          <div className="flex flex-col space-y-1">
                            <span className="block w-6 h-0.5 bg-white"></span>
                            <span className="block w-6 h-0.5 bg-white"></span>
                            <span className="block w-6 h-0.5 bg-white"></span>
                          </div>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <a href="/">HOME</a>
                            </MenuItem>
                            {Object.values(movieCategoriesDetails).map((detail) => (
                                <MenuItem key={detail.id} onClick={handleClose}>
                                    <a href={`/category/${detail.id}`}>{detail.title}</a>
                                </MenuItem>
                            ))}
                            <SearchBar />
                        </Menu>
                    </div>
                    <nav className="hidden md:flex space-x-4 items-center justify-center flex">
                        <a href="/" className="hover:text-yellow-500 transition-colors duration-300">HOME</a>
                        {Object.values(movieCategoriesDetails).map((detail) => (
                            <a 
                                key={detail.id}
                                href={`/category/${detail.id}`} 
                                className="hover:text-yellow-500 transition-colors duration-300"
                            >
                                {detail.title}
                            </a>
                        ))}
                        <SearchBar />
                    </nav> 
                </div>
            </Container>
        </header>
    );
}

export default Header;