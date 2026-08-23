import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const IssueDetails = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Update state for admins
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');
  const [updating, setUpdating] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && (user.role === 'admin' || user.role === 'solver');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await api.get(`/issues/${id}`);
        setIssue(res.data);
        setStatus(res.data.status);
        setResponse(res.data.response || '');
      } catch (err) {
        setError('Failed to fetch issue details');
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!response.trim() && (status === 'Resolved' || status === 'Closed')) {
      setError('Please provide a resolution/response before resolving the issue.');
      return;
    }

    setUpdating(true);
    setError('');

    try {
      const res = await api.put(`/issues/${id}`, { status, response });
      setIssue(res.data);
      alert('Issue updated successfully!');
    } catch (err) {
      setError('Failed to update issue');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="app-container"><div className="main-content">Loading...</div></div>;
  if (!issue) return <div className="app-container"><div className="main-content">Issue not found.</div></div>;

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="navbar" style={{ marginBottom: '2rem', borderRadius: '0.5rem' }}>
          <h1>IT Help Desk</h1>
          <div className="nav-links">
            <Link to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} className="nav-link">Dashboard</Link>
            {!isAdmin && <Link to="/my-issues" className="nav-link">My Issues</Link>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>Ticket ID: {issue.ticketId}</h2>
              <span className={`badge badge-status-${issue.status.replace(' ', '.')}`} style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>
                {issue.status}
              </span>
            </div>

            {isAdmin && (
              <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                <p><strong>User:</strong> {issue.userId?.name}</p>
                <p><strong>Email:</strong> {issue.userId?.email}</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.2rem' }}>Issue Title</p>
                <p style={{ fontWeight: '500' }}>{issue.title}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.2rem' }}>Created</p>
                <p>{new Date(issue.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.2rem' }}>Category</p>
                <p>{issue.category}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.2rem' }}>Priority</p>
                <span className={`badge badge-priority-${issue.priority}`}>
                  {issue.priority}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Description</p>
              <div style={{ backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '0.375rem', whiteSpace: 'pre-wrap' }}>
                {issue.description}
              </div>
            </div>

            {!isAdmin && issue.response && (
              <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3 style={{ color: 'var(--status-resolved)', marginBottom: '1rem' }}>Admin / Issue Solver Response</h3>
                <div style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
                  <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-dark)' }}>{issue.response}</p>
                  {issue.resolvedAt && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginTop: '1rem' }}>
                      Resolved on: {new Date(issue.resolvedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {isAdmin && (
            <div className="card" style={{ flex: '1 1 300px', alignSelf: 'flex-start' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Update Status</h3>
              
              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Resolution / Response</label>
                  <textarea 
                    className="form-control"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter solution or response..."
                    rows="6"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={updating}>
                  {updating ? 'Updating...' : 'Update Issue'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
