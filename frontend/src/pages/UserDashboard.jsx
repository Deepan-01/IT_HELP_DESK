import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/user-login');
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="navbar" style={{ marginBottom: '2rem', borderRadius: '0.5rem' }}>
          <h1>IT Help Desk</h1>
          <div className="nav-links" style={{ alignItems: 'center' }}>
            <span style={{ fontWeight: '500' }}>Hello, {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
          </div>
        </div>

        <div className="card" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
            Welcome to IT Help Desk
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
            How can we help you today?
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/raise-issue" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Raise an Issue
            </Link>
            <Link to="/my-issues" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', border: '1px solid var(--border-color)' }}>
              My Issues
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
