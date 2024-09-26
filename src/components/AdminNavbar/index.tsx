"use client"

import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import LogoutButton from '../LogoutButton';

interface AdminNavbarProps {
  handleDrawerToggle: () => void;
}


const AdminNavbar = ({ handleDrawerToggle }: AdminNavbarProps) => {

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar className='flex justify-between'>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;