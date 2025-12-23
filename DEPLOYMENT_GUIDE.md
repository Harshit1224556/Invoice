# 🚀 Deployment Guide - Invoice Manager

## Current Deployment Status
- **Backend**: ✅ Deployed on Render → https://invoice-0yvu.onrender.com/
- **Frontend**: 🔄 Ready to deploy on Vercel

---

## Frontend Deployment on Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Update frontend to use Render backend"
git push origin master
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..." → "Project"**
3. Import your GitHub repository
4. Select the `frontend` directory as root
5. Click **Deploy**

### Step 3: Set Environment Variables
In Vercel Project Settings → Environment Variables:
```
VITE_API_URL=https://invoice-0yvu.onrender.com/api
```

---

## Testing the Connection

### 1. Check Backend Health
```bash
curl https://invoice-0yvu.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Invoice Generator API is running",
  "timestamp": "2025-12-24T...",
  "environment": "production",
  "uptime": 12345.67
}
```

### 2. Check Frontend API Configuration
- Open browser DevTools (F12)
- Go to Console tab
- Paste: `fetch('https://invoice-0yvu.onrender.com/api/health').then(r => r.json()).then(d => console.log(d))`
- Should see success response

### 3. Test Login Flow
1. Register a new user
2. Login with credentials
3. Verify dashboard loads
4. Check network tab to confirm API calls go to Render

---

## Key Changes Made

### Frontend Configuration
✅ **api.js** - Uses environment variable: `process.env.VITE_API_URL`
✅ **.env** - Production URL set to Render backend
✅ **vite.config.js** - Dev server proxy updated

### Backend Configuration
✅ **server.js** - CORS updated to accept Vercel frontend
✅ **.env.example** - Updated with correct CORS origins

---

## Environment Files

### Frontend (.env)
```dotenv
VITE_API_URL=https://invoice-0yvu.onrender.com/api
```

### Backend (.env on Render)
Must include:
```dotenv
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://invoice-frontend.vercel.app,http://localhost:5173
```

---

## Troubleshooting

### CORS Errors
If you see: `Cross-Origin Request Blocked`
- Check Render backend is running: https://invoice-0yvu.onrender.com/
- Verify CORS_ORIGIN in backend .env includes your frontend URL
- Restart Render service if changed

### API Not Responding
- Backend might be cold-starting (first request takes ~30 seconds)
- Check Render logs for errors
- Verify MongoDB connection string is valid

### Frontend Shows Blank Page
- Check browser console for errors (F12)
- Verify VITE_API_URL in .env is correct
- Clear browser cache (Ctrl+Shift+Delete)

---

## Monitoring

### Render Dashboard
Monitor backend at: https://render.com/dashboard

Check:
- Service status
- Logs
- Environment variables
- CPU/Memory usage

### Vercel Dashboard
Monitor frontend at: https://vercel.com/dashboard

Check:
- Deployment status
- Build logs
- Analytics
- Environment variables

---

## Next Steps
1. ✅ Deploy frontend to Vercel
2. ✅ Test complete flow end-to-end
3. ✅ Add custom domain (optional)
4. ✅ Set up monitoring/alerts
5. ✅ Configure auto-deployments

---

## Support URLs
- **API Base URL**: https://invoice-0yvu.onrender.com/api
- **API Health Check**: https://invoice-0yvu.onrender.com/api/health
- **Frontend URL** (after Vercel): https://invoice-frontend.vercel.app

---

Last updated: December 24, 2025
