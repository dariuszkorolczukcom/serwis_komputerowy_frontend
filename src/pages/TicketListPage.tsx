import React, { useEffect, useState } from 'react';
import { usePDF } from 'react-to-pdf';

import {
  getTickets,
  deleteTicket,
  editTicket,
  addTicketEvent,
  getEventTypes,
  getTicketEvents
} from '../api/tickets';
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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


const TicketListPage: React.FC<{ user: User | null; isStaff: boolean }> = ({ user, isStaff }) => {
     const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  console.log(user)
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editedTitles, setEditedTitles] = useState<Record<string, string>>({});
  const [eventTypes, setEventTypes] = useState< { slug: string; name: string; internal: boolean }[]>([]);
  const [eventForms, setEventForms] = useState<Record<string, {
    slug: string; type: string; description: string 
}>>({});

  const fetchTickets = async () => {
    try {
      const data: { results: Ticket[] } = await getTickets();
      const ticketsWithEvents: Ticket[] = await Promise.all(
        data.results.map(async (ticket) => {
          const ticketEvents = await getTicketEvents(ticket.uuid);
          console.log("getTicketEvents", JSON.stringify(ticketEvents));
          return {
            ...ticket,
            events: ticketEvents.events || [],
          };
        })
      );
      setTickets(ticketsWithEvents);
    } catch (error) {
      console.error('Błąd pobierania ticketów:', error);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const data = await getEventTypes();
      setEventTypes(data);
    } catch (error) {
      console.error('Błąd pobierania typów zdarzeń:', error);
    }
  };

  useEffect(() => {
    fetchEventTypes();
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
      await editTicket(uuid, { title: newTitle });
      await addTicketEvent(uuid, {
        type: 'new',
        date: new Date().toISOString(),
        description: 'Tytuł zgłoszenia został zmieniony.',
      });
      await fetchTickets();
    } catch (error) {
      console.error("Błąd edycji zgłoszenia lub dodawania zdarzenia:", error);
    }
  };

  const handleAddEvent = async (uuid: string) => {
    console.log("handleAddEvent", uuid, eventForms[uuid]);
    const event = eventForms[uuid];
    if (!event || !event.type || !event.description.trim()) return;

    try {
      await addTicketEvent(uuid, {
        type: event.type,
        date: new Date().toISOString(),
        description: event.description,
      });
      setEventForms((prev) => ({ ...prev, [uuid]: { slug: '', type: '', description: '' } }));
      await fetchTickets();
    } catch (error) {
      console.error("Błąd dodawania zdarzenia:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista zgłoszeń
      </Typography>
      <Grid container spacing={2}>
        {tickets.map((ticket) => (
          
          <Grid ref={targetRef} size={{xs:12, md:6}} key={ticket.uuid}>
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
                {/* Wyświetlanie historii zdarzeń */}
                {ticket.events && ticket.events.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Historia zdarzeń:
                    </Typography>
                    {ticket.events.map((event) => (
                      <Box key={event.uuid} sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(event.date).toLocaleString()}
                        </Typography>
                        <Typography variant="body1">
                          {event.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
                
                <Chip
                  sx={{ mt: 2 }}
                        color="secondary" onClick={() => toPDF()}label="Download PDF"
                        />

                {isStaff && (
                  <>
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

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Dodaj zdarzenie
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 1 }}>
                        <InputLabel>Typ zdarzenia</InputLabel>
                        <Select
                          value={eventForms[ticket.uuid]?.type || ''}
                          label="Typ zdarzenia"
                          onChange={(e) =>
                            setEventForms((prev) => ({
                              ...prev,
                              [ticket.uuid]: {
                                ...prev[ticket.uuid],
                                type: e.target.value,
                              },
                            }))
                          }
                        >
                          {eventTypes.map((et) => (!et.internal) && (
                            <MenuItem key={et.slug} value={et.slug}>
                              {et.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        label="Opis zdarzenia"
                        fullWidth
                        multiline
                        minRows={2}
                        value={eventForms[ticket.uuid]?.description || ''}
                        onChange={(e) =>
                          setEventForms((prev) => ({
                            ...prev,
                            [ticket.uuid]: {
                              ...prev[ticket.uuid],
                              description: e.target.value,
                            },
                          }))
                        }
                        sx={{ mb: 1 }}
                      />
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleAddEvent(ticket.uuid)}
                        disabled={
                          !eventForms[ticket.uuid]?.type ||
                          !eventForms[ticket.uuid]?.description?.trim()
                        }
                      >
                        Dodaj zdarzenie
                      </Button>
                    </Box>
                  </>
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
