const fs = require('fs');
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

    // Require authentication for all downloads (free or premium)
    if (!user) {
      return { statusCode: 401, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'Unauthorized' };
    }

    // If not paid and not a free file, block
    if (!roles.includes('paid') && !isFreeFile) {
      return { statusCode: 403, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'Forbidden (Premium only)' };
    }

    const filePath = path.resolve(__dirname, '../../private-files', requested);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return { statusCode: 404, body: 'File not found' };
    }

    // Get file stats for content length
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;

    // For large files (>10MB), use streaming approach
    if (fileSize > 10 * 1024 * 1024) {
      // Create read stream for large files
      const stream = fs.createReadStream(filePath);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${requested}"`,
          'Content-Length': fileSize.toString(),
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*'
        },
        body: stream,
        isBase64Encoded: false
      };
    } else {
      // For smaller files, use the original approach
      const data = fs.readFileSync(filePath);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${requested}"`,
          'Content-Length': fileSize.toString(),
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*'
        },
        isBase64Encoded: true,
        body: data.toString('base64')
      };
    }
  } catch (err) {
    console.error('Download error:', err);
    return { statusCode: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'Server error' };
  }
};


