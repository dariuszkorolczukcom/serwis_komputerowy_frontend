import { useState } from 'react';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import React from 'react';
import { login, getUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Dispatch, SetStateAction } from 'react';
import User from '../types/user';

interface LoginPageProps {
  setUser: Dispatch<SetStateAction<User | null>>;
}

function LoginPage({ setUser }: LoginPageProps) {
  const navigate = useNavigate();
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
      setError("");
      const decoded = jwtDecode(data.access);
      console.log("decoded JWT",decoded);
      const user = await getUser()
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Stored user:', user);
      setUser(user);
      navigate('/'); 
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