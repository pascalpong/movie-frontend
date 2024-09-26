"use client"

import { Button } from "@mui/material"


const LogoutButton = () => {

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.reload();
    }

    return (
        <Button sx={{color: 'white'}} onClick={handleLogout}>Logout</Button>
    )
}

export default LogoutButton;