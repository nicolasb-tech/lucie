const https = require('https');
const http = require('http');

export default async function handler(req, res) {
  const target = new URL(req.url, 'https://n8n.monsieurguiz.fr').toString();
  const proxy = target.startsWith('https:') ? https : http;

  const proxyReq = proxy.request(target, {
    method: req.method,
    headers: { ...req.headers, host: new URL(target).host },
  }, proxyRes => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxyReq);
}
