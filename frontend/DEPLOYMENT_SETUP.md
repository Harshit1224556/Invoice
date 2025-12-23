# Frontend Deployment Guide

## Updated API Configuration

The frontend has been configured to use the deployed backend at:
```
https://invoice-0yvu.onrender.com/api
```

## Environment Setup

### Local Development
If running locally, create a `.env` file:
```bash
VITE_API_URL=http://localhost:5000/api
```

### Production
For production deployment, use:
```bash
VITE_API_URL=https://invoice-0yvu.onrender.com/api
```

## Quick Start

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Set Environment Variables**
   ```bash
   cp .env.example .env
   # Update .env with your configuration
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Files Updated

- ✅ `frontend/src/services/api.js` - Updated API base URL to use environment variable
- ✅ `frontend/.env` - Production backend URL configured
- ✅ `frontend/.env.example` - Example environment configuration

## API Configuration Details

The frontend now uses the following configuration:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://invoice-0yvu.onrender.com/api';
```

This means:
- If `VITE_API_URL` environment variable is set, it will use that
- Otherwise, it defaults to the deployed backend URL: `https://invoice-0yvu.onrender.com/api`

## Testing the Connection

You can test the API connection by:
1. Opening browser console (F12)
2. The app will automatically connect to the backend
3. Try registering or logging in to verify connectivity

## Available Endpoints

All API calls are automatically prefixed with the configured URL:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/invoices` - Get user invoices
- `POST /api/invoices` - Create invoice
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/invoices` - Get all invoices (admin only)

## Frontend Deployment Options

### Vercel (Recommended)
```bash
npm run build
# Vercel automatically detects vite config and deploys
```

### Netlify
```bash
npm run build
# Configure build command: npm run build
# Configure publish directory: dist
```

### GitHub Pages
Update `vite.config.js` base path and deploy to gh-pages branch.

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API base URL | `https://invoice-0yvu.onrender.com/api` |

## Troubleshooting

### CORS Errors
If you see CORS errors, ensure:
1. Backend CORS_ORIGIN is set correctly
2. Backend is running and accessible
3. Frontend is sending requests to correct URL

### 404 Errors
- Check that the backend URL is correct
- Verify backend server is running
- Check browser console for exact error message

### Connection Refused
- Verify backend URL is accessible
- Check internet connection
- Ensure backend deployment is active

## Next Steps

1. Deploy frontend to Vercel/Netlify
2. Test all features with deployed backend
3. Monitor logs for any issues
4. Set up error tracking (optional)
