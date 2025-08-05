import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <nav className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-lg">
        MERN Todo
      </Link>
      <div className="space-x-4">
        <button onClick={() => setDark(!dark)} className="hover:underline">
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
}
