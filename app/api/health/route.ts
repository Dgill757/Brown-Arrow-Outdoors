import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const cwd = process.cwd();
  const env = process.env.NODE_ENV;

  const checkFile = (filePath: string) => {
    try {
      return fs.existsSync(path.join(cwd, filePath));
    } catch (e) {
      return false;
    }
  };

  const listDir = (dirPath: string) => {
    try {
      const fullPath = path.join(cwd, dirPath);
      if (!fs.existsSync(fullPath)) return 'Directory not found';
      return fs.readdirSync(fullPath);
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  };

  const checks = {
    '.next/build-manifest.json': checkFile('.next/build-manifest.json'),
    '.next/prerender-manifest.json': checkFile('.next/prerender-manifest.json'),
    '.next/routes-manifest.json': checkFile('.next/routes-manifest.json'),
  };

  const directories = {
    '.': listDir('.'),
    './.next': listDir('./.next'),
  };

  return NextResponse.json({
    cwd,
    env,
    checks,
    directories,
  });
}
