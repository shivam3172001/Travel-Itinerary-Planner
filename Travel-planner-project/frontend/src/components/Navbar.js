import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      backgroundColor: '#2c3e50', 
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ 
          fontSize: '1.8rem', 
          fontWeight: 'bold', 
          textDecoration: 'none',
          color: '#3498db'
        }}>
          ✈️ Travel Planner
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                transition: 'background-color 0.3s'
              }}>
                Dashboard
              </Link>
              <Link to="/itineraries" style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                transition: 'background-color 0.3s'
              }}>
                Itineraries
              </Link>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginLeft: '1rem',
                paddingLeft: '1rem',
                borderLeft: '1px solid #34495e'
              }}>
                <span style={{ color: '#ecf0f1' }}>Hello, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}>
                Login
              </Link>
              <Link to="/register" style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;