const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const user = context.clientContext && context.clientContext.user;
    if (!user) {
      return { statusCode: 401, body: 'Unauthorized' };
    }

    const roles = (user.app_metadata && user.app_metadata.roles) || [];
    if (!roles.includes('paid')) {
      return { statusCode: 403, body: 'Forbidden (Premium only)' };
    }

    const requested = (event.queryStringParameters && event.queryStringParameters.file) || '';
    // validate filename: .pdf only, no slashes
    if (!requested || typeof requested !== 'string' || !requested.toLowerCase().endsWith('.pdf') || requested.includes('/') || requested.includes('..') || requested.includes('\\')) {
      return { statusCode: 400, body: 'Invalid file name' };
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
        'Cache-Control': 'no-store'
      },
      isBase64Encoded: true,
      body: Buffer.from(data).toString('base64')
    };
  } catch (err) {
    return { statusCode: 500, body: 'Server error' };
  }
};


