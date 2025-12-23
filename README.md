# 📊 Invoice Manager - Full-Stack Application

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)

A modern, feature-rich invoice management system built with React, Node.js, and MongoDB. Perfect for freelancers, small businesses, and enterprises to manage invoices, track payments, and monitor financial metrics.

---

## 🎯 Features

### User Features
✅ **User Authentication** - Secure login and registration with JWT  
✅ **Invoice Management** - Create, read, update, and delete invoices  
✅ **Dashboard** - Real-time statistics and invoice overview  
✅ **Invoice Tracking** - Monitor payment status (Paid, Pending, Overdue)  
✅ **PDF Export** - Generate and download invoice PDFs  
✅ **Responsive Design** - Works seamlessly on desktop and mobile  

### Admin Features
✅ **Admin Dashboard** - System-wide statistics and metrics  
✅ **User Management** - View and manage all users  
✅ **Invoice Oversight** - Monitor all invoices across the system  
✅ **Client Performance** - Track payment reliability scores  
✅ **Bulk Operations** - Mark multiple invoices, batch actions  
✅ **Advanced Filtering** - Search, sort, and group invoices  
✅ **Data Export** - Export data as CSV files  
✅ **Pagination** - Handle large datasets efficiently  

### Advanced Features
⭐ **Favorites System** - Star important invoices  
⭐ **Auto-Refresh** - Real-time updates every 30 seconds  
⭐ **Smart Grouping** - Organize by Status, Client, or User  
⭐ **Days Overdue Counter** - Track payment delays  
⭐ **Quick Notes** - Add notes to invoices  
⭐ **Invoice Preview Modal** - Quick-view details  
⭐ **Persistent Navbar** - Global navigation across all pages  

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Deployment
- **Vercel** - Frontend hosting
- **Railway/Render** - Backend hosting
- **MongoDB Atlas** - Cloud database

---

## 📋 Project Structure

```
Invoice/
├── backend/                    # Node.js Express API
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/           # Request handlers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── invoiceController.js
│   ├── middleware/            # Custom middleware
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── models/               # Database schemas
│   │   ├── Invoice.js
│   │   └── User.js
│   ├── routes/               # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   └── invoiceRoutes.js
│   ├── .env.example          # Environment variables template
│   ├── server.js             # Express app initialization
│   ├── package.json
│   └── railway.json          # Railway deployment config
│
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── AdminInvoices.jsx
│   │   │   ├── AdminStats.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── DashboardStats.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── InvoiceForm.jsx
│   │   │   ├── InvoiceList.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/          # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PrintInvoice.jsx
│   │   │   └── Register.jsx
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── pdfGenerator.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── vercel.json           # Vercel deployment config
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── postcss.config.js
│   ├── package.json
│   └── index.html
│
├── DEPLOYMENT_GUIDE.md       # Detailed deployment instructions
├── DEPLOYMENT_CHECKLIST.md   # Pre-deployment checklist
├── QUICK_DEPLOY_COMMANDS.md  # Quick reference for commands
├── .gitignore
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)
- Code editor (VS Code recommended)
- Git for version control

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harshit1224556/Invoice.git
   cd Invoice
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - API Health: http://localhost:5000/api/health

---

## 📦 Installation & Setup

### Backend Installation

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# Edit backend/.env:
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/invoice_db
JWT_SECRET=your_secure_random_key_min_32_characters
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend Installation

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (if needed)
# The API URL defaults to http://localhost:5000/api for development
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/invoice_db

# JWT Secret (min 32 characters)
JWT_SECRET=your_very_secure_random_string_here_at_least_32_characters

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Frontend (.env)
```env
# API URL
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test  # If test scripts are configured
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Create new invoice
- [ ] Edit existing invoice
- [ ] Delete invoice
- [ ] View dashboard statistics
- [ ] Access admin panel (as admin)
- [ ] View all users (admin)
- [ ] View all invoices (admin)
- [ ] Export invoices to CSV
- [ ] Print invoice as PDF

---

## 🚢 Deployment

### Quick Deploy (Recommended)

**See [QUICK_DEPLOY_COMMANDS.md](./QUICK_DEPLOY_COMMANDS.md) for command-by-command instructions**

