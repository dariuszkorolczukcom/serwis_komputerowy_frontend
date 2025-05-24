import { Outlet, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import React from 'react';
import User from '../types/user';
interface LayoutProps {
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user , onLogout }) => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            SerwisApp
          </Typography>
          {user ? (
            <>
              <Button 
                component={RouterLink} 
                to="/add-ticket" 
                color="inherit" 
                startIcon={<ReportProblemOutlinedIcon />}
              >
                Zgłoś awarię
              </Button>
              <Typography variant="body1" sx={{ mx: 2 }}>
                Witaj, {user ? (user.username ? user.username : user.email) : 'Gość'}!
              </Typography>
              <Button component={RouterLink} to="/tickets" color="inherit">
                Twoje Zgłoszenia
              </Button>
              <Button color="inherit" onClick={onLogout}>
                Wyloguj
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                Zaloguj
              </Button>
              <Button component={RouterLink} to="/register" color="inherit">
                Zarejestruj
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ py: 3 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ bgcolor: 'grey.200', py: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
         Dariusz Korolczuk | Adrian Mogielnicki | Bartosz Regucki © 2025 SerwisApp
        </Typography>
      </Box>
    </>
  );
};

export default Layout;