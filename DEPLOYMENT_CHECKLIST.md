# 📋 Deployment Checklist

## Pre-Deployment Phase

### Local Testing
- [ ] Backend runs without errors: `npm run dev` in `backend/`
- [ ] Frontend runs without errors: `npm run dev` in `frontend/`
- [ ] All API routes are working
- [ ] Authentication (login/register) works
- [ ] Invoice CRUD operations work
- [ ] Admin panel is accessible
- [ ] No console errors in browser DevTools

### Code Quality
- [ ] All console.log() statements are removed (except errors)
- [ ] No hardcoded URLs or API keys
- [ ] All environment variables use process.env
- [ ] Code is properly formatted
- [ ] No unused imports or variables

### Git Repository
- [ ] All changes are committed: `git status` shows clean working directory
- [ ] Repository is pushed to GitHub: `git push`
- [ ] `.env` files are in `.gitignore` ✅
- [ ] `node_modules/` is in `.gitignore` ✅
- [ ] `dist/` is in `.gitignore` ✅

---

## Database Setup

### MongoDB Atlas Configuration
- [ ] MongoDB Atlas account created
- [ ] Free cluster (M0) created
- [ ] Database user created (username & strong password)
- [ ] Collection created (if needed)
- [ ] IP Whitelist configured:
  - [ ] During testing: Allow 0.0.0.0/0 (all IPs)
  - [ ] For production: Whitelist specific IPs
- [ ] Connection string copied: `mongodb+srv://...`
- [ ] Connection string tested locally ✅

Example connection string:
```
mongodb+srv://username:password@cluster0.mongodb.net/invoice_db?retryWrites=true&w=majority
```

---

## Backend Deployment

### Environment Variables Setup
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/invoice_db
JWT_SECRET=your_secure_random_key_at_least_32_characters_long
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.vercel.app
```

- [ ] MONGODB_URI is valid and working
- [ ] JWT_SECRET is strong (min 32 characters)
- [ ] PORT is set correctly
- [ ] NODE_ENV is "production"
- [ ] CORS_ORIGIN matches your frontend URL

### Choose Deployment Platform

#### Option A: Railway
- [ ] Railway account created
- [ ] GitHub repository connected
- [ ] Project created in Railway
- [ ] Environment variables added in Railway dashboard
- [ ] Deployment triggered automatically
- [ ] Deployment successful (check logs)
- [ ] Public URL obtained: `https://your-project.railway.app`
- [ ] Health check passed: Visit `/api/health`

#### Option B: Render
- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Web Service created
- [ ] Build & Start commands configured
  - Build: `npm install`
  - Start: `npm start`
- [ ] Environment variables added
- [ ] Deployment initiated
- [ ] Deployment successful
- [ ] Public URL obtained: `https://your-service.onrender.com`
- [ ] Health check passed

#### Option C: Heroku (Legacy)
- [ ] Heroku account created
- [ ] Heroku CLI installed
- [ ] App created: `heroku create app-name`
- [ ] Environment variables set: `heroku config:set KEY=VALUE`
- [ ] Procfile created with: `web: npm start`
- [ ] Deployment: `git push heroku main`
- [ ] Logs checked: `heroku logs --tail`

### Backend Verification
- [ ] Backend is running and accessible
- [ ] Health check endpoint responds: `GET /api/health`
- [ ] CORS is configured correctly
- [ ] Database connection is working
- [ ] Authentication endpoints work
- [ ] API response times are acceptable

---

## Frontend Deployment

### Vercel Setup
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Framework detected as Vite
- [ ] Root directory set to `./frontend`

### Build Configuration
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Install command: `npm install`

### Environment Variables
- [ ] VITE_API_URL set to your backend URL
  ```
  VITE_API_URL=https://your-backend-url/api
  ```
- [ ] Variables added in Vercel Dashboard → Settings → Environment Variables
- [ ] Variables applied to production environment

