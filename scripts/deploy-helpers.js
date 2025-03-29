// Helper script for Vercel deployment

import fs from 'fs';
import path from 'path';

console.log('Starting deployment helpers script...');

// Ensure output directory exists
const outputDir = path.join(process.cwd(), '.vercel', 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('Created output directory:', outputDir);
}

// Ensure functions directory exists
const functionsDir = path.join(outputDir, 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
  console.log('Created functions directory:', functionsDir);
}

// Ensure static directory exists
const staticDir = path.join(outputDir, 'static');
if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir, { recursive: true });
  console.log('Created static directory:', staticDir);
}

// Create static directories for each app if they don't exist
const staticApps = ['www', 'block', 'micro'];
for (const app of staticApps) {
  const appStaticDir = path.join(staticDir, app);
  if (!fs.existsSync(appStaticDir)) {
    fs.mkdirSync(appStaticDir, { recursive: true });
    console.log(`Created static directory for ${app}: ${appStaticDir}`);
  }
  
  // Create _next dir inside the app static dir
  const appNextDir = path.join(appStaticDir, '_next');
  if (!fs.existsSync(appNextDir)) {
    fs.mkdirSync(appNextDir, { recursive: true });
    console.log(`Created _next directory for ${app}: ${appNextDir}`);
  }
  
  // Create a test HTML file
  fs.writeFileSync(
    path.join(appStaticDir, 'test.html'),
    `<!DOCTYPE html>
<html>
<head>
  <title>${app} Test Page</title>
</head>
<body>
  <h1>${app} Test Page</h1>
  <p>This is a static test page for the ${app} app.</p>
</body>
</html>`
  );
  console.log(`Created test.html for ${app}`);
}

// Check if app build directories exist
const apps = ['www', 'block', 'micro'];
for (const app of apps) {
  const appDir = path.join(process.cwd(), 'apps', app);
  const nextDir = path.join(appDir, '.next');
  if (!fs.existsSync(nextDir)) {
    console.warn(`Warning: ${app} app build directory not found:`, nextDir);
  } else {
    console.log(`Found build directory for ${app}:`, nextDir);
  }
}

// Create config.json
const configPath = path.join(outputDir, 'config.json');
fs.writeFileSync(
  configPath,
  JSON.stringify({
    version: 3,
    routes: [
      // Handle static assets for subapps first
      { src: "^/block/_next/(.*)", dest: "/static/block/_next/$1" },
      { src: "^/micro/_next/(.*)", dest: "/static/micro/_next/$1" },
      // Handle www static assets
      { src: "^/_next/(.*)", dest: "/static/www/_next/$1" },
      // Static test pages
      { src: "/block/test", dest: "/static/block/test.html" },
      { src: "/micro/test", dest: "/static/micro/test.html" },
      { src: "/test", dest: "/static/www/test.html" },
      // Handle static files in public directories
      { handle: "filesystem" },
      // App-specific routes
      { src: "/block/(.*)", dest: "/block/$1" },
      { src: "/micro/(.*)", dest: "/micro/$1" },
      // Handle all other routes with the www app
      { src: "/(.*)", dest: "/" }
    ]
  }, null, 2)
);
console.log('Created config.json');

// Create a minimal server.js file for the function
const serverOutputPath = path.join(outputDir, 'server.js');
fs.writeFileSync(
  serverOutputPath,
  `
// Minimal server.js for Next.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

// Try to find the www app directory
const appDir = path.join(process.cwd(), 'apps', 'www');
const nextDir = path.join(appDir, '.next');
const devMode = false;

// Create Next.js app instance
const app = next({ dev: devMode, dir: appDir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    
    // Route based on pathname
    if (pathname.startsWith('/block/')) {
      // Handle block app routes
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('Block app would handle this route: ' + pathname);
      return;
    } else if (pathname.startsWith('/micro/')) {
      // Handle micro app routes
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('Micro app would handle this route: ' + pathname);
      return;
    }
    
    // Default to www app handling
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:' + (process.env.PORT || 3000));
  });
});
`
);
console.log('Created server.js');

// Create the index function
const indexFuncDir = path.join(functionsDir, 'index.func');
if (!fs.existsSync(indexFuncDir)) {
  fs.mkdirSync(indexFuncDir, { recursive: true });
  console.log('Created index.func directory');
}

fs.writeFileSync(
  path.join(indexFuncDir, '.vc-config.json'),
  JSON.stringify({
    runtime: "nodejs18.x",
    handler: "server.js",
    launcherType: "Nodejs",
    shouldAddHelpers: true,
    environment: {}
  }, null, 2)
);
console.log('Created .vc-config.json');

console.log('Deployment helpers completed successfully'); 