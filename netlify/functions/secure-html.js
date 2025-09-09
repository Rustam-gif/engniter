const fs = require('fs').promises;
const path = require('path');

// Allowlist of HTML files that are free for everyone (store lowercase for comparison)
const FREE_HTML_FILES = new Set([
  'travel.html',
  'the-science-of-luck.html',
  'objects-that-tell-a-story.html',
  'the-power-of-networking(b1-b2).html',
  'brand.html',
  'introduction-to-devops-practices.html'
]);

exports.handler = async (event, context) => {
  try {
    const requestedRaw = (event.queryStringParameters && event.queryStringParameters.file) || '';
    let requested;
    try { 
      requested = decodeURIComponent(requestedRaw); 
    } catch (_) { 
      requested = requestedRaw; 
    }
    
    if (typeof requested === 'string') {
      requested = requested.trim();
      requested = requested.replace(/^\/+/, '');
      requested = require('path').basename(requested);
    }
    
    // validate filename: .html only, no slashes
    if (!requested || typeof requested !== 'string' || !requested.toLowerCase().endsWith('.html') || requested.includes('/') || requested.includes('..') || requested.includes('\\')) {
      return { statusCode: 400, body: 'Invalid file name' };
    }

    const user = context.clientContext && context.clientContext.user;
    const roles = (user && user.app_metadata && user.app_metadata.roles) || [];
    const isFreeFile = FREE_HTML_FILES.has(requested.toLowerCase());

    // Require authentication for all HTML views (free or premium)
    if (!user) {
      return { 
        statusCode: 401, 
        headers: { 'Access-Control-Allow-Origin': '*' }, 
        body: 'Unauthorized' 
      };
    }

    // If not paid and not a free file, block
    if (!roles.includes('paid') && !isFreeFile) {
      return { 
        statusCode: 403, 
        headers: { 'Access-Control-Allow-Origin': '*' }, 
        body: 'Forbidden (Premium only)' 
      };
    }

    // Read the HTML file from the private-files directory
    const filePath = path.resolve(__dirname, '../../private-files', requested);
    let data;
    try {
      data = await fs.readFile(filePath, 'utf8');
    } catch (e) {
      return { statusCode: 404, body: 'File not found' };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    };
  } catch (error) {
    console.error('Error in secure-html function:', error);
    return { 
      statusCode: 500, 
      headers: { 'Access-Control-Allow-Origin': '*' }, 
      body: 'Internal server error' 
    };
  }
};
