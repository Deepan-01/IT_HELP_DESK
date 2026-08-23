import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const RaiseIssue = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [priority, setPriority] = useState('Low');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/issues', {
        title,
        category,
        priority,
        description
      });
      
      setSuccess(true);
      setTicketId(response.data.ticketId);
      
      // Reset form
      setTitle('');
      setCategory('Hardware');
      setPriority('Low');
      setDescription('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="navbar" style={{ marginBottom: '2rem', borderRadius: '0.5rem' }}>
          <h1>IT Help Desk</h1>
          <div className="nav-links">
            <Link to="/user-dashboard" className="nav-link">Dashboard</Link>
            <Link to="/my-issues" className="nav-link">My Issues</Link>
          </div>
        </div>

        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Raise New Issue</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          {success && (
            <div style={{ backgroundColor: '#dcfce7', color: 'var(--status-resolved)', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1.5rem', fontWeight: '500' }}>
              Your issue has been submitted successfully. Ticket ID: <strong>{ticketId}</strong>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Issue Title</label>
              <input 
                type="text" 
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Brief summary of the issue"
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Network">Network</option>
                  <option value="Wi-Fi">Wi-Fi</option>
                  <option value="Printer">Printer</option>
                  <option value="Login Problem">Login Problem</option>
                  <option value="Internet">Internet</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Priority</label>
                <select 
                  className="form-control"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea 
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Detailed description of your problem..."
                rows="5"
              ></textarea>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Issue'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/user-dashboard')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RaiseIssue;
