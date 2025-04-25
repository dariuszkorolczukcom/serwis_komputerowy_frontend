import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Alert, Box } from '@mui/material';
import React from 'react';

interface ReportIssuePageProps {
  user: { name?: string; email: string } | null;
}

const ReportIssuePage: React.FC<ReportIssuePageProps> = ({ user }) => {
  // Stan dla pól formularza, inicjalizowany danymi użytkownika jeśli dostępne
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    if (!name.trim() || !email.trim() || !description.trim()) {
      setError('Proszę wypełnić wszystkie pola formularza.');
      return;
    }
    try {
      await axios.post('/api/issues', { name, email, description });
      setSuccessMessage('Zgłoszenie zostało wysłane pomyślnie.');
      setName(user?.name || '');
      setEmail(user?.email || '');
      setDescription('');
    } catch (err) {
      console.error(err);
      setError('Wystąpił błąd podczas wysyłania zgłoszenia.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Formularz zgłoszenia awarii
      </Typography>
      <Typography variant="body1" paragraph>
        Opisz napotkany problem. Skontaktujemy się z Tobą na podany adres e-mail.
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
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
          label="Adres e-mail" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <TextField 
          fullWidth 
          margin="normal" 
          label="Opis awarii" 
          multiline 
          minRows={4} 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          required 
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Wyślij zgłoszenie
        </Button>
      </Box>
    </Box>
  );
};

export default ReportIssuePage;