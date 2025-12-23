# Quick Deployment Commands

## Frontend Build & Deploy

### Build
```bash
cd frontend
npm install
npm run build
```

### Deploy to Vercel (Fastest)
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://invoice-0yvu.onrender.com/api
```

### Backend (Render Dashboard)
```
NODE_ENV=production
MONGODB_URI=<your-mongo-uri>
JWT_SECRET=<your-secret>
CORS_ORIGIN=<frontend-url>
PORT=5000
```

## Health Checks

- Backend: https://invoice-0yvu.onrender.com/api/health
- Frontend: Should load without errors

## Key Files Updated

- ✅ `frontend/src/services/api.js` - Production API URL
- ✅ `frontend/.env` - Environment configuration
- ✅ `backend/server.js` - CORS updated
- ✅ `INTEGRATION_GUIDE.md` - Full guide
- ✅ `frontend/DEPLOYMENT_SETUP.md` - Setup guide

## Current Backend URL
```
https://invoice-0yvu.onrender.com/api
```

## Testing with Production Backend Locally
```bash
cd frontend
VITE_API_URL=https://invoice-0yvu.onrender.com/api npm run dev
```

## Verify API Connection
Open browser console and check if there are CORS errors when:
1. Registering a user
2. Logging in
3. Creating an invoice
4. Viewing invoices

If no errors appear - You're ready to deploy! 🎉
