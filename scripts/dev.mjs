import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const filteredArgs = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--host') {
    // Skip --host and its value if present
    if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
      i++;
    }
  } else {
    filteredArgs.push(args[i]);
  }
}

// Ensure we bind to 0.0.0.0 and port 3000
// We add them at the end to override any previous ones if Next.js allows, 
// but we filtered out --host so we should be good.
// Next.js uses -H and -p.

const nextBin = path.resolve(projectRoot, 'node_modules/.bin/next');

const child = spawn(nextBin, ['dev', ...filteredArgs, '-H', '0.0.0.0', '-p', '3000'], { 
  stdio: 'inherit',
  cwd: projectRoot
});

child.on('close', (code) => {
  process.exit(code);
});
