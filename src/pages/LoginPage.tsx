import { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import React from 'react';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Proszę wypełnić oba pola.');
      return;
    }
    onLogin(email);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Logowanie
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField 
          fullWidth 
          margin="normal" 
          type="email" 
          label="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
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