
import React, { useState } from 'react';
import './Ticket.css';
import { Link, useNavigate } from 'react-router-dom';

const Ticket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workingLocation: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    contact: '',
    callbackNumber: '',
    affectedUser: '',
    workstationNumber: '',
    otherUser: '',
    otherCallback: '',
    program: '',
    siteLocation: '',
    issueDescription: '',
    watchList: '',
    attachments: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tickets = JSON.parse(localStorage.getItem('myTickets') || '[]');
    const newTicket = {
      id: Date.now(),
      title: formData.shortDescription,
      category: formData.category,
      status: 'Open',
      program: formData.program,
      createdAt: new Date().toISOString().split('T')[0],
    };

    localStorage.setItem('myTickets', JSON.stringify([...tickets, newTicket]));
    alert('Ticket submitted successfully!');
    navigate('/ticket/mine');
  };

  return (
    <div className="ticket-container">
      <div className="breadcrumbs">
        <nav>
          <Link to="/" className="breadcrumb-link">Home</Link> &gt;{" "}
          <Link to="/ticket" className="breadcrumb-link">Ticket</Link> &gt;{" "}
          <span className="current-breadcrumb">Submit Request</span>
        </nav>
        <h2>Submit Request</h2>
        <p className="subtitle">How can we help you resolve an issue?</p>
      </div>

      <form onSubmit={handleSubmit} className="ticket-form">
        <label>
          Where are you working?
          <select name="workingLocation" onChange={handleChange} value={formData.workingLocation}>
            <option value="">Select</option>
            <option>In the office</option>
            <option>Work from home</option>
          </select>
        </label>

        <label>
          Short Description *
          <textarea name="shortDescription" required onChange={handleChange} value={formData.shortDescription} />
        </label>

        <label>
          Category *
          <select name="category" required onChange={handleChange} value={formData.category}>
            <option value="">None Selected</option>
            <option>Hardware</option>
            <option>Software</option>
            <option>Network</option>
          </select>
        </label>

        <label>
          Subcategory
          <select name="subcategory" onChange={handleChange} value={formData.subcategory}>
            <option value="">--None--</option>
          </select>
        </label>

        <div className="row">
          <label>
            Contact *
            <input type="text" name="contact" required onChange={handleChange} value={formData.contact} />
          </label>
          <label>
            Callback number
            <input type="text" name="callbackNumber" onChange={handleChange} value={formData.callbackNumber} />
          </label>
        </div>

        <div className="row">
          <label>
            Affected User
            <input type="text" name="affectedUser" onChange={handleChange} value={formData.affectedUser} />
          </label>
          <label>
            Workstation Number *
            <input type="text" name="workstationNumber" required onChange={handleChange} value={formData.workstationNumber} />
          </label>
        </div>

        <div className="row">
          <label>
            Other User
            <input type="text" name="otherUser" onChange={handleChange} value={formData.otherUser} />
          </label>
          <label>
            Other User Callback Number
            <input type="text" name="otherCallback" onChange={handleChange} value={formData.otherCallback} />
          </label>
        </div>

        <div className="row">
          <label>
            Program (FA) *
            <select name="program" required onChange={handleChange} value={formData.program}>
              <option value="">None selected</option>
              <option>Finance</option>
              <option>HR</option>
              <option>IT</option>
              <option>Telecom</option>
            </select>
          </label>
          <label>
            Site Location
            <select name="siteLocation" onChange={handleChange} value={formData.siteLocation}>
              <option value="">Select location</option>
              <option>Noida</option>
              <option>Bangalore</option>
              <option>USA</option>
              <option>Canada</option>
            </select>
          </label>
        </div>

        <label>
          Description of issue *
          <textarea name="issueDescription" required onChange={handleChange} value={formData.issueDescription} />
        </label>

        <label>
          Watch List
          <input type="text" name="watchList" onChange={handleChange} value={formData.watchList} />
        </label>

        <div className="upload-section">
          <strong>📎 Attachment</strong>
          <label htmlFor="fileUpload" className="upload-box">
            Drag & Drop files here or click to upload
            <input
              type="file"
              id="fileUpload"
              multiple
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  attachments: e.target.files ? Array.from(e.target.files) : [],
                }))
              }
              style={{ display: 'none' }}
            />
          </label>

          {formData.attachments.length > 0 && (
            <ul className="file-list">
              {formData.attachments.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Ticket;
