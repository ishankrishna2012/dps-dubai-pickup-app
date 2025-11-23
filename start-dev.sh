#!/bin/bash
# Start both backend and frontend servers

# Kill any existing processes on ports 3000 and 8081
pkill -f "node.*server/index.js"
sleep 1

# Start backend server in background
cd /home/runner/workspace
node server/index.js &
BACKEND_PID=$!
echo "Backend server started with PID $BACKEND_PID"

# Wait a bit for backend to start
sleep 2

# Start frontend with Expo
npm run dev
