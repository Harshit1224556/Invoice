import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await adminService.getAllUsers();
      setUsers(response.data.users);
    } catch (err) {
      console.error('Error loading users:', err);
      alert('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdmin = async (userId) => {
    try {
      await adminService.toggleAdminStatus(userId);
      loadUsers();
      alert('Admin status updated');
    } catch (err) {
      console.error('Error updating admin status:', err);
      alert('Error updating admin status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user and all their invoices?')) {
      try {
        await adminService.deleteUser(userId);
        loadUsers();
        alert('User deleted successfully');
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Error deleting user');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead className="bg-white/10 border-b border-white/20">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-white/10 hover:bg-white/5 transition">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.company || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isAdmin ? 'bg-purple-500/30 text-purple-200' : 'bg-gray-500/30 text-gray-200'}`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleToggleAdmin(user._id)}
                    className="bg-blue-500/80 hover:bg-blue-600 px-3 py-1 rounded mr-2 text-sm transition"
                  >
                    Toggle Admin
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500/80 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
