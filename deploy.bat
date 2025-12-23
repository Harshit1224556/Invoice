@echo off
REM Invoice Manager - Quick Deployment Script for Windows

echo.
echo ╔════════════════════════════════════════════╗
echo ║  Invoice Manager - Deployment Setup        ║
echo ╚════════════════════════════════════════════╝
echo.

REM Check if backend/.env exists
if not exist "backend\.env" (
    echo ❌ backend\.env file not found!
    echo 📋 Creating backend\.env file from template...
    copy backend\.env.example backend\.env
    echo ✅ backend\.env created
) else (
    echo ✅ backend\.env already exists
)

echo.
echo 📋 Environment Variables Checklist:
echo.
echo 1️⃣  Backend Environment Variables (backend\.env):
echo    - MONGODB_URI: Your MongoDB Atlas connection string
echo    - JWT_SECRET: Random 32+ character secret
echo    - PORT: 5000 (default)
echo    - NODE_ENV: production
echo    - CORS_ORIGIN: Your frontend URL
echo.
echo 2️⃣  Frontend Environment Variables (frontend\.env):
echo    - VITE_API_URL: Your backend API URL
echo.

echo 🔧 Next Steps:
echo.
echo For Local Testing:
echo   1. Backend: cd backend ^&^& npm install ^&^& npm start
echo   2. Frontend: cd frontend ^&^& npm install ^&^& npm run dev
echo.

echo For Production Deployment:
echo   1. Update environment variables in:
echo      - backend\.env
echo      - frontend\.env
echo   2. Commit to GitHub: git add . ^&^& git commit -m "Deploy" ^&^& git push
echo   3. Deploy Backend to Railway/Render
echo   4. Deploy Frontend to Vercel
echo   5. Configure environment variables in hosting platforms
echo.

echo 📚 For detailed instructions, see DEPLOYMENT_GUIDE.md
echo.
echo ✅ Setup complete!
echo.
pause
