import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // NO /api here
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (userData) => api.put('/api/auth/profile', userData),
};

export const invoiceService = {
  getInvoices: () => api.get('/api/invoices'),
  getInvoice: (id) => api.get(`/api/invoices/${id}`),
  createInvoice: (invoiceData) => api.post('/api/invoices', invoiceData),
  updateInvoice: (id, invoiceData) => api.put(`/api/invoices/${id}`, invoiceData),
  deleteInvoice: (id) => api.delete(`/api/invoices/${id}`),
  getDashboardStats: () => api.get('/api/invoices/stats'),
};

export const adminService = {
  getAllUsers: () => api.get('/api/admin/users'),
  getUserDetails: (id) => api.get(`/api/admin/users/${id}`),
  toggleAdminStatus: (id) => api.put(`/api/admin/users/${id}/toggle-admin`),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  getAllInvoices: () => api.get('/api/admin/invoices'),
  getSystemStats: () => api.get('/api/admin/stats'),
};

export default api;
