import { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import React from 'react';
import { login } from '../api/auth';

const LoginPage: React.FC = () => {
  
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      console.log(data);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      // TODO: Implement your navigation logic here
    } catch (error) {
      console.error('Błąd logowania:', error);
      setError("Niepoprawny email lub hasło");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Logowanie
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleLogin} noValidate>
        <TextField 
          fullWidth 
          margin="normal" 
          type="username" 
          label="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
        />
        <TextField 
          fullWidth 
          margin="normal" 
          type="password" 
          label="Hasło" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Zaloguj
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;