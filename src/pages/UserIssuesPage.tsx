import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import React from 'react';

interface UserIssuesPageProps {
  user: { name?: string; email: string } | null;
}

interface Issue {
  id: number;
  description: string;
  status: string;
  createdAt: string;
}

const UserIssuesPage: React.FC<UserIssuesPageProps> = ({ user }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`/api/issues?user=${encodeURIComponent(user?.email || '')}`);
        setIssues(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.log(err)
        setError('Nie udało się pobrać zgłoszeń.');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchIssues();
  }, [user]);

  if (!user) {
    return <Alert severity="warning">Musisz być zalogowany, aby przeglądać swoje zgłoszenia.</Alert>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Twoje zgłoszenia
      </Typography>
      {issues.length === 0 ? (
        <Typography variant="body1">Nie masz jeszcze żadnych zgłoszeń.</Typography>
      ) : (
        <List>
          {issues.map((issue) => (
            <ListItem key={issue.id} divider>
              <ListItemText
                primary={issue.description}
                secondary={`Status: ${issue.status} | Data zgłoszenia: ${new Date(issue.createdAt).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default UserIssuesPage;
