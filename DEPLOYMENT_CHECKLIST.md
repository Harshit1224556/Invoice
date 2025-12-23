# ✅ Deployment Checklist

## Configuration Updates Made ✓

### Frontend
- [x] Updated `api.js` to use environment variable
- [x] Created `.env` with Render backend URL
- [x] `.env.example` updated with instructions
- [x] vite.config.js configured

**API URL**: `https://invoice-0yvu.onrender.com/api`

### Backend CORS
- [x] Updated `server.js` to accept multiple origins
- [x] Configured for Vercel deployment
- [x] Updated `.env.example` with correct origins

**Allowed Origins**:
- `http://localhost:5173` (Vite dev)
- `http://localhost:3000` (fallback)
- `https://invoice-frontend.vercel.app` (Vercel prod)

---

## Verification Checklist

### Before Deploying Frontend

- [ ] Backend running at: `https://invoice-0yvu.onrender.com/api/health`
- [ ] Test API locally first:
  ```bash
  curl https://invoice-0yvu.onrender.com/api/health
  ```
- [ ] Verify `.env` file has correct API URL
- [ ] Build test locally:
  ```bash
  cd frontend
  npm run build
  npm run preview
  ```

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update to use Render backend"
   git push origin master
   ```

2. **Deploy on Vercel**
   - Go to vercel.com
   - Import repository
   - Select `frontend` folder as root
   - Add env var: `VITE_API_URL=https://invoice-0yvu.onrender.com/api`
   - Deploy

3. **Test Deployed Site**
   - [ ] Can register new user
   - [ ] Can login with credentials
   - [ ] Dashboard loads correctly
   - [ ] Can create invoice
   - [ ] Admin panel works
   - [ ] All CRUD operations work

---

## Quick Test Commands

### Check Backend Status
```bash
curl -s https://invoice-0yvu.onrender.com/api/health | json_pp
```

### Check Frontend Build
```bash
cd frontend
npm run build  # Should complete without errors
npm run preview  # Test locally before Vercel
```

### Monitor Logs
- **Backend**: Check Render dashboard
- **Frontend**: Check Vercel deployment logs

---

## Final URLs
- **Backend API**: `https://invoice-0yvu.onrender.com/api`
- **Frontend** (after deploy): `https://invoice-frontend.vercel.app`

✨ Everything is configured and ready to deploy!
