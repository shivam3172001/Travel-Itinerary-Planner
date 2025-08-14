import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Travel Planner</h1>
      <p>Hello, {user?.name || 'User'}!</p>
      <div style={{ marginTop: '2rem' }}>
        <Link 
          to="/itineraries" 
          style={{ 
            display: 'inline-block', 
            padding: '1rem 2rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '4px' 
          }}
        >
          Manage Itineraries
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;