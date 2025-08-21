
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

  // Populate level dropdown dynamically
  const order = ['ALL','A1','A2','B1','B2','C1'];
  levelSelect.innerHTML = '';
  order.filter(l=>levelSet.has(l)).forEach(l=>{
    const opt = document.createElement('option');
    opt.value = l==='ALL' ? 'all' : l; opt.textContent = l==='ALL' ? 'All levels' : l;
    levelSelect.appendChild(opt);
  });

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
  render();
})();
