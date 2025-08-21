
(function(){
  // Legacy lesson filters (not used on this site). Guard so it doesn't break other pages.
  const qs = s=>document.querySelector(s);
  const qsa = s=>Array.from(document.querySelectorAll(s));
  const typeSel = qs('#filter-type');
  const levelSel = qs('#filter-level');
  const search = qs('#filter-search');
  const cards = qsa('[data-type][data-level].lesson-card');
  if (!typeSel || !levelSel || !search || !cards.length) return;

  function normalize(s){ return (s||'').toLowerCase().trim(); }

  function apply(){
    const t = typeSel?.value || 'all';
    const l = levelSel?.value || 'all';
    const k = normalize(search?.value || '');
    cards.forEach(card=>{
      const ct = card.dataset.type;
      const cl = card.dataset.level;
      const name = normalize(card.querySelector('.h3').textContent);
      const matchType = (t==='all' || ct===t);
      const matchLevel = (l==='all' || cl===l);
      const matchText = !k || name.includes(k);
      card.style.display = (matchType && matchLevel && matchText) ? '' : 'none';
    });
    const anyVisible = cards.some(c=>c.style.display!== 'none');
    qs('#empty')?.classList.toggle('hidden', anyVisible);
  }

  ;[typeSel, levelSel, search].forEach(el=>el && el.addEventListener('input', apply));
  apply();
})();

