import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load .env and .env.local
dotenv.config({ path: path.join(projectRoot, '.env') });
dotenv.config({ path: path.join(projectRoot, '.env.local'), override: true });

const requiredVars = [
  'SHOPIFY_DOMAIN',
  'SHOPIFY_API_VERSION',
  'STOREFRONT_PUBLIC_TOKEN'
];

const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', `Error: Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please set these variables in your environment or .env file.');
  process.exit(1);
}

// Check for build directory if requested
if (process.argv.includes('--check-build')) {
  const buildDir = path.join(projectRoot, '.next');
  const manifestFile = path.join(buildDir, 'routes-manifest.json');

  if (!fs.existsSync(manifestFile)) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Build artifact (.next/routes-manifest.json) not found.');
    console.error('Please run "npm run build" before starting the server.');
    process.exit(1);
  }
}

console.log('\x1b[32m%s\x1b[0m', 'Preflight checks passed.');
