import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Typography, Alert, CircularProgress, Box, Button } from '@mui/material';
import { activateUser } from '../api/auth'; // zakładamy, że masz taką funkcję API

const ActivateUserPage: React.FC = () => {
    const { uid, token } = useParams<{ uid: string; token: string }>();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const activate = async () => {
      if (!token || !uid) {
        setStatus('error');
        setMessage('Brak tokenu aktywacyjnego lub id uytkownka w adresie URL.');
        return;
      }

      try {
        await activateUser(uid, token);
        setStatus('success');
        setMessage('Twoje konto zostało pomyślnie aktywowane.');
      } catch (error) {
        console.error(error);
        setStatus('error');
        setMessage('Nie udało się aktywować konta. Link mógł wygasnąć lub być nieprawidłowy.');
      }
    };

    activate();
  }, [token, uid]);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Aktywacja konta
      </Typography>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {status !== 'loading' && (
        <>
          <Alert severity={status === 'success' ? 'success' : 'error'} sx={{ mt: 2 }}>
            {message}
          </Alert>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            component={RouterLink}
            to="/login"
          >
            Przejdź do logowania
          </Button>
        </>
      )}
    </Box>
  );
};

export default ActivateUserPage;
