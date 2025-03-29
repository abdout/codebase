#!/usr/bin/env node

// Simple deployment script for Vercel
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

console.log('Starting simple deployment script');

// Get current directory when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Create output directories
const outputDir = path.join(rootDir, '.vercel', 'output');
const staticDir = path.join(outputDir, 'static');
const functionsDir = path.join(outputDir, 'functions');

// Create directories
[outputDir, staticDir, functionsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create config.json
fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify({
    version: 3,
    routes: [
      // Static routes for each app
      { src: '^/block/?$', dest: '/block.html' },
      { src: '^/micro/?$', dest: '/micro.html' },
      // Handle static files
      { handle: 'filesystem' },
      // Fallback - root route
      { src: '^/?$', dest: '/index.html' },
      // Any other routes will use the root file too
      { src: '/(.*)', dest: '/index.html' }
    ]
  }, null, 2)
);
console.log('Created config.json');

// Create static HTML files
const htmlFiles = {
  'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Main App</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { color: #0070f3; }
    nav { margin: 2rem 0; padding: 1rem; background: #f0f0f0; border-radius: 0.5rem; }
    nav a { margin-right: 1rem; color: #0070f3; text-decoration: none; }
    nav a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Main App</h1>
  <p>Welcome to the main application deployed on Vercel!</p>
  
  <nav>
    <strong>Navigate to:</strong>
    <a href="/">Home</a>
    <a href="/block">Block App</a>
    <a href="/micro">Micro App</a>
  </nav>

  <div>
    <h2>About this deployment</h2>
    <p>This is a static deployment created as a proof of concept for the monorepo structure.</p>
    <p>Deployment time: ${new Date().toISOString()}</p>
  </div>
</body>
</html>`,

  'block.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Block App</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { color: #6d28d9; }
    nav { margin: 2rem 0; padding: 1rem; background: #f0f0f0; border-radius: 0.5rem; }
    nav a { margin-right: 1rem; color: #6d28d9; text-decoration: none; }
    nav a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Block App</h1>
  <p>Welcome to the Block application!</p>
  
  <nav>
    <strong>Navigate to:</strong>
    <a href="/">Home</a>
    <a href="/block">Block App</a>
    <a href="/micro">Micro App</a>
  </nav>

  <div>
    <h2>About Block App</h2>
    <p>This is the Block app static content, deployed from the monorepo.</p>
    <p>Deployment time: ${new Date().toISOString()}</p>
  </div>
</body>
</html>`,

  'micro.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Micro App</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { color: #16a34a; }
    nav { margin: 2rem 0; padding: 1rem; background: #f0f0f0; border-radius: 0.5rem; }
    nav a { margin-right: 1rem; color: #16a34a; text-decoration: none; }
    nav a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Micro App</h1>
  <p>Welcome to the Micro application!</p>
  
  <nav>
    <strong>Navigate to:</strong>
    <a href="/">Home</a>
    <a href="/block">Block App</a>
    <a href="/micro">Micro App</a>
  </nav>

  <div>
    <h2>About Micro App</h2>
    <p>This is the Micro app static content, deployed from the monorepo.</p>
    <p>Deployment time: ${new Date().toISOString()}</p>
  </div>
</body>
</html>`
};

// Write static HTML files
Object.entries(htmlFiles).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(staticDir, filename), content);
  console.log(`Created static file: ${filename}`);
});

// Optionally, create a server.js file and functions directory for serverless deployment
// Uncomment this section when ready to deploy server-rendered content
/*
// Create a minimal server.js file for future use
const serverJsContent = `
// This is a placeholder server file for future server-rendered content
export default function handler(request, response) {
  return new Response("Server-rendered content will be available in a future update", {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
`;

const funcDir = path.join(functionsDir, 'index.func');
if (!fs.existsSync(funcDir)) {
  fs.mkdirSync(funcDir, { recursive: true });
  console.log('Created function directory');
}

fs.writeFileSync(path.join(funcDir, 'index.js'), serverJsContent);
console.log('Created server function file');

fs.writeFileSync(
  path.join(funcDir, '.vc-config.json'),
  JSON.stringify({
    runtime: "edge",
    entrypoint: "index.js"
  }, null, 2)
);
console.log('Created function config');
*/

console.log('Deployment setup completed successfully'); 