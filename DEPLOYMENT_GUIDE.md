# 🚀 Invoice Manager - Deployment Guide

## Overview
This guide helps you deploy the Invoice Manager application to production using:
- **Frontend**: Vercel (Recommended for React/Vite apps)
- **Backend**: Railway, Heroku, or Render (Node.js)
- **Database**: MongoDB Atlas (Cloud MongoDB)

---

## 📋 Prerequisites

1. **GitHub Account** - For repository hosting
2. **Vercel Account** - Free tier available
3. **MongoDB Atlas Account** - Free tier available
4. **Backend Hosting Account** - Railway/Heroku/Render (choose one)

---

## Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up and create a free account
3. Create a new cluster (M0 Free tier is sufficient)
4. Wait for cluster to be created (5-10 mins)

### 1.2 Create Database User
1. Go to **Database Access** → **Add New Database User**
2. Create username and password
3. Set permissions to "Atlas admin" for now
4. Copy the connection string

### 1.3 Get Connection String
1. Go to **Databases** → **Connect**
2. Choose "Drivers"
3. Copy the MongoDB URI
4. Replace `<username>`, `<password>`, and `<dbname>` with your values

Example:
```
mongodb+srv://username:password@cluster0.mongodb.net/invoice_db?retryWrites=true&w=majority
```

---

## Step 2: Deploy Backend

### Option A: Deploy to Railway (Recommended)

1. **Create Railway Account**
   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize Railway project
   cd backend
   railway init
   
   # Add environment variables
   railway env add MONGODB_URI "your_mongodb_uri"
   railway env add JWT_SECRET "your_secret_key_32_chars_min"
   railway env add PORT 5000
   railway env add NODE_ENV production
   railway env add CORS_ORIGIN "https://your-frontend-domain.vercel.app"
   
   # Deploy
   railway up
   ```

3. **Get Backend URL**
   - Go to Railway Dashboard
   - Find your project
   - Copy the public URL (e.g., `https://your-project.railway.app`)

### Option B: Deploy to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` directory
   - Set environment:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     PORT=5000
     NODE_ENV=production
     CORS_ORIGIN=https://your-frontend-domain.vercel.app
     ```
   - Deploy

---

## Step 3: Deploy Frontend to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

3. **Deploy Frontend**
   - Click "Import Project"
   - Select your Invoice repository
   - Framework: Vite
   - Root Directory: ./frontend
   - Environment Variables:
     ```
     VITE_API_URL=https://your-backend-url.railway.app/api
     ```
   - Click Deploy

4. **Update Backend CORS**
   - Get your Vercel frontend URL
   - Update backend `.env`:
     ```
     CORS_ORIGIN=https://your-app.vercel.app
     ```
   - Redeploy backend

---

## Step 4: Update Frontend Configuration

After getting your backend URL, update the frontend:

### Update `frontend/src/services/api.js`

```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  // ... rest of the code
};
```

---

## Step 5: Verification Checklist

✅ MongoDB Atlas is running
✅ Backend API is deployed and accessible
✅ Frontend is deployed on Vercel
✅ Environment variables are set correctly
✅ CORS is configured properly
✅ API calls work from frontend to backend
✅ Authentication works
✅ Invoice CRUD operations work

---

## 🧪 Testing Your Deployment

1. **Test Backend API**
   ```bash
   curl https://your-backend-url/api/auth/login
   ```

2. **Test Frontend**
   - Visit your Vercel URL
   - Try logging in with test credentials
   - Create a test invoice
   - Verify admin panel works

---

## 🔐 Security Best Practices

1. **Change default passwords**
2. **Use strong JWT_SECRET** (min 32 characters)
3. **Enable MongoDB IP Whitelist** (allow all for testing, restrict later)
4. **Keep API secrets in environment variables**
5. **Never commit `.env` files**
6. **Use HTTPS only** (Vercel & Railway provide free SSL)

---

## 📊 Monitoring & Logs

### Railway
- Dashboard → Your Project → Deployments
- View logs in real-time

### Vercel
- Vercel Dashboard → Your Project → Deployments
- Click on any deployment to see logs

### MongoDB
- Atlas Dashboard → Databases → Collections
- Monitor connections and queries

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Check connection string format
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0 for testing)
- Ensure MONGODB_URI environment variable is set

### "CORS Error"
- Update CORS_ORIGIN in backend .env
- Restart backend service
- Clear browser cache and try again

### "API calls return 404"
- Check VITE_API_URL is correctly set
- Verify backend is running and deployed
- Check Network tab in browser DevTools

### "Frontend deployed but shows blank page"
- Check Vercel deployment logs
- Ensure NODE_ENV build settings are correct
- Verify all npm dependencies are installed

---

## 📚 Deployment Dashboard Links

After deployment, save these links:
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway/Render Dashboard**: Save your dashboard URL

---

## 🎉 Success!

Your Invoice Manager is now live! 

- **Frontend URL**: https://your-app.vercel.app
- **Backend URL**: https://your-backend.railway.app/api
- **Database**: MongoDB Atlas

Monitor your logs regularly and keep backups of important data.

---

**Last Updated**: December 24, 2025
