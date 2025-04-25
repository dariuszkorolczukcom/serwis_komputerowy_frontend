import { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import React from 'react';

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Wszystkie pola są wymagane.');
      return;
    }
    onRegister(name, email, password);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Rejestracja
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField 
          fullWidth 
          margin="normal" 
          label="Imię i nazwisko" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
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
          Zarejestruj
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
