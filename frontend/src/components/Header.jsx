import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setShowDropdown(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Invoice Manager</h1>
              <p className="text-purple-300 text-xs">Pro Edition</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {authUser?.isAdmin && (
              <nav className="flex gap-6">
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`text-sm font-semibold transition-all duration-300 pb-2 border-b-2 ${
                    isActive('/dashboard')
                      ? 'text-purple-400 border-purple-400'
                      : 'text-gray-300 border-transparent hover:text-white'
                  }`}
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin')}
                  className={`text-sm font-semibold transition-all duration-300 pb-2 border-b-2 ${
                    isActive('/admin')
                      ? 'text-purple-400 border-purple-400'
                      : 'text-gray-300 border-transparent hover:text-white'
                  }`}
                >
                  🔧 Admin Panel
                </button>
              </nav>
            )}
          </div>

          {/* User Info & Actions */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.isAdmin ? 'Admin' : 'User'}</p>
                  </div>
                  <span className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl overflow-hidden animate-in fade-in">
                    <div className="px-4 py-3 border-b border-purple-500/20 bg-slate-900/50">
                      <p className="text-white font-semibold">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    
                    <div className="p-2 space-y-1">
                      <button
                        onClick={() => {
                          navigate('/dashboard');
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-purple-600/30 hover:text-white rounded transition-all text-sm"
                      >
                        📊 My Dashboard
                      </button>
                      
                      {user.isAdmin && (
                        <button
                          onClick={() => {
                            navigate('/admin');
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-gray-300 hover:bg-purple-600/30 hover:text-white rounded transition-all text-sm"
                        >
                          🔧 Admin Panel
                        </button>
                      )}
                      
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-600/30 hover:text-white rounded transition-all text-sm"
                      >
                        ⚙️ Settings
                      </button>
                      
                      <button
                        onClick={() => setShowDropdown(false)}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-green-600/30 hover:text-white rounded transition-all text-sm"
                      >
                        ❓ Help
                      </button>
                    </div>
                    
                    <div className="p-2 border-t border-purple-500/20">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-200 rounded font-semibold transition-all text-sm"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20 pt-4 space-y-3 animate-in fade-in">
            {authUser?.isAdmin && (
              <>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-purple-600/30 hover:text-white rounded transition-all"
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('/admin');
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-purple-600/30 hover:text-white rounded transition-all"
                >
                  🔧 Admin Panel
                </button>
              </>
            )}
            <button
              onClick={() => {
                setShowMobileMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-600/30 hover:text-white rounded transition-all"
            >
              ⚙️ Settings
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-200 rounded font-semibold transition-all"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