### Frontend Deployment
- [ ] Initial deployment triggered
- [ ] Build successful (check build logs)
- [ ] Deployment successful
- [ ] Vercel URL obtained: `https://your-app.vercel.app`
- [ ] Frontend loads without errors
- [ ] API calls reach the backend correctly

---

## Post-Deployment Testing

### Functionality Tests
- [ ] Landing page loads correctly
- [ ] Login/Register pages work
- [ ] User can log in with correct credentials
- [ ] User is redirected to dashboard after login
- [ ] Dashboard displays user information
- [ ] Create invoice form works
- [ ] Invoice list displays all invoices
- [ ] Edit invoice functionality works
- [ ] Delete invoice functionality works
- [ ] Admin can access admin panel
- [ ] Admin can view all users
- [ ] Admin can view all invoices
- [ ] Admin statistics are accurate
- [ ] Export CSV works
- [ ] Search and filter work

### API Tests
- [ ] `/api/health` returns status OK
- [ ] `/api/auth/login` returns token on success
- [ ] `/api/auth/register` creates new user
- [ ] `/api/invoices/` returns user's invoices
- [ ] `/api/admin/invoices` returns all invoices (admin only)
- [ ] `/api/admin/users` returns all users (admin only)

### Performance Tests
- [ ] Frontend loads in under 3 seconds
- [ ] API responses are under 1 second
- [ ] No unhandled errors in console
- [ ] Network requests show correct URLs
- [ ] Database queries are optimized

### Security Tests
- [ ] JWT tokens are properly validated
- [ ] Admin endpoints require admin role
- [ ] Protected routes redirect unauthenticated users
- [ ] CORS only allows frontend origin
- [ ] Sensitive data is not exposed in logs
- [ ] Passwords are hashed before storage

---

## Production Monitoring

### Set Up Monitoring
- [ ] Railway/Render logs are accessible
- [ ] Vercel analytics dashboard is accessible
- [ ] MongoDB Atlas metrics are viewable
- [ ] Error tracking is enabled (optional: Sentry, LogRocket)

### Daily Checks
- [ ] Check backend logs for errors
- [ ] Check frontend deployment status
- [ ] Verify database is responsive
- [ ] Monitor API response times
- [ ] Check storage usage

---

## Domain & SSL Setup (Optional)

### Custom Domain for Backend
- [ ] Domain purchased/registered
- [ ] DNS records updated to point to Railway/Render
- [ ] SSL certificate auto-configured
- [ ] Custom domain verified

### Custom Domain for Frontend
- [ ] Vercel domain configuration accessed
- [ ] Custom domain added to Vercel
- [ ] DNS records updated
- [ ] SSL certificate auto-configured (Vercel handles this)

---

## Backup & Disaster Recovery

### Database Backup
- [ ] MongoDB Atlas automated backups enabled
- [ ] Backup frequency: Daily
- [ ] Backup retention: 7+ days
- [ ] Tested restoration process

### Code Backup
- [ ] GitHub repository is up to date
- [ ] All commits are pushed
- [ ] Branch protection enabled (recommended)

---

## Rollback Plan

- [ ] Previous version is tagged in GitHub
- [ ] Know how to revert backend deployment
- [ ] Know how to revert frontend deployment
- [ ] Understand rollback procedure for each platform

---

## Final Sign-Off

- [ ] All checklist items completed
- [ ] Application is live and accessible
- [ ] All team members have access
- [ ] Documentation is complete
- [ ] Monitoring is in place

---

## Deployment Summary

| Component | Platform | URL | Status |
|-----------|----------|-----|--------|
| Frontend | Vercel | https://your-app.vercel.app | ✅ |
| Backend | Railway/Render | https://your-backend.railway.app | ✅ |
| Database | MongoDB Atlas | Cluster: your-cluster | ✅ |

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Notes**: 

---

Keep this checklist for reference and update it as needed!
