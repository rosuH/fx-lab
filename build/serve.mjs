// build/serve.mjs — tiny zero-dep Node static file server
// usage: node build/serve.mjs [dir] — defaults to 'site', serves on localhost:5173
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = process.argv[2] ? join(process.argv[2]) : join(ROOT, 'site');
const PORT = 5173;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  let path = req.url;
  if (path === '/') path = '/index.html';

  // ponytail: normalize path; no ".." traversal in this simple server
  const safePath = path.replace(/\.\./g, '').split('?')[0];
  const file = join(dir, safePath);

  try {
    const stat = statSync(file);
    if (stat.isDirectory()) {
      // Directory: try index.html
      try {
        const indexPath = join(file, 'index.html');
        statSync(indexPath);
        const content = readFileSync(indexPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not Found');
      }
    } else {
      // File: determine content type from extension
      const ext = safePath.slice(safePath.lastIndexOf('.')) || '.txt';
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const content = readFileSync(file);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  } catch {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`serve: listening on http://localhost:${PORT}/ (serving ${dir})`);
});
