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
      // Handle static assets
      { handle: "filesystem" },
      // App-specific routes
      { src: "/block/.*", dest: "/block/:path*" },
      { src: "/micro/.*", dest: "/micro/:path*" },
      // Handle all other routes with the www app
      { src: "/(.*)", dest: "/" }
    ]
  }, null, 2)
);

// Copy the standalone function for www app
const wwwNextDir = path.join(process.cwd(), 'apps', 'www', '.next');
if (fs.existsSync(path.join(wwwNextDir, 'standalone', 'apps', 'www', '.next', 'server', 'index.js'))) {
  // Create the function directory
  const funcDir = path.join(functionsDir, 'index.func');
  fs.mkdirSync(funcDir, { recursive: true });

  // Write function config
  fs.writeFileSync(
    path.join(funcDir, '.vc-config.json'),
    JSON.stringify({
      runtime: "nodejs18.x",
      handler: "apps/www/.next/server/pages/index.js",
      launcherType: "Nodejs"
    })
  );
}

console.log('Deployment helpers completed successfully'); 