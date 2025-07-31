import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MyTickets.css';

type Ticket = {
  id: number;
  title: string;
  category: string;
  status: 'Open' | 'Closed' | 'Pending';
  program: string;
  createdAt: string;
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TICKETS_PER_PAGE = 5;

const MyTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState({ category: '', status: '', program: '' });
  const [modalTicket, setModalTicket] = useState<Ticket | null>(null);
  const [page, setPage] = useState(1);

  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const stored = localStorage.getItem('myTickets');
    if (stored) setTickets(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleDelete = (id: number) => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem('myTickets', JSON.stringify(updatedTickets));
  };

  const exportToCSV = () => {
    const csv = [
      ['ID', 'Title', 'Category', 'Status', 'Program', 'Created At'],
      ...filteredTickets.map(t => [t.id, t.title, t.category, t.status, t.program, t.createdAt])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'my_tickets.csv';
    link.click();
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery) ||
      ticket.category.toLowerCase().includes(searchQuery) ||
      ticket.status.toLowerCase().includes(searchQuery) ||
      ticket.program.toLowerCase().includes(searchQuery);

    return (
      matchesSearch &&
      (filter.category === '' || ticket.category === filter.category) &&
      (filter.status === '' || ticket.status === filter.status) &&
      (filter.program === '' || ticket.program === filter.program)
    );
  });

  const totalPages = Math.ceil(filteredTickets.length / TICKETS_PER_PAGE);
  const paginatedTickets = filteredTickets.slice((page - 1) * TICKETS_PER_PAGE, page * TICKETS_PER_PAGE);

  const countByStatus = (status: 'Open' | 'Closed' | 'Pending') =>
    tickets.filter(ticket => ticket.status === status).length;

  const handleStatusClick = (status: '' | 'Open' | 'Closed' | 'Pending') => {
    setFilter({ ...filter, status });
    setPage(1);
  };

  return (
    <div className="tickets-container">
      <h2>My Tickets</h2>

      <div className="ticket-stats">
        <div className="stat-card" onClick={() => handleStatusClick('')}>
          <p>Total</p>
          <span>{tickets.length}</span>
        </div>
        <div className="stat-card open" onClick={() => handleStatusClick('Open')}>
          <p>Open</p>
          <span>{countByStatus('Open')}</span>
        </div>
        <div className="stat-card closed" onClick={() => handleStatusClick('Closed')}>
          <p>Closed</p>
          <span>{countByStatus('Closed')}</span>
        </div>
        <div className="stat-card pending" onClick={() => handleStatusClick('Pending')}>
          <p>Pending</p>
          <span>{countByStatus('Pending')}</span>
        </div>

        <button className="export-btn" onClick={exportToCSV}>Export to CSV</button>
      </div>

      {searchQuery && (
        <div className="search-info">
          <span>Showing results for: <strong>{searchQuery}</strong></span>
          <button className="clear-search-btn" onClick={() => navigate('/ticket/mine')}>Clear Search</button>
        </div>
      )}

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTickets.length > 0 ? (
            paginatedTickets.map(ticket => (
              <tr key={ticket.id} onClick={() => setModalTicket(ticket)} style={{ cursor: 'pointer' }}>
                <td>{ticket.id}</td>
                <td>{ticket.title}</td>
                <td>{ticket.category}</td>
                <td>{ticket.status}</td>
                <td>{ticket.program}</td>
                <td>{ticket.createdAt}</td>
                <td>
                  <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(ticket.id); }}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center' }}>No tickets found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>

      {modalTicket && (
        <div className="modal-overlay" onClick={() => setModalTicket(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Ticket Details</h3>
            <p><strong>ID:</strong> {modalTicket.id}</p>
            <p><strong>Title:</strong> {modalTicket.title}</p>
            <p><strong>Category:</strong> {modalTicket.category}</p>
            <p><strong>Status:</strong> {modalTicket.status}</p>
            <p><strong>Program:</strong> {modalTicket.program}</p>
            <p><strong>Created At:</strong> {modalTicket.createdAt}</p>
            <button onClick={() => setModalTicket(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
