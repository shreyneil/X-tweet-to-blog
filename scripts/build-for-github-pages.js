#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function buildForGitHubPages() {
  try {
    console.log('Building for GitHub Pages...');
    
    // Build the frontend
    await execAsync('npx vite build');
    
    // Check if build was successful
    const distPath = path.join(process.cwd(), 'dist', 'public');
    if (!fs.existsSync(distPath)) {
      throw new Error('Build output directory not found');
    }
    
    // Copy index.html to 404.html for SPA routing
    const indexPath = path.join(distPath, 'index.html');
    const notFoundPath = path.join(distPath, '404.html');
    
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
      console.log('Created 404.html for SPA routing');
    }
    
    // Create .nojekyll file to prevent GitHub Pages from ignoring files with underscores
    const nojekyllPath = path.join(distPath, '.nojekyll');
    fs.writeFileSync(nojekyllPath, '');
    console.log('Created .nojekyll file');
    
    console.log('Build completed successfully!');
    console.log('Output directory:', distPath);
    
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

buildForGitHubPages();