// Minimal manual test harness (server must be running on :8080)
import http from 'http';

function request(opts, body){
  return new Promise((resolve,reject)=>{
    const req = http.request({
      hostname: 'localhost', port: 8080, method: opts.method || 'GET', path: opts.path,
      headers: { 'Content-Type': 'application/json', ...(opts.headers||{}) }
    }, res => {
      let data=''; res.on('data', c=>data+=c); res.on('end', ()=>resolve({res,data}));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function run(){
  console.log('1) Landing with fbclid…');
  let r = await request({ path: '/?fbclid=FB123&utm_source=facebook&utm_campaign=test' });
  const cookie = (r.res.headers['set-cookie']||[])[0]?.split(';')[0];
  console.log('Cookie:', cookie);

  console.log('2) POST /collect-params…');
  await request({ method:'POST', path:'/collect-params', headers:{ Cookie: cookie } }, JSON.stringify({ visitor_id: (cookie||'').split('=')[1], fbclid: 'FB123', utm_source: 'facebook', utm_campaign: 'test' }));

  console.log('3) POST /event download…');
  await request({ method:'POST', path:'/event', headers:{ Cookie: cookie } }, JSON.stringify({ visitor_id: (cookie||'').split('=')[1], type: 'download', target_url:'https://apps.apple.com/app' }));

  console.log('Done. Inspect database for rows.');
}

run().catch(e=>{ console.error(e); process.exit(1); });

