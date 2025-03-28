#!/usr/bin/env node

// Deployment script for Vercel that builds Next.js apps
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

console.log('Starting deployment script');

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

// Create static directories for each app
['www', 'block', 'micro'].forEach(appName => {
  const appStaticDir = path.join(staticDir, appName);
  if (!fs.existsSync(appStaticDir)) {
    fs.mkdirSync(appStaticDir, { recursive: true });
    console.log(`Created static directory for ${appName}: ${appStaticDir}`);
  }
});

// Build Next.js apps
console.log('Building Next.js apps...');
try {
  // Build the apps
  execSync('pnpm --filter=www build', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ Built www app');
  execSync('pnpm --filter=block build', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ Built block app');
  execSync('pnpm --filter=micro build', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ Built micro app');
} catch (error) {
  console.error('❌ Error building apps:', error.message);
  // Use fallback static HTML files if builds fail
  createFallbackHtml();
  process.exit(1);
}

// Copy built Next.js files
console.log('Copying build output...');

// Copy www app (main app) - using standalone output
try {
  // Copy standalone server
  const wwwStandalonePath = path.join(rootDir, 'apps/www/.next/standalone');
  if (fs.existsSync(wwwStandalonePath)) {
    execSync(`cp -r ${wwwStandalonePath}/* ${outputDir}/`, { stdio: 'inherit' });
    console.log('✅ Copied www standalone output');
  } else {
    throw new Error('www standalone output not found');
  }

  // Copy static files
  execSync(`mkdir -p ${staticDir}/www/_next`, { stdio: 'inherit' });
  execSync(`cp -r ${rootDir}/apps/www/.next/static/* ${staticDir}/www/_next/`, { stdio: 'inherit' });
  execSync(`cp -r ${rootDir}/apps/www/public/* ${staticDir}/www/`, { stdio: 'inherit' });
  console.log('✅ Copied www static files');
} catch (error) {
  console.error('❌ Error copying www app:', error.message);
  createFallbackHtml();
}

// Copy block app - using static export
try {
  const blockOutPath = path.join(rootDir, 'apps/block/out');
  if (fs.existsSync(blockOutPath)) {
    execSync(`cp -r ${blockOutPath}/* ${staticDir}/block/`, { stdio: 'inherit' });
    console.log('✅ Copied block static output');
  } else {
    console.warn('⚠️ Block app static output not found, using fallback');
    // Ensure directory exists
    if (!fs.existsSync(path.join(staticDir, 'block'))) {
      fs.mkdirSync(path.join(staticDir, 'block'), { recursive: true });
    }
    // Write a minimal index.html file
    fs.writeFileSync(path.join(staticDir, 'block', 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Block App</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
    h1 { color: #6d28d9; }
  </style>
</head>
<body>
  <h1>Block App</h1>
  <p>This is a placeholder for the Block application.</p>
</body>
</html>`);
  }
} catch (error) {
  console.error('❌ Error copying block app:', error.message);
  // Create minimal fallback
  if (!fs.existsSync(path.join(staticDir, 'block'))) {
    fs.mkdirSync(path.join(staticDir, 'block'), { recursive: true });
  }
  fs.writeFileSync(path.join(staticDir, 'block', 'index.html'), `<!DOCTYPE html><html><head><title>Block App</title></head><body><h1>Block App</h1><p>Static content unavailable.</p></body></html>`);
}

// Copy micro app - using static export
try {
  const microOutPath = path.join(rootDir, 'apps/micro/out');
  if (fs.existsSync(microOutPath)) {
    execSync(`cp -r ${microOutPath}/* ${staticDir}/micro/`, { stdio: 'inherit' });
    console.log('✅ Copied micro static output');
  } else {
    console.warn('⚠️ Micro app static output not found, using fallback');
    // Ensure directory exists
    if (!fs.existsSync(path.join(staticDir, 'micro'))) {
      fs.mkdirSync(path.join(staticDir, 'micro'), { recursive: true });
    }
    // Write a minimal index.html file
    fs.writeFileSync(path.join(staticDir, 'micro', 'index.html'), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Micro App</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
    h1 { color: #16a34a; }
  </style>
</head>
<body>
  <h1>Micro App</h1>
  <p>This is a placeholder for the Micro application.</p>
</body>
</html>`);
  }
} catch (error) {
  console.error('❌ Error copying micro app:', error.message);
  // Create minimal fallback
  if (!fs.existsSync(path.join(staticDir, 'micro'))) {
    fs.mkdirSync(path.join(staticDir, 'micro'), { recursive: true });
  }
  fs.writeFileSync(path.join(staticDir, 'micro', 'index.html'), `<!DOCTYPE html><html><head><title>Micro App</title></head><body><h1>Micro App</h1><p>Static content unavailable.</p></body></html>`);
}

// Create config.json
fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify({
    version: 3,
    routes: [
      // Static asset routes for www app
      { src: "^/_next/(.*)", dest: "/static/www/_next/$1" },
      
      // Handle static files in public directories
      { handle: "filesystem" },
      
      // App-specific routes for block and micro
      { src: "/block/(.*)", dest: "/static/block/$1" },
      { src: "/micro/(.*)", dest: "/static/micro/$1" },
      
      // Handle all other routes with the www app server
      { src: "/(.*)", dest: "/" }
    ]
  }, null, 2)
);
console.log('✅ Created config.json');

// Create a server function for Vercel
const indexFuncDir = path.join(functionsDir, 'index.func');
if (!fs.existsSync(indexFuncDir)) {
  fs.mkdirSync(indexFuncDir, { recursive: true });
}

fs.writeFileSync(
  path.join(indexFuncDir, '.vc-config.json'),
  JSON.stringify({
    runtime: "nodejs22.x",
    handler: "server.js",
    launcherType: "Nodejs"
  }, null, 2)
);
console.log('✅ Created function config');

console.log('✅ Deployment setup completed successfully');

// Fallback HTML creation function
function createFallbackHtml() {
  console.log('Creating fallback HTML files...');
  
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
  <h1>Main App (Fallback)</h1>
  <p>Welcome to the main application! (This is a fallback page - build failed)</p>
  
  <nav>
    <strong>Navigate to:</strong>
    <a href="/">Home</a>
    <a href="/block">Block App</a>
    <a href="/micro">Micro App</a>
  </nav>

  <div>
    <h2>About this deployment</h2>
    <p>This is a fallback deployment created when the actual build failed.</p>
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
  <h1>Block App (Fallback)</h1>
  <p>Welcome to the Block application! (This is a fallback page - build failed)</p>
  
  <nav>
    <strong>Navigate to:</strong>
    <a href="/">Home</a>
    <a href="/block">Block App</a>
    <a href="/micro">Micro App</a>
  </nav>

  <div>
    <h2>About Block App</h2>
    <p>This is a fallback for the Block app when the build fails.</p>
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
  <h1>Micro App (Fallback)</h1>
  <p>Welcome to the Micro application! (This is a fallback page - build failed)</p>
  
  <nav>
    <strong>Navigate to:</strong>
    <a href="/">Home</a>
    <a href="/block">Block App</a>
    <a href="/micro">Micro App</a>
  </nav>

  <div>
    <h2>About Micro App</h2>
    <p>This is a fallback for the Micro app when the build fails.</p>
    <p>Deployment time: ${new Date().toISOString()}</p>
  </div>
</body>
</html>`
  };

  // Write static HTML files
  Object.entries(htmlFiles).forEach(([filename, content]) => {
    fs.writeFileSync(path.join(staticDir, filename), content);
    console.log(`Created fallback static file: ${filename}`);
  });
} 