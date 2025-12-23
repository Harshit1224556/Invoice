# Invoice Manager - Frontend & Backend Integration Guide

## ✅ Current Setup Status

### Backend
- **URL**: https://invoice-0yvu.onrender.com
- **Status**: Deployed and Running ✅
- **Health Check**: https://invoice-0yvu.onrender.com/api/health

### Frontend Configuration
- **API Base URL**: `https://invoice-0yvu.onrender.com/api`
- **Environment Variable**: `VITE_API_URL`
- **Configuration Files**: `.env`, `.env.example`

## 🚀 Frontend Deployment Instructions

### Step 1: Prepare Frontend for Deployment

```bash
cd frontend
npm install
npm run build
```

### Step 2: Deploy to Vercel (Recommended)

**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel
# Follow the prompts
```

**Option B: GitHub Integration**
1. Push code to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend`
6. Add Environment Variables:
   - `VITE_API_URL`: `https://invoice-0yvu.onrender.com/api`
7. Deploy!

### Step 3: Deploy to Netlify (Alternative)

```bash
npm install -g netlify-cli
cd frontend
netlify deploy --prod --dir=dist
```

Or use Netlify UI:
1. Connect GitHub repo
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables
4. Deploy

### Step 4: Deploy to GitHub Pages (Alternative)

Update `vite.config.js`:
```javascript
export default {
  base: '/Invoice/',
  // ... rest of config
}
```

Then:
```bash
npm run build
npm run deploy
```

## 📋 Environment Variables Setup

### Frontend (.env)
```bash
# Production
VITE_API_URL=https://invoice-0yvu.onrender.com/api

# OR Local Development
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env on Render)
Set these environment variables in Render dashboard:
```
NODE_ENV=production
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
CORS_ORIGIN=<frontend-url>
PORT=5000
```

## 🔗 API Integration

All API calls are automatically configured through:
```javascript
// frontend/src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://invoice-0yvu.onrender.com/api';
```

### Available API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

#### Invoices
- `GET /api/invoices` - Get user's invoices
- `GET /api/invoices/:id` - Get single invoice
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice
- `GET /api/invoices/stats` - Get dashboard stats

#### Admin Routes
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id/toggle-admin` - Toggle admin status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/invoices` - Get all invoices
- `GET /api/admin/stats` - Get system stats

## ✅ Testing Checklist

### Before Deployment
- [ ] Frontend builds without errors: `npm run build`
- [ ] Local testing works: `npm run dev`
- [ ] Environment variables are set
- [ ] Backend is accessible
- [ ] CORS is configured

### After Deployment
- [ ] Frontend loads successfully
- [ ] Login works
- [ ] Can create invoices
- [ ] Can view invoices
- [ ] Admin panel works (for admins)
- [ ] Logout works
- [ ] No console errors

## 🐛 Troubleshooting

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: 
- Verify `VITE_API_URL` in frontend .env
- Check backend `CORS_ORIGIN` setting
- Restart backend if deployed

### 404 Not Found
```
GET https://invoice-0yvu.onrender.com/api/... 404
```
**Solution**:
- Check API URL is correct
- Verify endpoint exists
- Check backend is running

### Connection Timeout
```
Failed to fetch
```
**Solution**:
- Verify backend URL is accessible
- Check internet connection
- Ensure backend is deployed

### Login Issues
```
401 Unauthorized
```
**Solution**:
- Verify credentials are correct
- Check JWT_SECRET matches on backend
- Clear browser localStorage and try again

## 📊 Monitoring & Logs

### View Backend Logs (Render)
1. Go to https://dashboard.render.com
2. Select your service
3. Click "Logs" tab
4. Monitor for errors

### View Frontend Logs (Vercel)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Deployments"
4. Check deployment logs

### Local Testing with Production Backend
```bash
cd frontend
VITE_API_URL=https://invoice-0yvu.onrender.com/api npm run dev
```

## 📱 Features Ready for Production

- ✅ User Authentication (Register/Login)
- ✅ Invoice Management (CRUD)
- ✅ Dashboard Statistics
- ✅ Admin Panel with User Management
- ✅ Advanced Invoice Filters
- ✅ CSV Export
- ✅ Pagination
- ✅ Client Performance Scores
- ✅ Responsive Design
- ✅ Global Navigation Bar

## 🔐 Security Considerations

1. **Never commit .env files** - Add to .gitignore
2. **Use HTTPS** - Both frontend and backend should use HTTPS
3. **Validate tokens** - Backend validates JWT on every request
4. **CORS whitelist** - Only allow frontend origin
5. **Rate limiting** - Consider adding rate limiting (optional)
6. **Input validation** - All inputs validated on backend

## 📞 Support & Maintenance

- Monitor backend health: https://invoice-0yvu.onrender.com/api/health
- Check logs regularly
- Update dependencies monthly
- Test features after any changes
- Backup database regularly

## 🎯 Next Steps

1. Deploy frontend to Vercel/Netlify
2. Test all features in production
3. Monitor performance and errors
4. Gather user feedback
5. Plan future enhancements
