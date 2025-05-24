import React, { useEffect, useState } from 'react';
import { getTickets } from '../api/tickets';
import { Box, Card, CardContent, Typography, Chip, Grid } from '@mui/material';

interface Ticket {
  title: string;
  uuid: string;
  created_at: string;
  status: string;
}

interface TicketListProps {
  tickets: Ticket[];
}

const statusColors: Record<string, "default" | "primary" | "success" | "warning" | "error"> = {
  new: 'primary',
  closed: 'success',
  in_progress: 'warning',
};

const TicketListPage = () => {
  interface Ticket {
    uuid: string;
    title: string;
  }

  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data.results);
      } catch (error) {
        console.error('Błąd pobierania ticketów:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista zgłoszeń
      </Typography>
      <Grid container spacing={2}>
        {tickets.map((ticket) => (
          <Grid item xs={12} md={6} key={ticket.uuid}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {ticket.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {ticket.uuid}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data utworzenia: {new Date(ticket.created_at).toLocaleString()}
                </Typography>
                <Chip
                  label={ticket.status.toUpperCase()}
                  color={statusColors[ticket.status] || 'default'}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TicketListPage;