import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/token';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-lg">MERN Todo</Link>
      <div className="space-x-4">
        <button onClick={handleLogout} className="hover:underline">Logout</button>
      </div>
    </nav>
  );
}
