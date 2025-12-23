#!/bin/bash

# Invoice Manager - Quick Deployment Script
# This script helps you set up environment variables for deployment

echo "╔════════════════════════════════════════════╗"
echo "║  Invoice Manager - Deployment Setup        ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "📋 Creating .env file from template..."
    cp backend/.env.example backend/.env
    echo "✅ backend/.env created"
fi

echo ""
echo "📋 Please update the following environment variables:"
echo ""
echo "1️⃣  Backend Environment Variables (backend/.env):"
echo "   - MONGODB_URI: Your MongoDB Atlas connection string"
echo "   - JWT_SECRET: Random 32+ character secret"
echo "   - PORT: 5000 (default)"
echo "   - NODE_ENV: production"
echo "   - CORS_ORIGIN: Your frontend URL"
echo ""
echo "2️⃣  Frontend Environment Variables (frontend/.env):"
echo "   - VITE_API_URL: Your backend API URL"
echo ""

echo "🔧 After updating environment variables:"
echo ""
echo "For Local Testing:"
echo "  1. Backend: cd backend && npm install && npm start"
echo "  2. Frontend: cd frontend && npm install && npm run dev"
echo ""

echo "For Production Deployment:"
echo "  1. Push to GitHub: git add . && git commit -m 'Deploy' && git push"
echo "  2. Deploy Backend to Railway/Render"
echo "  3. Deploy Frontend to Vercel"
echo "  4. Update environment variables in hosting platforms"
echo ""

echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "✅ Setup complete!"
