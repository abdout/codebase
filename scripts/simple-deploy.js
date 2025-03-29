#!/usr/bin/env node

// Simple deployment script for Vercel
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting simple deployment script');

// Create output directories
const outputDir = path.join(process.cwd(), '.vercel', 'output');
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
      { src: '/block/(.*)', dest: '/block.html' },
      { src: '/micro/(.*)', dest: '/micro.html' },
      { handle: 'filesystem' },
      { src: '/(.*)', dest: '/index.html' }
    ]
  }, null, 2)
);
console.log('Created config.json');

// Create static HTML files
const htmlFiles = {
  'index.html': '<html><body><h1>Main App</h1><p>Welcome to the main app</p></body></html>',
  'block.html': '<html><body><h1>Block App</h1><p>Welcome to the block app</p></body></html>',
  'micro.html': '<html><body><h1>Micro App</h1><p>Welcome to the micro app</p></body></html>'
};

// Write static HTML files
Object.entries(htmlFiles).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(staticDir, filename), content);
  console.log(`Created static file: ${filename}`);
});

console.log('Deployment setup completed successfully'); 