// Lightweight button filters for the PDF library
(function(){
  const levelSelect = document.getElementById('pdf-filter-level');
  const topicSelect = document.getElementById('pdf-filter-topic');
  const freeOnly = document.getElementById('pdf-filter-free');
  const railRoot = document.getElementById('pdf-level-rail');
  if (!levelSelect || !topicSelect) return;

  const cards = Array.from(document.querySelectorAll('#pdf-library > article.card'))
    .filter(c=>!c.querySelector('h2'));
  if (!cards.length) return;

  const slug = (s)=> (s||'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const titleCase = (s)=> (s||'').replace(/\w\S*/g, t=>t.charAt(0).toUpperCase()+t.slice(1).toLowerCase());

  // Free files set (lowercased)
  const FREE_FILES = new Set([
    'travel.pdf',
    'the-science-of-luck.pdf',
    'objects-that-tell-a-story.pdf',
    'the-power-of-networking(b1-b2).pdf',
    'brand.pdf'
  ]);

  // Annotate and collect options
  const topicMap = new Map(); // slug -> display label
  const levelSet = new Set(['ALL']);
  cards.forEach(card=>{
    const topicText = card.querySelector('.pill.topic')?.textContent || '';
    const topicSlug = slug(topicText || 'misc');
    const topicLabel = topicText || titleCase(topicSlug.replace(/-/g,' '));
    topicMap.set(topicSlug, topicLabel);
    card.dataset.topic = topicSlug;

    const levelPill = card.querySelector('.pill.level')?.textContent || '';
    const match = levelPill.match(/A1|A2|B1|B2|C1/i);
    const level = match ? match[0].toUpperCase() : 'ALL';
    card.dataset.level = level;
    levelSet.add(level);

    // Mark whether this card represents a free file
    const btn = card.querySelector('[data-premium-file]');
    const fname = (btn && btn.getAttribute('data-premium-file')) || '';
    const isFree = FREE_FILES.has((fname||'').toLowerCase());
    card.dataset.free = isFree ? 'true' : 'false';
  });

  // Populate topic dropdown dynamically
  topicSelect.innerHTML = '';
  const optAllT = document.createElement('option');
  optAllT.value = 'all'; optAllT.textContent = 'All topics';
  topicSelect.appendChild(optAllT);
  Array.from(topicMap.entries()).sort((a,b)=>a[1].localeCompare(b[1])).forEach(([value,label])=>{
    const opt = document.createElement('option');
    opt.value = value; opt.textContent = label;
    topicSelect.appendChild(opt);
  });

  // Build custom level rail (Beginner A1 → Proficient C1)
  const order = ['ALL','A1','A2','B1','B2','C1'];
  levelSelect.innerHTML = '';
  order.forEach(l=>{ const opt=document.createElement('option'); opt.value = l==='ALL'?'all':l; opt.textContent = l; levelSelect.appendChild(opt); });
  if (railRoot){
    railRoot.innerHTML = '';
    const rail = document.createElement('div'); rail.className = 'rail'; railRoot.appendChild(rail);
    const ticks = [5,25,50,75,95];
    const tickEls = ticks.map(p=>{ const t=document.createElement('div'); t.className='tick'; t.style.left=p+'%'; rail.appendChild(t); return t; });
    const thumb = document.createElement('div'); thumb.className='thumb'; thumb.style.left='50%'; thumb.setAttribute('role','slider'); thumb.setAttribute('aria-valuemin','0'); thumb.setAttribute('aria-valuemax','5'); thumb.setAttribute('tabindex','0'); rail.appendChild(thumb);
    const badge = document.createElement('div'); badge.className='badge'; badge.textContent='All Levels'; rail.appendChild(badge);
    const labels = document.createElement('div'); labels.className='labels';
    const labelBtns = ['Beginner','Intermediate','Advanced','Proficient'].map(txt=>{ const b=document.createElement('button'); b.type='button'; b.textContent=txt; labels.appendChild(b); return b; });
    railRoot.appendChild(labels);

    const levelPositions = { 'ALL':50, 'A1':5, 'A2':20, 'B1':40, 'B2':65, 'C1':90 };
    function setLevel(l){
      const pos = levelPositions[l] ?? 50; thumb.style.left = pos+'%'; badge.style.left = pos+'%';
      levelSelect.value = l==='ALL' ? 'all' : l; badge.textContent = (l==='ALL' ? 'All Levels' : l);
      // visual states
      tickEls.forEach(el=>el.classList.remove('active'));
      const map = { 'A1':0,'A2':1,'B1':2,'B2':3,'C1':4 };
      if (l!=='ALL' && map[l]!=null) tickEls[map[l]].classList.add('active');
      labelBtns.forEach((b,i)=>{ b.classList.toggle('active', ['A1','A2','B1','B2','C1'][i]===l); });
      thumb.setAttribute('aria-valuenow', l==='ALL'? '0' : String(['A1','A2','B1','B2','C1'].indexOf(l)+1));
      render();
    }
    rail.addEventListener('click', function(ev){
      const rect = rail.getBoundingClientRect();
      const x = (ev.clientX - rect.left) / rect.width;
      const pct = Math.max(0, Math.min(1, x));
      // snap to closest defined level
      const entries = Object.entries(levelPositions);
      let best = 'ALL', bestd = 1e9;
      entries.forEach(([lvl, p])=>{ const d = Math.abs(p/100 - pct); if (d <= bestd){ bestd=d; best=lvl; } });
      setLevel(best);
    });

    // expose for keyboard a11y
    rail.addEventListener('keydown', function(e){
      const seq = ['A1','A2','B1','B2','C1'];
      const current = (levelSelect.value==='all' ? 'ALL' : levelSelect.value);
      if (e.key==='ArrowRight' || e.key==='ArrowUp'){
        e.preventDefault();
        const idx = seq.indexOf(current==='ALL' ? 'A1' : current);
        setLevel(seq[Math.min(seq.length-1, Math.max(0, idx+1))]);
      } else if (e.key==='ArrowLeft' || e.key==='ArrowDown'){
        e.preventDefault();
        const idx = seq.indexOf(current==='ALL' ? 'A1' : current);
        setLevel(idx<=0 ? 'ALL' : seq[idx-1]);
      } else if (e.key==='Home'){ setLevel('ALL'); }
    });

    // Dragging
    let dragging = false;
    function positionToLevel(pct){
      const entries = Object.entries(levelPositions);
      let best = 'ALL', bestd = 1e9;
      entries.forEach(([lvl, p])=>{ const d = Math.abs(p/100 - pct); if (d <= bestd){ bestd=d; best=lvl; } });
      return best;
    }
    function onMove(ev){ if (!dragging) return; const rect=rail.getBoundingClientRect(); const clientX = ev.touches? ev.touches[0].clientX : ev.clientX; const x=(clientX-rect.left)/rect.width; const pct=Math.max(0,Math.min(1,x)); setLevel(positionToLevel(pct)); }
    rail.addEventListener('mousedown', e=>{ dragging=true; onMove(e); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', ()=>{ dragging=false; document.removeEventListener('mousemove', onMove); }, { once:true }); });
    rail.addEventListener('touchstart', e=>{ dragging=true; onMove(e); document.addEventListener('touchmove', onMove,{passive:false}); document.addEventListener('touchend', ()=>{ dragging=false; document.removeEventListener('touchmove', onMove); }, { once:true }); },{passive:false});
    thumb.addEventListener('mousedown', e=>{ e.stopPropagation(); dragging=true; document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', ()=>{ dragging=false; document.removeEventListener('mousemove', onMove); }, { once:true }); });
    thumb.addEventListener('touchstart', e=>{ e.stopPropagation(); dragging=true; document.addEventListener('touchmove', onMove,{passive:false}); document.addEventListener('touchend', ()=>{ dragging=false; document.removeEventListener('touchmove', onMove); }, { once:true }); },{passive:false});

    // Clickable labels
    const seq = ['A1','A2','B1','B2','C1'];
    labelBtns.forEach((b,i)=> b.addEventListener('click', ()=> setLevel(seq[i])) );

    // initialize from URL or default
    const params = new URLSearchParams(window.location.search);
    const urlLevel = (params.get('level')||'').toUpperCase();
    if (order.includes(urlLevel)) setLevel(urlLevel); else setLevel('ALL');
  }

  function render(){
    const activeTopic = topicSelect.value;
    const rawLevel = levelSelect.value;
    const activeLevel = rawLevel && rawLevel !== 'all' ? rawLevel.toUpperCase() : 'ALL';
    const onlyFree = !!(freeOnly && freeOnly.checked);
    cards.forEach(card=>{
      const topicOk = (activeTopic==='all' || card.dataset.topic===activeTopic);
      const levelOk = (activeLevel==='ALL' || card.dataset.level===activeLevel);
      const freeOk = (!onlyFree || card.dataset.free === 'true');
      card.style.display = (topicOk && levelOk && freeOk) ? '' : 'none';
    });
  }

  levelSelect.addEventListener('change', render);
  topicSelect.addEventListener('change', render);
  freeOnly && freeOnly.addEventListener('change', render);
  // If URL has ?free=1, pre-enable the free-only filter
  try{
    const params = new URLSearchParams(window.location.search);
    if (params.get('free') === '1' && freeOnly){
      freeOnly.checked = true;
    }
  }catch(e){}
  render();
})();
