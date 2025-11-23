#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const backendProcess = spawn('node', [path.join(__dirname, 'server/index.js')], {
  cwd: __dirname,
  stdio: 'inherit',
  detached: false
});

// Give backend time to start
setTimeout(() => {
  // Start the frontend (Expo)
  const env = { ...process.env };
  env.EXPO_PACKAGER_PROXY_URL = `https://${process.env.REPLIT_DEV_DOMAIN || 'localhost:8081'}`;
  env.REACT_NATIVE_PACKAGER_HOSTNAME = process.env.REPLIT_DEV_DOMAIN || 'localhost:8081';

  const frontendProcess = spawn('npx', ['expo', 'start'], {
    cwd: __dirname,
    stdio: 'inherit',
    env
  });

  // Handle cleanup
  process.on('exit', () => {
    backendProcess.kill();
    frontendProcess.kill();
  });

  backendProcess.on('error', (err) => {
    console.error('Backend failed to start:', err);
    process.exit(1);
  });

  frontendProcess.on('error', (err) => {
    console.error('Frontend failed to start:', err);
    process.exit(1);
  });
}, 2000);
