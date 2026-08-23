import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const MyIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await api.get('/issues/my');
        setIssues(response.data);
      } catch (err) {
        setError('Failed to fetch your issues');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="navbar" style={{ marginBottom: '2rem', borderRadius: '0.5rem' }}>
          <h1>IT Help Desk</h1>
          <div className="nav-links">
            <Link to="/user-dashboard" className="nav-link">Dashboard</Link>
            <Link to="/raise-issue" className="nav-link">Raise Issue</Link>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>My Issues</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <p>Loading your issues...</p>
          ) : issues.length === 0 ? (
            <p style={{ color: 'var(--text-light)' }}>You haven't submitted any issues yet.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Issue Title</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    <tr key={issue._id}>
                      <td style={{ fontWeight: '500' }}>{issue.ticketId}</td>
                      <td>{issue.title}</td>
                      <td>{issue.category}</td>
                      <td>
                        <span className={`badge badge-priority-${issue.priority}`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-status-${issue.status.replace(' ', '.')}`}>
                          {issue.status}
                        </span>
                      </td>
                      <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link to={`/issue/${issue._id}`} className="btn btn-secondary btn-sm" style={{ border: '1px solid var(--border-color)' }}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyIssues;