#### Option 1: Railway (Recommended)
```bash
# Backend deployment
cd backend
railway login
railway init
railway env add MONGODB_URI "your_mongodb_uri"
railway env add JWT_SECRET "your_secret"
railway env add CORS_ORIGIN "your_frontend_url"
railway up

# Frontend deployment
# Use Vercel (see below)
```

#### Option 2: Render
```bash
# Similar to Railway, with UI-based setup
# Visit render.com and create web service
```

#### Option 3: Vercel (Frontend)
```bash
cd frontend
vercel login
vercel
# Set VITE_API_URL environment variable
```

### Detailed Deployment Guide

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Step-by-step setup instructions
- MongoDB Atlas configuration
- Backend deployment options
- Frontend deployment on Vercel
- Environment variable setup
- Troubleshooting guide

### Pre-Deployment Checklist

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for:
- Complete checklist of all steps
- Testing procedures
- Monitoring setup
- Security verification

---

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
```

### Invoice Endpoints (Protected)
```
GET    /api/invoices           - Get user's invoices
POST   /api/invoices           - Create new invoice
GET    /api/invoices/:id       - Get invoice details
PUT    /api/invoices/:id       - Update invoice
DELETE /api/invoices/:id       - Delete invoice
GET    /api/invoices/stats     - Get invoice statistics
```

### Admin Endpoints (Protected - Admin Only)
```
GET    /api/admin/invoices     - Get all invoices
GET    /api/admin/users        - Get all users
GET    /api/admin/stats        - Get system statistics
```

### Health Check
```
GET    /api/health             - Server status
```

---

## 🔐 Security Features

✅ **JWT Authentication** - Secure token-based authentication  
✅ **Password Hashing** - bcryptjs for secure password storage  
✅ **CORS Protection** - Configured for specific origins  
✅ **Protected Routes** - Role-based access control  
✅ **Environment Variables** - Sensitive data not hardcoded  
✅ **SQL Injection Prevention** - Using Mongoose ODM  
✅ **XSS Protection** - React automatically escapes output  

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Verify MongoDB URI in .env
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Ensure username and password are correct

**CORS Errors**
- Update CORS_ORIGIN in backend .env
- Clear browser cache
- Restart backend server

**Frontend Cannot Reach Backend**
- Verify VITE_API_URL is correct
- Check backend is running
- Look at Network tab in browser DevTools

**Authentication Issues**
- Clear localStorage: `localStorage.clear()`
- Check JWT_SECRET is set
- Verify tokens in browser cookies

---

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Invoice Model
```javascript
{
  invoiceNumber: String (unique),
  clientName: String,
  clientEmail: String,
  user: ObjectId (ref: User),
  items: Array,
  subtotal: Number,
  tax: Number,
  total: Number,
  status: String (Paid, Pending, Overdue),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 UI/UX Features

- **Modern Design** - Gradient backgrounds and smooth animations
- **Dark Mode** - Eye-friendly dark theme with purple accents
- **Responsive Layout** - Mobile-first design approach
- **Smooth Transitions** - CSS animations and React transitions
- **Accessible** - ARIA labels and semantic HTML
- **User-Friendly** - Intuitive navigation and clear feedback

---

## 📈 Performance Optimizations

- **Code Splitting** - Lazy load routes with React.lazy
- **Image Optimization** - Optimized assets
- **API Caching** - Implemented in service layer
- **Pagination** - Load data in chunks
- **Debouncing** - Search and filter debouncing
- **Memoization** - useMemo for expensive calculations

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💼 Author

**Harshit**
- GitHub: [@Harshit1224556](https://github.com/Harshit1224556)
- Repository: [Invoice Manager](https://github.com/Harshit1224556/Invoice)

---

## 📞 Support

For support, email: support@invoicemanager.com  
Or open an issue on GitHub: [Issues](https://github.com/Harshit1224556/Invoice/issues)

---

## 🙏 Acknowledgments

- React community for amazing libraries
- Vercel for excellent deployment platform
- MongoDB Atlas for reliable database service
- Tailwind CSS for beautiful styling

---

## 📅 Version History

### v1.0.0 - December 24, 2025
- ✅ Initial release
- ✅ Core invoice management features
- ✅ User authentication
- ✅ Admin panel
- ✅ Advanced filtering and search
- ✅ PDF export functionality
- ✅ Production-ready deployment

---

**Happy Invoicing! 💰**

Last updated: December 24, 2025
