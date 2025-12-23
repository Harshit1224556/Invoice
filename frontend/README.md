# Invoice Manager - Frontend

A modern, sassy, and animated React frontend for invoice management built with **React**, **Tailwind CSS**, and **Vite**.

## ✨ Features

- 🎨 **Modern Design** - Gradient backgrounds, smooth animations, and glowing effects
- ⚡ **Fast Setup** - Vite for lightning-fast development
- 🎭 **Smooth Animations** - Fade-in, slide-up, and glow effects throughout the app
- 🔐 **Authentication** - Register and login with JWT tokens
- 📊 **Dashboard** - View invoice statistics at a glance
- 📝 **Invoice Management** - Create, edit, delete, and view invoices
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🎯 **Status Tracking** - Track invoice status (Pending, Paid, Overdue)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx    # Navigation header
│   │   ├── DashboardStats.jsx  # Statistics cards
│   │   ├── InvoiceForm.jsx    # Create/Edit form
│   │   ├── InvoiceList.jsx    # Invoice grid display
│   │   └── ProtectedRoute.jsx # Auth wrapper
│   ├── pages/            # Page components
│   │   ├── Login.jsx     # Login page
│   │   ├── Register.jsx  # Registration page
│   │   └── Dashboard.jsx # Main dashboard
│   ├── context/          # React Context
│   │   └── AuthContext.jsx  # Auth state management
│   ├── services/         # API services
│   │   └── api.js       # Axios setup & endpoints
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles & animations
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎨 Design Features

### Gradients & Colors
- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)

### Animations
- **Fade In**: 0.5s smooth opacity transition
- **Slide Up**: 0.6s smooth upward movement
- **Pulse Glow**: Continuous glowing effect
- **Hover Effects**: Scale transforms and shadow transitions

### Components
- Glassmorphism effect on cards
- Glowing shadows on hover
- Smooth color transitions
- Responsive grid layouts

## 🔗 API Integration

The frontend connects to the backend API at `http://localhost:5000/api`

### Available Endpoints:

**Authentication:**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update profile

**Invoices:**
- `GET /invoices` - Get all invoices
- `GET /invoices/stats` - Get dashboard statistics
- `POST /invoices` - Create new invoice
- `GET /invoices/:id` - Get invoice details
- `PUT /invoices/:id` - Update invoice
- `DELETE /invoices/:id` - Delete invoice

## 🔐 Authentication

The app uses JWT tokens stored in localStorage for authentication. The token is automatically included in all API requests via the Axios interceptor.

## 📦 Dependencies

- **react**: UI framework
- **react-dom**: DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **tailwindcss**: Utility-first CSS
- **vite**: Build tool

## 🎯 Key Features Explained

### 1. Authentication Context
Manages global authentication state including login, register, and logout functionality.

### 2. Protected Routes
Routes are protected using a ProtectedRoute component that checks for valid JWT tokens.

### 3. API Service Layer
Centralized API calls with automatic token injection in request headers.

### 4. Responsive Components
All components are built with Tailwind CSS and are fully responsive.

### 5. Error Handling
User-friendly error messages displayed in alert boxes and forms.

## 🛠️ Customization

### Change Primary Color
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#your-color',
}
```

### Modify Animations
Update keyframes in `tailwind.config.js` under the `theme.keyframes` section.

### Adjust API Base URL
Edit `src/services/api.js`:
```js
const API_URL = 'http://your-api-url/api';
```

## 🤝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- The backend server must be running on `http://localhost:5000` for the app to work
- JWT tokens are stored in localStorage and persist across sessions
- The app uses React Router v6 for routing
- All animations use CSS transitions for smooth performance

## 🐛 Troubleshooting

**CORS Errors?**
Make sure the backend has CORS enabled for `http://localhost:3000`

**API Connection Failed?**
- Check if backend is running on port 5000
- Verify the API endpoint in `src/services/api.js`

**Styling Issues?**
- Clear browser cache and rebuild: `npm run build`
- Ensure Tailwind CSS is properly compiled

## 📄 License

ISC

## 🚀 Ready to Use!

The frontend is production-ready and follows React best practices. Enjoy building! 🎉
