import fs from 'fs';
import path from 'path';

const cwd = process.cwd();

console.log('--- RUNTIME DIAGNOSTICS ---');
console.log(`CWD: ${cwd}`);
console.log(`Node Version: ${process.version}`);

const checkFile = (filePath) => {
  const fullPath = path.join(cwd, filePath);
  const exists = fs.existsSync(fullPath);
  console.log(`File check: ${filePath} -> ${exists ? 'EXISTS' : 'MISSING'}`);
  return exists;
};

checkFile('package.json');
checkFile('next.config.mjs');
checkFile('app');
checkFile('.next/routes-manifest.json');

console.log('--- END DIAGNOSTICS ---');
