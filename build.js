/**
 * ═════════════════════════════════════════════════════════════════════
 * COSTAR BUILD SYSTEM · ZERO-DEPENDENCY VANILLA COMPILER
 * Minifica HTML, CSS, JS e prepara o bundle de produção em dist/
 * ═════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const startTime = Date.now();

console.log('═══════════════════════════════════════════════════════════');
console.log('🚀 INICIANDO BUILD DE PRODUÇÃO (ZERO-DEPENDENCY)...');
console.log('═══════════════════════════════════════════════════════════\n');

// 1. Limpeza e criação da pasta dist/
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'css'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'css/pages'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'js'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'js/translations'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'assets'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'data'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'blog'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'blog/css'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'blog/js'), { recursive: true });
fs.mkdirSync(path.join(DIST_DIR, 'blog/posts'), { recursive: true });

// 2. Utilitários de Minificação Pura (Sem dependências npm)
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove comentários
    .replace(/\s+/g, ' ')             // colapsa múltiplos espaços
    .replace(/\s*([{}:;,>+~])\s*/g, '$1') // remove espaços ao redor de operadores
    .replace(/;}/g, '}')              // remove último ponto-e-vírgula
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove comentários de bloco
    .replace(/^\s*\/\/.*$/gm, '')      // remove comentários de linha
    .replace(/\s+/g, ' ')             // colapsa espaços
    .replace(/\s*([{}:;,=()+><!&|?])\s*/g, '$1') // remove espaços desnecessários
    .trim();
}

function minifyHTML(html) {
  const preBlocks = [];
  // Protege blocos <pre> para preservar diagramas ASCII e indentação de código
  let placeholderHtml = html.replace(/<pre[\s\S]*?<\/pre>/gi, (match) => {
    preBlocks.push(match);
    return `___PRE_BLOCK_${preBlocks.length - 1}___`;
  });

  placeholderHtml = placeholderHtml
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '') // remove comentários HTML seguros
    .replace(/\s+/g, ' ')                  // colapsa espaços
    .replace(/> </g, '><')                 // remove espaços entre tags adjacentes
    .trim();

  return placeholderHtml.replace(/___PRE_BLOCK_(\d+)___/g, (_, idx) => preBlocks[Number(idx)]);
}

// 3. Arquivos para Processar
const filesToProcess = [
  { src: 'index.html', dest: 'index.html', type: 'html' },
  { src: 'roadmap-requisitos.html', dest: 'roadmap-requisitos.html', type: 'html' },
  { src: '404.html', dest: '404.html', type: 'html' },
  { src: 'blog/index.html', dest: 'blog/index.html', type: 'html' },
  { src: 'blog/posts/TEMPLATE.html', dest: 'blog/posts/TEMPLATE.html', type: 'html' },
  { src: 'blog/posts/2025-01-anatomia-do-cache-o-navegador.html', dest: 'blog/posts/2025-01-anatomia-do-cache-o-navegador.html', type: 'html' },
  { src: 'data/posts.json', dest: 'data/posts.json', type: 'json' },
  { src: 'css/base.css', dest: 'css/base.css', type: 'css' },
  { src: 'css/components.css', dest: 'css/components.css', type: 'css' },
  { src: 'css/pages/home.css', dest: 'css/pages/home.css', type: 'css' },
  { src: 'css/pages/roadmap.css', dest: 'css/pages/roadmap.css', type: 'css' },
  { src: 'blog/css/blog.css', dest: 'blog/css/blog.css', type: 'css' },
  { src: 'js/app.js', dest: 'js/app.js', type: 'js' },
  { src: 'blog/js/blog.js', dest: 'blog/js/blog.js', type: 'js' },
  { src: 'js/translations/pt.js', dest: 'js/translations/pt.js', type: 'js' },
  { src: 'js/translations/en.js', dest: 'js/translations/en.js', type: 'js' },
  { src: 'sw.js', dest: 'sw.js', type: 'js' },
  { src: 'server.js', dest: 'server.js', type: 'js' },
  { src: 'manifest.webmanifest', dest: 'manifest.webmanifest', type: 'json' },
  { src: '.nojekyll', dest: '.nojekyll', type: 'raw' }
];

let totalRawBefore = 0;
let totalRawAfter = 0;
let totalGzipBefore = 0;
let totalGzipAfter = 0;

console.log('📦 Processando e minificando arquivos:');

filesToProcess.forEach(({ src, dest, type }) => {
  const srcPath = path.join(ROOT_DIR, src);
  const destPath = path.join(DIST_DIR, dest);

  if (!fs.existsSync(srcPath)) return;

  const originalContent = fs.readFileSync(srcPath, 'utf8');
  let processedContent = originalContent;

  if (type === 'html') processedContent = minifyHTML(originalContent);
  else if (type === 'css') processedContent = minifyCSS(originalContent);
  else if (type === 'js') processedContent = minifyJS(originalContent);
  else if (type === 'json') {
    try {
      processedContent = JSON.stringify(JSON.parse(originalContent));
    } catch (e) {
      processedContent = originalContent;
    }
  }

  fs.writeFileSync(destPath, processedContent, 'utf8');

  const beforeSize = Buffer.byteLength(originalContent, 'utf8');
  const afterSize = Buffer.byteLength(processedContent, 'utf8');
  const gzipBefore = zlib.gzipSync(Buffer.from(originalContent)).length;
  const gzipAfter = zlib.gzipSync(Buffer.from(processedContent)).length;

  totalRawBefore += beforeSize;
  totalRawAfter += afterSize;
  totalGzipBefore += gzipBefore;
  totalGzipAfter += gzipAfter;

  const pct = ((beforeSize - afterSize) / beforeSize * 100).toFixed(1);
  console.log(`  ✓ ${src.padEnd(28)} ${(beforeSize / 1024).toFixed(1)} KB → ${(afterSize / 1024).toFixed(1)} KB (-${pct}%)`);
});

// 4. Copiar Assets Estáticos (Imagens, Ícones e Fontes WOFF2)
const assetsDir = path.join(ROOT_DIR, 'assets');
const distAssetsDir = path.join(DIST_DIR, 'assets');
if (fs.existsSync(assetsDir)) {
  fs.cpSync(assetsDir, distAssetsDir, { recursive: true });
  console.log(`  ✓ assets/ (assets visuais e fontes locais copiadas recursivamente)`);
}

const duration = Date.now() - startTime;
const rawSaved = ((totalRawBefore - totalRawAfter) / 1024).toFixed(1);
const rawPct = (((totalRawBefore - totalRawAfter) / totalRawBefore) * 100).toFixed(1);
const gzipSaved = ((totalGzipBefore - totalGzipAfter) / 1024).toFixed(1);

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`✨ BUILD CONCLUÍDO COM SUCESSO EM ${duration}ms!`);
console.log('═══════════════════════════════════════════════════════════');
console.log(`📊 Peso Original:   ${(totalRawBefore / 1024).toFixed(1)} KB  (Gzip: ${(totalGzipBefore / 1024).toFixed(1)} KB)`);
console.log(`📦 Peso Minificado: ${(totalRawAfter / 1024).toFixed(1)} KB  (Gzip: ${(totalGzipAfter / 1024).toFixed(1)} KB)`);
console.log(`⚡ Economia Bruta:  ${rawSaved} KB (-${rawPct}%)`);
console.log(`🌐 Economia Rede:   ${gzipSaved} KB`);
console.log('📁 Destino do Build: ./dist/\n');
