"use client"

import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';


interface AdminSidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: string;
}

const AdminSidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }: AdminSidebarProps) => {
  const router = useRouter();
  const sideMenu = [
    {
      title: 'Set ads',
      path: '/admin'
    }, {
      title: 'Movies',
      path: '/admin/movies'
    }
  ];

  const reDirect = (path: string) => {
    router.push(path)
  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {sideMenu.map((menu, index) => (
          <ListItem key={index}
            sx={{ 
              cursor: 'pointer' 
            }}
            onClick={() => reDirect(menu.path)}
          >
            <ListItemIcon>
              {index === 0 ? <DashboardIcon /> : index === 1 ? <PeopleIcon /> : <SettingsIcon />}
            </ListItemIcon>
            <ListItemText primary={menu.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default AdminSidebar;