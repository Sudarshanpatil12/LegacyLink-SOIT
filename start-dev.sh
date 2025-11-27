#!/bin/bash

# RGPV Alumni Portal Development Startup Script

echo "🚀 Starting RGPV Alumni Portal Development Environment"
echo "=================================================="

# Check if MongoDB is running
echo "📊 Checking MongoDB status..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   - Local: sudo systemctl start mongod"
    echo "   - Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest"
    echo "   - Or install MongoDB: https://docs.mongodb.com/manual/installation/"
    exit 1
else
    echo "✅ MongoDB is running"
fi

# Start backend server
echo "🔧 Starting backend server..."
cd backend
if [ ! -f "package.json" ]; then
    echo "❌ Backend directory not found or package.json missing"
    exit 1
fi

# Install backend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Start backend in background
echo "🌐 Starting backend server on port 5000..."
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server..."
cd ../my-app
if [ ! -f "package.json" ]; then
    echo "❌ Frontend directory not found or package.json missing"
    kill $BACKEND_PID
    exit 1
fi

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "🌐 Starting frontend server on port 3000..."
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Development environment started successfully!"
echo "=================================================="
echo "📱 Frontend: http://localhost:3000"
echo "🔗 Backend API: http://localhost:5000/api"
echo "📊 MongoDB: mongodb://localhost:27017/rgpv_alumni"
echo ""
echo "📋 Available endpoints:"
echo "   - GET  /api/health - Health check"
echo "   - GET  /api/alumni - Get alumni list"
echo "   - GET  /api/events - Get events list"
echo "   - POST /api/auth/register - Alumni registration"
echo "   - POST /api/auth/login - Alumni login"
echo "   - POST /api/auth/admin/login - Admin login"
echo "   - GET  /api/auth/linkedin - LinkedIn OAuth"
echo ""
echo "🛑 To stop servers, press Ctrl+C"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

