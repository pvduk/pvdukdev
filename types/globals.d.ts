/**
 * ═════════════════════════════════════════════════════════════════════
 * DECLARAÇÕES AMBIENTAIS GLOBAIS (NODE.JS, BROWSER E SERVICE WORKER)
 * Evita erros de símbolos não declarados em compilação sem pacotes npm
 * ═════════════════════════════════════════════════════════════════════
 */

// Módulos nativos do Node.js (build.js e server.js)
declare module 'fs' { const x: any; export = x; }
declare module 'path' { const x: any; export = x; }
declare module 'http' { const x: any; export = x; }
declare module 'zlib' { const x: any; export = x; }

// Globais do Node.js
declare var require: any;
declare var module: any;
declare var exports: any;
declare var process: any;
declare var __dirname: string;
declare var __filename: string;
declare var Buffer: any;

// Globais do Service Worker (sw.js)
declare var self: any;
declare var caches: any;
declare var clients: any;

// Extensões de interfaces padrão para compatibilidade de Vanilla Web Standards
interface Window {
  [key: string]: any;
}

interface Navigator {
  [key: string]: any;
}

interface Event {
  [key: string]: any;
}

interface Document {
  [key: string]: any;
}

interface Element {
  [key: string]: any;
}

interface HTMLElement {
  [key: string]: any;
}
