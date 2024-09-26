"use client"

import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { getAccessToken } from '@/utils/utils';
import { Box, Toolbar } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {

    const drawerWidth = '200px';
    const [mobileOpen, setMobilOpen] = useState<boolean>(false)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const handleDrawerToggle = () => {
        setMobilOpen(!mobileOpen);
    };


    const accessToken = getAccessToken();
    useEffect(() => {
        if (accessToken) {
            setLoggedIn(true)
        }
    }, [accessToken])

    return (
        <div>
            {loggedIn ?
                <>
                    <AdminSidebar
                        drawerWidth={drawerWidth}
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                    />
                    <AdminNavbar handleDrawerToggle={handleDrawerToggle} />
                </>
                : <></>
            }
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: {
                        paddingLeft: drawerWidth
                    }
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </div>
    );
};

export default AdminLayout;