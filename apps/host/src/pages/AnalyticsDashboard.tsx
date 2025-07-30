import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import './AnalyticsDashboard.css';

const ticketTrendData = [
  { month: 'Jan', tickets: 30 },
  { month: 'Feb', tickets: 45 },
  { month: 'Mar', tickets: 60 },
  { month: 'Apr', tickets: 50 },
  { month: 'May', tickets: 70 },
  { month: 'Jun', tickets: 90 },
  { month: 'Jul', tickets: 85 },
  { month: 'Aug', tickets: 75 },
  { month: 'Sep', tickets: 65 },
  { month: 'Oct', tickets: 95 },
  { month: 'Nov', tickets: 55 },
  { month: 'Dec', tickets: 80 },
];

const resolutionStats = [
  { status: 'Resolved', count: 75 },
  { status: 'Pending', count: 20 },
  { status: 'Escalated', count: 5 },
];

const categoryData = [
  { name: 'Bug', value: 40 },
  { name: 'Feature Request', value: 30 },
  { name: 'Query', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : ''}`}>
      <div className="dashboard-header">
        <h2>Analytics Dashboard</h2>
        <button
          className="toggle-btn"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? ' Light Mode' : ' Dark Mode'}
        </button>
      </div>

      <div className="chart-section">
        <h3>Ticket Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ticketTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke={darkMode ? '#fff' : '#333'} />
            <YAxis stroke={darkMode ? '#fff' : '#333'} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="tickets"
              stroke="#4b286d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Resolution Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resolutionStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" stroke={darkMode ? '#fff' : '#333'} />
            <YAxis stroke={darkMode ? '#fff' : '#333'} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4b286d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h3>Ticket Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={140}
              dataKey="value"
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
