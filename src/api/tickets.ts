import api from './client';

export const getTickets = async () => {
  const response = await api.get('/api/tickets/');
  return response.data;
};

export interface EventType {
  slug: string;
  name: string;
  internal: boolean;
}

export interface Event{
  uuid?: string;
  type: string; 
  date: string; 
  description: string 
}

export interface CreateTicketPayload {
  title: string;
  client: string; // UUID of the client
  employees?: string[]; // Optional UUIDs
  status?: string | null;
}

export interface EditTicketPayload {
  title?: string;
  client?: string; // UUID of the client
}

export const createTicket = async (payload: CreateTicketPayload) => {
  const response = await api.post('/api/tickets/', payload);
  return response.data;
};

export const deleteTicket = async (uuid: string) => {
  const response = await api.delete(`/api/tickets/${uuid}/`);
  console.log("deleteTicket",response.data);
  return response.data;
};

export const editTicket = async (uuid: string, payload: EditTicketPayload) => {
  const response = await api.put(`/api/tickets/${uuid}/`, payload);
  console.log("editTicket",response.data);
  return response.data;
};

export const addTicketEvent = async (
  uuid: string,
  payload: Event
) => {
  const response = await api.post(`/api/tickets/${uuid}/addEvent/`, payload);
  return response.data;
};

export const getEventTypes = async () => {
  const response = await api.get(`/api/tickets/eventTypes/`);
  const eventTypes = response.data.map((event: EventType) => ({slug: event.slug, name: event.name, internal: event.internal}));
  return eventTypes;
};
