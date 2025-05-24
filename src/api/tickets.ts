import api from './client';

export const getTickets = async () => {
  const response = await api.get('/api/tickets/');
  return response.data;
};

export interface CreateTicketPayload {
  title: string;
  client: string; // UUID of the client
  employees?: string[]; // Optional UUIDs
  status?: string | null;
}

export const createTicket = async (payload: CreateTicketPayload) => {
  const response = await api.post('/api/tickets/', payload);
  return response.data;
};
