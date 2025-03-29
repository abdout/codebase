// Helper script for Vercel deployment

import fs from 'fs';
import path from 'path';

// Ensure output directory exists
const outputDir = path.join(process.cwd(), '.vercel', 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Ensure functions directory exists
const functionsDir = path.join(outputDir, 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
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

// Copy the standalone server.js file from www to the root of the output
const wwwNextDir = path.join(process.cwd(), 'apps', 'www', '.next');
const serverJsPath = path.join(wwwNextDir, 'standalone', 'server.js');
const serverOutputPath = path.join(outputDir, 'server.js');

if (fs.existsSync(serverJsPath)) {
  fs.copyFileSync(serverJsPath, serverOutputPath);
  console.log('Copied server.js to output directory');
} else {
  // Create a minimal server.js if it doesn't exist
  fs.writeFileSync(
    serverOutputPath,
    `
    // Fallback server.js
    const { createServer } = require('http');
    const { parse } = require('url');
    const next = require('next');
    
    const app = next({ dev: false, conf: { distDir: './apps/www/.next' } });
    const handle = app.getRequestHandler();
    
    app.prepare().then(() => {
      createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      }).listen(process.env.PORT || 3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:' + (process.env.PORT || 3000));
      });
    });
    `
  );
  console.log('Created fallback server.js');
}

// Create the index function
const indexFuncDir = path.join(functionsDir, 'index.func');
if (!fs.existsSync(indexFuncDir)) {
  fs.mkdirSync(indexFuncDir, { recursive: true });
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

console.log('Deployment helpers completed successfully'); 