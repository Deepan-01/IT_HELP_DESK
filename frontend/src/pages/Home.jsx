import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '800px', width: '100%', padding: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>
          IT Help Desk Management System
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '2.5rem' }}>
          Report your IT issues and get them resolved quickly.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link to="/user-login" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            User Login
          </Link>
          <Link to="/admin-login" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem', border: '1px solid var(--border-color)' }}>
            Admin / Solver Login
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
          <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--border-color)' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Raise an Issue</h3>
            <p style={{ color: 'var(--text-light)' }}>Submit your IT problem easily with our simple form.</p>
          </div>
          <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--border-color)' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Track Your Issue</h3>
            <p style={{ color: 'var(--text-light)' }}>Check your ticket status anytime from your dashboard.</p>
          </div>
          <div className="card" style={{ boxShadow: 'none', border: '1px solid var(--border-color)' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Get Support</h3>
            <p style={{ color: 'var(--text-light)' }}>IT support staff can view and resolve your issue efficiently.</p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <p>Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
