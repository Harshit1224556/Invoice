import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import PrintInvoice from './pages/PrintInvoice';

import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

const AdminRoute = ({ children, user }) => {
  if (!user) return <Navigate to="/login" />;
  if (!user.isAdmin) return <Navigate to="/dashboard" />;
  return children;
};

const AppRoutes = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {user && <Header user={user} onLogout={logout} />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route path="/invoice/:id/print" element={<PrintInvoice />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
