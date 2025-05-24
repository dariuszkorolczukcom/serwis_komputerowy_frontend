import React, { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/users/', {
        username: name,
        email,
        password,
        re_password: password,
      });

      if (response.status === 201) {
        setSuccess('Rejestracja zakończona sukcesem. Możesz się teraz zalogować.');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError('Wystąpił nieoczekiwany błąd.');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data;
        if (data.email) {
          setError(`Email: ${data.email.join(' ')}`);
        } else if (data.username) {
          setError(`Nazwa użytkownika: ${data.username.join(' ')}`);
        } else if (data.password) {
          setError(`Hasło: ${data.password.join(' ')}`);
        } else {
          setError('Błąd rejestracji. Spróbuj ponownie.');
        }
      } else {
        setError('Błąd połączenia z serwerem.');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Rejestracja
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          margin="normal"
          label="Nazwa użytkownika"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
