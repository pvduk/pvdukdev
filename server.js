const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(ROOT, reqPath);

  // Clean URLs support (ex: /roadmap-requisitos -> /roadmap-requisitos.html)
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // Fallback de assets para caminhos aninhados (ex: /qualquer/css/base.css -> ROOT/css/base.css)
  if (!fs.existsSync(filePath)) {
    const ext = path.extname(reqPath).toLowerCase();
    if (ext && ext !== '.html') {
      const parts = reqPath.split('/').filter(Boolean);
      for (let i = 1; i < parts.length; i++) {
        const subCandidate = path.join(ROOT, parts.slice(i).join('/'));
        if (fs.existsSync(subCandidate) && fs.statSync(subCandidate).isFile()) {
          filePath = subCandidate;
          break;
        }
      }
    }
  }

  // Security check: prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const errorPage = path.join(ROOT, '404.html');
      if (fs.existsSync(errorPage)) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        return fs.createReadStream(errorPage).pipe(res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const headers = { 'Content-Type': contentType };

    if (filePath.endsWith('sw.js')) {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      headers['Service-Worker-Allowed'] = '/';
    }

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Servidor local ativo em: http://localhost:${PORT}`);
  console.log(`📱 PWA & Service Worker prontos para teste local`);
  console.log(`⌨️  Pressione Ctrl+C para encerrar\n`);
});
