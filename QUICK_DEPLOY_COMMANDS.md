# 🚀 Quick Deployment Commands

## Prerequisites
```bash
# Install global tools
npm install -g vercel          # For Vercel CLI
npm install -g @railway/cli    # For Railway deployment
npm install -g @render/cli     # For Render CLI (optional)
```

---

## 1️⃣ Local Testing

### Start Backend
```bash
cd backend
npm install                    # First time only
npm run dev                   # Run with nodemon (development)
# or
npm start                     # Production mode
```

Backend runs on: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

### Start Frontend
```bash
cd frontend
npm install                    # First time only
npm run dev                   # Run Vite dev server
```

Frontend runs on: `http://localhost:5173`

---

## 2️⃣ Setup Environment Variables

### Backend (.env)
```bash
cd backend
cp .env.example .env

# Edit backend/.env with:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/invoice_db
JWT_SECRET=your_secure_32_character_minimum_secret_here
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
```

### Frontend (.env)
```bash
cd frontend
cat > .env << EOF
VITE_API_URL=https://your-backend-url/api
EOF
```

---

## 3️⃣ Commit & Push to GitHub

```bash
# From project root
git add .
git commit -m "Ready for production deployment"
git push origin master

# Verify
git log --oneline -1
```

---

## 4️⃣ Deploy Backend to Railway

```bash
# Login to Railway
railway login

# Navigate to backend directory
cd backend

# Initialize Railway project
railway init
# Select 'Create a new project'
# Name it 'invoice-manager-backend' or similar

# Add environment variables
railway env add MONGODB_URI "mongodb+srv://..."
railway env add JWT_SECRET "your_secret_key"
railway env add PORT "5000"
railway env add NODE_ENV "production"
railway env add CORS_ORIGIN "https://your-vercel-app.vercel.app"

# Deploy
railway up

# Get the public URL
railway open
# Copy the URL from Railway dashboard
```

**Output**: `https://invoice-backend-prod.railway.app`

---

## 5️⃣ Deploy Frontend to Vercel

```bash
# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# When prompted:
# - Project name: invoice-manager-frontend
# - Framework: vite
# - Output directory: dist
# - Environment variables:
#   VITE_API_URL = https://your-backend-url/api

# Get the URL
vercel --prod  # For production deployment
```

**Output**: `https://invoice-manager-frontend.vercel.app`

---

## Alternative: Deploy Backend to Render

```bash
# 1. Go to https://render.com and create account
# 2. Click 'New +' → 'Web Service'
# 3. Connect GitHub repository
# 4. Fill in details:

Name: invoice-manager-backend
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start

# 5. Add Environment Variables:
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app

# 6. Click 'Create Web Service'

# Get the URL from Render dashboard
```

**Output**: `https://invoice-manager-backend.onrender.com`

---

## 6️⃣ Update Frontend with Backend URL

After getting backend URL, update frontend:

```bash
# Go to Vercel Dashboard
# Project → Settings → Environment Variables

# Update or add:
VITE_API_URL=https://your-backend-url/api

# The deployment will trigger automatically
# or manually trigger:
vercel --prod
```

---

## 7️⃣ Verify Deployment

```bash
# Test Backend
curl https://your-backend-url/api/health

# Expected response:
# {
#   "status": "OK",
#   "message": "Invoice Generator API is running",
#   "timestamp": "2024-12-24T10:00:00.000Z",
#   "environment": "production"
# }

# Test Frontend
# Open in browser: https://your-frontend-url
# Should see login page
```

---

## 8️⃣ View Logs

### Railway Logs
```bash
railway logs
# or visit Railway Dashboard → Deployments → View logs
```

### Render Logs
```bash
# Visit Render Dashboard → Your Service → Logs
```

### Vercel Logs
```bash
vercel logs
# or visit Vercel Dashboard → Your Project → Deployments → View logs
```

### MongoDB Atlas Logs
```bash
# Visit MongoDB Atlas Dashboard → Databases → Connect → Monitoring
```

---

## Troubleshooting Commands

### Check Railway Services
```bash
railway service list
railway service remove <service-name>  # Remove if needed
```

### Check Vercel Deployments
```bash
vercel list
vercel --prod --force  # Force redeploy
```

### Clear Build Cache
```bash
# Vercel
vercel --prod --force

# Railway
railway down
railway up
```

### Test API Endpoints
```bash
# Login
curl -X POST https://your-backend/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Get Invoices (with token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-backend/api/invoices
```

---

## Common Issues & Solutions

### "Cannot find MongoDB connection"
```bash
# Check environment variable
railway env
# Update if needed:
railway env update MONGODB_URI "new_value"
```

### "CORS Error"
```bash
# Update CORS_ORIGIN in backend
railway env update CORS_ORIGIN "https://your-frontend-url"

# Restart service
railway down
railway up
```

### "Frontend blank page"
```bash
# Check Vercel logs
vercel logs

# Check environment variables
vercel env list

# Rebuild
vercel --prod --force
```

### "API 404 errors"
```bash
# Check backend is running
curl https://your-backend/api/health

# Check VITE_API_URL in frontend
# Visit Vercel Dashboard → Settings → Environment Variables
```

---

## Monitoring Setup

### Railway Monitoring
```bash
railway open  # Opens dashboard
# Monitor: CPU, Memory, Bandwidth, Error Logs
```

### Vercel Monitoring
```bash
vercel analytics
# View: Web Vitals, Performance, Usage
```

### MongoDB Atlas Monitoring
```bash
# Visit Atlas Dashboard → Metrics
# Monitor: Connections, Operations, Disk Usage
```

---

## Database Backup

### Backup MongoDB Atlas
```bash
# Automated backups are enabled by default in MongoDB Atlas
# Manual backup through Atlas dashboard:
# 1. Database → Backups
# 2. Click "Backup Now"
# 3. Wait for completion
```

### Download Backup
```bash
# From Atlas dashboard:
# 1. Backups → Select backup
# 2. Click "..." → Download
```

---

## Rollback to Previous Version

### Railway
```bash
railway env list
# Go to Dashboard and select previous deployment
```

### Vercel
```bash
# Via CLI
vercel rollback

# Via Dashboard:
# Deployments → Select older deployment → Click "Promote to Production"
```

---

## Production Checklist (Quick)

```bash
# 1. Test locally
npm run dev  # Both backend and frontend

# 2. Commit
git add . && git commit -m "deploy" && git push

# 3. Set environment variables
# - Backend (Railway/Render): All 5 variables
# - Frontend (Vercel): VITE_API_URL
# - MongoDB: IP whitelist configured

# 4. Deploy
# - Backend: railway up or Render auto-deploy
# - Frontend: Vercel auto-deploy

# 5. Test production
# - Frontend: Visit https://your-app.vercel.app
# - Backend: curl https://your-backend/api/health
# - Functionality: Login, create invoice, admin panel

# 6. Monitor
# - Check logs in Railway/Render/Vercel
# - Monitor MongoDB connections
```

---

## Useful Links

- 🚀 [Railway Docs](https://docs.railway.app)
- ✨ [Vercel Docs](https://vercel.com/docs)
- 🎨 [Render Docs](https://render.com/docs)
- 📊 [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- 🐙 [GitHub Docs](https://docs.github.com)

---

**Last Updated**: December 24, 2025
