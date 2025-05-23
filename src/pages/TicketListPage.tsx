import React, { useEffect, useState } from 'react';
import { getTickets } from '../api/tickets';

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
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.uuid}>{ticket.title}</li>
      ))}
    </ul>
  );
};

export default TicketListPage;