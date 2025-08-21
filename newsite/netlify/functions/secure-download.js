const fs = require('fs').promises;
const path = require('path');

// Allowlist of files that are free for everyone (store lowercase for comparison)
const FREE_FILES = new Set([
  'travel.pdf',
  'the-science-of-luck.pdf',
  'objects-that-tell-a-story.pdf',
  'the-power-of-networking(b1-b2).pdf',
  'brand.pdf'
]);

exports.handler = async (event, context) => {
  try {
    const requestedRaw = (event.queryStringParameters && event.queryStringParameters.file) || '';
    let requested;
    try { requested = decodeURIComponent(requestedRaw); } catch (_) { requested = requestedRaw; }
    if (typeof requested === 'string') {
      requested = requested.trim();
      requested = requested.replace(/^\/+/, '');
      requested = require('path').basename(requested);
    }
    // validate filename: .pdf only, no slashes
    if (!requested || typeof requested !== 'string' || !requested.toLowerCase().endsWith('.pdf') || requested.includes('/') || requested.includes('..') || requested.includes('\\')) {
      return { statusCode: 400, body: 'Invalid file name' };
    }

    const user = context.clientContext && context.clientContext.user;
    const roles = (user && user.app_metadata && user.app_metadata.roles) || [];
    const isFreeFile = FREE_FILES.has(requested.toLowerCase());

    if (!user && !isFreeFile) {
      return { statusCode: 401, body: 'Unauthorized' };
    }

    if (user && !roles.includes('paid') && !isFreeFile) {
      return { statusCode: 403, body: 'Forbidden (Premium only)' };
    }

    const filePath = path.resolve(__dirname, '../../private-files', requested);
    let data;
    try {
      data = await fs.readFile(filePath);
    } catch (e) {
      return { statusCode: 404, body: 'File not found' };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${requested}"`,
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*'
      },
      isBase64Encoded: true,
      body: Buffer.from(data).toString('base64')
    };
  } catch (err) {
    return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'Server error' };
  }
};


