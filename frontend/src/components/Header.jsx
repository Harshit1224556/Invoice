import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/') }>
          <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">₹</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Invoice Manager</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right">
            <p className="text-white font-semibold">{user?.name}</p>
            <p className="text-gray-300 text-sm">{user?.email}</p>
          </div>
          
          {user?.isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="bg-purple-500/80 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transform hover:scale-105 transition-all duration-300 text-sm"
            >
              Admin Panel
            </button>
          )}
          
          <button
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
