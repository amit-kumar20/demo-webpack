import React, { useEffect, useState } from 'react';
import './MyTickets.css';

type Ticket = {
  id: number;
  title: string;
  category: string;
  status: 'Open' | 'Closed' | 'Pending';
  program: string;
  createdAt: string;
};

const MyTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState({
    category: '',
    status: '',
    program: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('myTickets');
    if (stored) {
      setTickets(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleDelete = (id: number) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem('myTickets', JSON.stringify(updatedTickets));
  };

  const filteredTickets = tickets.filter((ticket) => {
    return (
      (filter.category === '' || ticket.category === filter.category) &&
      (filter.status === '' || ticket.status === filter.status) &&
      (filter.program === '' || ticket.program === filter.program)
    );
  });

  return (
    <div className="tickets-container">
      <h2>My Tickets</h2>

      <div className="filters">
        <select name="category" onChange={handleChange} value={filter.category}>
          <option value="">All Categories</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Network">Network</option>
        </select>

        <select name="status" onChange={handleChange} value={filter.status}>
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Pending">Pending</option>
        </select>

        <select name="program" onChange={handleChange} value={filter.program}>
          <option value="">All Programs</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
          <option value="Telecom">Telecom</option>
        </select>
      </div>

      <table className="tickets-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Program</th>
            <th>Created At</th>
            <th>Action</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.category}</td>
                <td>{ticket.status}</td>
                <td>{ticket.program}</td>
                <td>{ticket.createdAt}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center' }}>
                No tickets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyTickets;
