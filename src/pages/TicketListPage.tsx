import React, { useEffect, useState } from 'react';
import { getTickets, deleteTicket, editTicket, addTicketEvent } from '../api/tickets';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import User from '../types/user';

interface Ticket {
  title: string;
  uuid: string;
  created_at: string;
  status: string;
}

const statusColors: Record<string, "default" | "primary" | "success" | "warning" | "error"> = {
  new: 'primary',
  closed: 'success',
  in_progress: 'warning',
  priced: 'warning',
  withdrawn: 'default',
  answered: 'primary',
};

const TicketListPage: React.FC<{ user: User | null, isStaff: boolean }> = ({ user, isStaff }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editedTitles, setEditedTitles] = useState<Record<string, string>>({});

  const fetchTickets = async () => {
    try {
      const data: { results: Ticket[] } = await getTickets();
      setTickets(data.results);
    } catch (error) {
      console.error('Błąd pobierania ticketów:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (uuid: string) => {
    try {
      await deleteTicket(uuid);
      await fetchTickets();
    } catch (error) {
      console.error("Błąd usuwania zgłoszenia:", error);
    }
  };

const handleEdit = async (uuid: string) => {
  const newTitle = editedTitles[uuid];
  if (!newTitle || !newTitle.trim()) return;

  try {
    await editTicket(uuid, { title: newTitle, client: user?.uuid });

    await addTicketEvent(uuid, {
      type: 'new',
      date: new Date().toISOString(),
      description: 'Tytuł zgłoszenia został zmieniony.'
    });

    await fetchTickets();
  } catch (error) {
    console.error("Błąd edycji zgłoszenia lub dodawania zdarzenia:", error);
  }
};

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista zgłoszeń
      </Typography>
      <Grid container spacing={2}>
        {tickets.map((ticket) => (
          <Grid size={{xs:12, md:6}} key={ticket.uuid}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                {isStaff ? (
                  <TextField
                    label="Tytuł"
                    variant="outlined"
                    fullWidth
                    defaultValue={ticket.title}
                    onChange={(e) =>
                      setEditedTitles((prev) => ({
                        ...prev,
                        [ticket.uuid]: e.target.value,
                      }))
                    }
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography variant="h6">{ticket.title}</Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  ID: {ticket.uuid}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data utworzenia: {new Date(ticket.created_at).toLocaleString()}
                </Typography>

                <Chip
                  label={ticket.status.toUpperCase()}
                  color={statusColors[ticket.status] || 'default'}
                  sx={{ mt: 2 }}
                />

                {isStaff && (
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(ticket.uuid)}
                      disabled={!editedTitles[ticket.uuid]}
                    >
                      Edytuj
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(ticket.uuid)}
                    >
                      Usuń
                    </Button>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TicketListPage;
