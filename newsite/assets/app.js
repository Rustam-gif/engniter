
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
  const topicChips = document.getElementById('pdf-topic-chips');
  const freeOnly = document.getElementById('pdf-filter-free');
  const freeSwitch = document.getElementById('pdf-free-switch');
  const allToggle = document.getElementById('pdf-all-toggle');
  const allSwitch = document.getElementById('pdf-all-switch');
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

  // Populate topic controls
  if (topicSelect){
  topicSelect.innerHTML = '';
  const optAllT = document.createElement('option');
  optAllT.value = 'all'; optAllT.textContent = 'All topics';
  topicSelect.appendChild(optAllT);
  Array.from(topicMap.entries()).sort((a,b)=>a[1].localeCompare(b[1])).forEach(([value,label])=>{
    const opt = document.createElement('option');
    opt.value = value; opt.textContent = label;
    topicSelect.appendChild(opt);
  });
  }
  if (topicChips){
    topicChips.querySelectorAll('[data-topic]').forEach(btn=>{
      const t = btn.getAttribute('data-topic');
      // Hide chips that aren't in the dataset to avoid dead filters
      if (t!=='all' && !topicMap.has(t)) btn.style.display = 'none';
    });
  }

  // Build custom level rail (Beginner A1 → Proficient C1)
  const order = ['ALL','A1','A2','B1','B2','C1'];
  levelSelect.innerHTML = '';
  order.forEach(l=>{ const opt=document.createElement('option'); opt.value = l==='ALL'?'all':l; opt.textContent = l; levelSelect.appendChild(opt); });
  if (railRoot){
    railRoot.innerHTML = '';
    const rail = document.createElement('div'); rail.className = 'rail'; railRoot.appendChild(rail);
    const fill = document.createElement('div'); fill.className='fill'; rail.appendChild(fill);
    // Positions must align perfectly with visual circles on the rail
    // Use slight padding to avoid clipping at edges
    const ticks = [6,25,50,75,94];
    const tickEls = ticks.map(p=>{ const t=document.createElement('div'); t.className='tick'; t.style.left=p+'%'; rail.appendChild(t); return t; });
    const thumb = document.createElement('div'); thumb.className='thumb'; thumb.style.left='50%'; thumb.setAttribute('role','slider'); thumb.setAttribute('aria-valuemin','0'); thumb.setAttribute('aria-valuemax','5'); thumb.setAttribute('tabindex','0'); rail.appendChild(thumb);
    const badge = document.createElement('div'); badge.className='badge'; rail.appendChild(badge);
    const labels = document.createElement('div'); labels.className='labels';
    const names=['Beginner','Intermediate','Advanced'];
    const labelBtns = names.map((txt)=>{ const b=document.createElement('button'); b.type='button'; b.className='label'; b.textContent=txt; labels.appendChild(b); return b; });
    railRoot.appendChild(labels);

    // Match the tick positions exactly (in percentages)
    const levelPositions = { 'ALL':2, 'A1':6, 'A2':25, 'B1':50, 'B2':75, 'C1':94 };
    function setLevel(l){
      const base = levelPositions[l] ?? 50;
      const thumbPos = (l==='ALL') ? 6 : base;
      const badgePos = thumbPos;
      thumb.style.left = thumbPos+'%';
      fill.style.width = thumbPos+'%';
      badge.style.left = badgePos+'%';
      levelSelect.value = l==='ALL' ? 'all' : l;
      // Show badge only for specific levels
      if (l==='ALL'){
        badge.classList.remove('show');
      } else {
        badge.textContent = l; badge.classList.add('show');
      }
      if (allToggle){ allToggle.checked = (l==='ALL'); }
      if (allSwitch){ allSwitch.classList.toggle('on', l==='ALL'); }
      railRoot.classList.toggle('all-on', l==='ALL');
      // visual states
      tickEls.forEach(el=>el.classList.remove('active'));
      const map = { 'A1':0,'A2':1,'B1':2,'B2':3,'C1':4 };
      if (l!=='ALL' && map[l]!=null) tickEls[map[l]].classList.add('active');
      const seq = ['A1','A2','B1','B2','C1'];
      labelBtns.forEach((b,i)=>{ b.classList.toggle('active', seq[i]===l); });
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
      // If we are in ALL mode, clicking should switch to nearest specific
      if (best==='ALL') best = 'A1';
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
    let lastPct = 0.5;
    function onMove(ev){
      if (!dragging) return;
      const rect=rail.getBoundingClientRect();
      const clientX = ev.touches? ev.touches[0].clientX : ev.clientX;
      const x=(clientX-rect.left)/rect.width;
      const pct=Math.max(0,Math.min(1,x));
      lastPct = pct;
      const pos = pct*100;
      thumb.style.left = pos+'%';
      fill.style.width = pos+'%';
      const nearest = positionToLevel(pct);
      if (nearest!=='ALL'){
        badge.textContent = nearest;
        badge.style.left = pos+'%';
        badge.classList.add('show');
      }
    }
    function startDrag(e){ dragging=true; railRoot.classList.add('dragging'); onMove(e); }
    function endDrag(){
      dragging=false; railRoot.classList.remove('dragging');
      const nearest = positionToLevel(lastPct);
      if (nearest==='ALL'){ setLevel('A1'); } else { setLevel(nearest); }
    }
    rail.addEventListener('mousedown', e=>{ startDrag(e); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', ()=>{ document.removeEventListener('mousemove', onMove); endDrag(); }, { once:true }); });
    rail.addEventListener('touchstart', e=>{ startDrag(e); document.addEventListener('touchmove', onMove,{passive:false}); document.addEventListener('touchend', ()=>{ document.removeEventListener('touchmove', onMove); endDrag(); }, { once:true }); },{passive:false});
    thumb.addEventListener('mousedown', e=>{ e.stopPropagation(); startDrag(e); document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', ()=>{ document.removeEventListener('mousemove', onMove); endDrag(); }, { once:true }); });
    thumb.addEventListener('touchstart', e=>{ e.stopPropagation(); startDrag(e); document.addEventListener('touchmove', onMove,{passive:false}); document.addEventListener('touchend', ()=>{ document.removeEventListener('touchmove', onMove); endDrag(); }, { once:true }); },{passive:false});

    // Clickable labels
    const seq = ['A1','A2','B1','B2','C1'];
    labelBtns.forEach((b,i)=> b.addEventListener('click', ()=> setLevel(seq[i])) );

    // initialize from URL or default
    const params = new URLSearchParams(window.location.search);
    const urlLevel = (params.get('level')||'').toUpperCase();
    if (order.includes(urlLevel)) setLevel(urlLevel); else setLevel('ALL');
  }

  function activeTopicValue(){
    if (topicChips){
      const activeChip = topicChips.querySelector('.chipbtn.active');
      if (activeChip) return activeChip.getAttribute('data-topic') || 'all';
    }
    return topicSelect.value;
  }

  function render(){
    const activeTopic = activeTopicValue();
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
  topicSelect && topicSelect.addEventListener('change', render);
  if (topicChips){
    topicChips.querySelectorAll('.chipbtn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        topicChips.querySelectorAll('.chipbtn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        render();
      });
    });
    const first = topicChips.querySelector('[data-topic="all"]'); if (first) first.classList.add('active');
  }
  freeOnly && freeOnly.addEventListener('change', ()=>{ if (freeSwitch) freeSwitch.classList.toggle('on', freeOnly.checked); render(); });
  if (freeSwitch){
    freeSwitch.addEventListener('click', ()=>{ freeOnly.checked = !freeOnly.checked; freeSwitch.classList.toggle('on', freeOnly.checked); render(); });
    freeSwitch.classList.toggle('on', !!freeOnly.checked);
  }

  // All-levels toggle sync
  if (allSwitch){
    allSwitch.addEventListener('click', ()=>{
      const on = !(allToggle && allToggle.checked);
      if (allToggle) allToggle.checked = on;
      allSwitch.classList.toggle('on', on);
      setLevel(on ? 'ALL' : (levelSelect.value==='all' ? 'A1' : levelSelect.value));
    });
    allSwitch.classList.toggle('on', !!(allToggle && allToggle.checked));
  }
  // If URL has ?free=1, pre-enable the free-only filter
  try{
    const params = new URLSearchParams(window.location.search);
    if (params.get('free') === '1' && freeOnly){
      freeOnly.checked = true;
    }
  }catch(e){}
  render();
})();
