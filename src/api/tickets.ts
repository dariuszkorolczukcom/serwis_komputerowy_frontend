import api from './client';

export const getTickets = async () => {
  const response = await api.get('/api/tickets/');
  return response.data;
};

export const createTicket = async (ticketData: any) => {
  const response = await api.post('/api/tickets/', ticketData);
  return response.data;
};
