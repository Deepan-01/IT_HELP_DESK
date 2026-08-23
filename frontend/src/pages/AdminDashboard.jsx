import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await api.get('/issues');
        setIssues(response.data);
      } catch (err) {
        setError('Failed to fetch issues');
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/admin-login');
  };

  // Compute stats
  const stats = useMemo(() => {
    return {
      total: issues.length,
      open: issues.filter(i => i.status === 'Open').length,
      inProgress: issues.filter(i => i.status === 'In Progress').length,
      resolved: issues.filter(i => i.status === 'Resolved').length
    };
  }, [issues]);

  // Filter issues
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const matchSearch = 
        issue.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (issue.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = statusFilter ? issue.status === statusFilter : true;
      const matchPriority = priorityFilter ? issue.priority === priorityFilter : true;
      const matchCategory = categoryFilter ? issue.category === categoryFilter : true;

      return matchSearch && matchStatus && matchPriority && matchCategory;
    });
  }, [issues, searchTerm, statusFilter, priorityFilter, categoryFilter]);

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="navbar" style={{ marginBottom: '2rem', borderRadius: '0.5rem' }}>
          <h1>IT Help Desk - Issue Management</h1>
          <div className="nav-links" style={{ alignItems: 'center' }}>
            <span style={{ fontWeight: '500' }}>Admin: {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="dashboard-stats">
          <div className="card stat-card">
            <h3>{stats.total}</h3>
            <p>Total Issues</p>
          </div>
          <div className="card stat-card" style={{ borderBottom: '4px solid var(--status-open)' }}>
            <h3>{stats.open}</h3>
            <p>Open Issues</p>
          </div>
          <div className="card stat-card" style={{ borderBottom: '4px solid var(--status-progress)' }}>
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
          <div className="card stat-card" style={{ borderBottom: '4px solid var(--status-resolved)' }}>
            <h3>{stats.resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
            <h2 style={{ color: 'var(--primary-color)', flex: 1, margin: 0 }}>All Issues</h2>
            
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by ID, User, or Title..."
              style={{ width: '250px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select className="form-control" style={{ width: '150px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <select className="form-control" style={{ width: '150px' }} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            <select className="form-control" style={{ width: '150px' }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
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
          
          {loading ? (
            <p>Loading issues...</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>User</th>
                    <th>Issue</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssues.length > 0 ? (
                    filteredIssues.map((issue) => (
                      <tr key={issue._id}>
                        <td style={{ fontWeight: '500' }}>{issue.ticketId}</td>
                        <td>{issue.userId?.name || 'Unknown'}</td>
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
                        <td>
                          <Link to={`/issue/${issue._id}`} className="btn btn-primary btn-sm">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                        No issues found matching the criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
