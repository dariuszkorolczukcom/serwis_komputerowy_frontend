import { Typography, Button, Grid, Box } from '@mui/material';
// import { styled, Theme } from '@mui/material/styles';

import { Link as RouterLink } from 'react-router-dom';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import React from 'react';

interface HomePageProps {
  user: { name?: string; email: string } | null;
  isStaff: boolean;
  isSuperuser: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ user, isStaff, isSuperuser }) => {
  console.log('HomePage user:', user, isStaff, isSuperuser);
  return (
    <>
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Witamy w SerwisApp
      </Typography>
      <Typography variant="h6" component="p" color="textSecondary" gutterBottom>
        Zgłaszaj awarie szybko i łatwo, {user ? 'zarządzaj swoimi zgłoszeniami' : 'zarejestruj konto, aby śledzić zgłoszenia'}.
      </Typography>
      <Box sx={{ my: 3 }}>
        <Button 
          component={RouterLink} 
          to="/add-ticket" 
          variant="contained" 
          color="secondary" 
          size="large" 
          startIcon={<ReportProblemOutlinedIcon />}
        >
          Zgłoś awarię
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Prosty formularz
          </Typography>
          <Typography variant="body1" component="p">
            Wypełnij intuicyjny formularz zgłoszenia awarii, podając najważniejsze informacje.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Szybka reakcja
          </Typography>
          <Typography variant="body1" component="p">
            Nasz zespół natychmiast otrzyma Twoje zgłoszenie i niezwłocznie rozpocznie działania.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Śledzenie statusu
          </Typography>
          <Typography variant="body1" component="p">
            {user 
              ? 'Możesz śledzić status swoich zgłoszeń po zalogowaniu.' 
              : 'Zarejestruj się, aby móc śledzić na bieżąco status zgłoszeń.'
            }
          </Typography>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default HomePage;
