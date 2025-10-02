import React from 'react';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import type { LayoutConfig } from '../routes/types';


type AppLayoutProps = {
  config?: LayoutConfig;
  children: React.ReactNode;
};

const drawerWidth = 220;

const AppLayout: React.FC<AppLayoutProps> = ({ config, children }) => (
  <Box
    sx={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}
  >
    {config?.navbar && (
      <Navbar drawerWidth={drawerWidth} />
    )}
    <Box
      component="div"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        p: 0,
        m: 0,
        overflow: 'hidden',
      }}
    >
      {/* {config?.toolbar && <Toolbar />} */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 0,
          m: 0,
          height: '100%',
          width: '100%',
          overflow: 'auto',
          pb: { xs: '56px', md: 0 }, // Padding bottom em mobile para a bottom nav
        }}
      >
        {children}
      </Box>
      {/* {config?.footer && <Footer />} */}
    </Box>
  </Box>
);

export default AppLayout;
