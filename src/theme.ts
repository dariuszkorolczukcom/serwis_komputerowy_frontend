import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#772953', 
    },
    secondary: {
      main: '#e95420', 
    },
    background: {
      default: '#f5f5f5', 
      paper: '#ffffff',  
    },
  },
  typography: {
    fontFamily: 'Ubuntu, Arial, sans-serif',
  },
});

export default theme;
