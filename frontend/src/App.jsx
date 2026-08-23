import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RaiseIssue from './pages/RaiseIssue';
import MyIssues from './pages/MyIssues';
import IssueDetails from './pages/IssueDetails';

const ProtectedRoute = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }
  
  if (roleRequired && roleRequired === 'admin' && user.role === 'user') {
    return <Navigate to="/user-dashboard" replace />;
  }
  
  if (roleRequired && roleRequired === 'user' && (user.role === 'admin' || user.role === 'solver')) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        
        {/* User Routes */}
        <Route path="/user-dashboard" element={
          <ProtectedRoute roleRequired="user">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/raise-issue" element={
          <ProtectedRoute roleRequired="user">
            <RaiseIssue />
          </ProtectedRoute>
        } />
        <Route path="/my-issues" element={
          <ProtectedRoute roleRequired="user">
            <MyIssues />
          </ProtectedRoute>
        } />
        
        {/* Admin/Solver Routes */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute roleRequired="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Shared Routes */}
        <Route path="/issue/:id" element={
          <ProtectedRoute>
            <IssueDetails />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
