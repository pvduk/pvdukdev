const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

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
  const method = (req.method || 'GET').toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, {
      'Content-Type': 'text/plain',
      'Allow': 'GET, HEAD'
    });
    return res.end('405 Method Not Allowed');
  }

  let reqPath;
  try {
    reqPath = decodeURI((req.url || '/').split('?')[0]);
  } catch (_) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('400 Bad Request');
  }

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

  // Security check: prevent directory traversal (boundary-safe check)
  const resolvedPath = path.resolve(filePath);
  if (resolvedPath !== ROOT && !resolvedPath.startsWith(ROOT + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }
  filePath = resolvedPath;

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const errorPage = path.join(ROOT, '404.html');
      if (fs.existsSync(errorPage)) {
        res.writeHead(404, {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com;"
        });
        if (method === 'HEAD') {
          return res.end();
        }
        const errorStream = fs.createReadStream(errorPage);
        errorStream.on('error', () => { if (!res.headersSent) res.writeHead(500); res.end(); });
        return errorStream.pipe(res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const headers = {
      'Content-Type': contentType,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com;"
    };

    if (filePath.endsWith('sw.js')) {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      headers['Service-Worker-Allowed'] = '/';
    }

    // IETF RFC 9218 (Extensible Prioritization Scheme for HTTP)
    if (ext === '.woff2' || ext === '.css') {
      headers['Priority'] = 'u=0, i';
    }

    // IETF RFC 8878 (Zstandard Compression) e negociacao Accept-Encoding
    const acceptEncoding = (req.headers['accept-encoding'] || '').toLowerCase();
    const compressible = ['.html', '.css', '.js', '.json', '.svg', '.webmanifest'].includes(ext);

    if (compressible) {
      headers['Vary'] = 'Accept-Encoding';
      if (acceptEncoding.includes('zstd') && !acceptEncoding.includes('zstd;q=0') && typeof zlib.createZstdCompress === 'function') {
        headers['Content-Encoding'] = 'zstd';
        res.writeHead(200, headers);
        if (method === 'HEAD') {
          return res.end();
        }
        const stream = fs.createReadStream(filePath);
        const compress = zlib.createZstdCompress();
        stream.on('error', () => { if (!res.headersSent) res.writeHead(500); res.end(); });
        compress.on('error', () => { if (!res.headersSent) res.writeHead(500); res.end(); });
        return stream.pipe(compress).pipe(res);
      }
    }

    res.writeHead(200, headers);
    if (method === 'HEAD') {
      return res.end();
    }
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => { if (!res.headersSent) res.writeHead(500); res.end(); });
    stream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`\n🚀 Servidor local ativo em: http://localhost:${PORT}`);
    console.log(`📱 PWA e Service Worker prontos para teste local`);
    console.log(`⌨️  Pressione Ctrl+C para encerrar\n`);
  });
}

module.exports = server;
