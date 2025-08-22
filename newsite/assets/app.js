
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
  const topicSelect = document.getElementById('pdf-filter-topic');
  const topicChips = document.getElementById('pdf-topic-chips');
  const freeOnly = document.getElementById('pdf-filter-free');
  const freeSwitch = document.getElementById('pdf-free-switch');
  const levelChips = document.getElementById('level-chips');
  const multiToggleBtn = document.getElementById('multi-toggle-btn');
  const levelCount = document.getElementById('level-count');
  if (!topicSelect || !levelChips) return;

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
    const match = levelPill.match(/A1|A2|B1|B2|C1|C2/i);
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

  // Level chip management
  let isMultiSelect = false;
  let selectedLevels = new Set(['ALL']);

  function updateLevelChips() {
    const chips = levelChips.querySelectorAll('.level-chip');
    chips.forEach(chip => {
      const level = chip.getAttribute('data-level');
      const isSelected = selectedLevels.has(level);
      
      chip.classList.toggle('active', isSelected);
      chip.setAttribute('aria-selected', isSelected);
    });

    // Update count display
    if (isMultiSelect && selectedLevels.size > 0) {
      const count = selectedLevels.has('ALL') ? 'All levels' : `${selectedLevels.size} level${selectedLevels.size !== 1 ? 's' : ''}`;
      levelCount.textContent = count;
    } else {
      levelCount.textContent = '';
    }

    // Update aria-multiselectable
    levelChips.setAttribute('aria-multiselectable', isMultiSelect);
  }

  function selectLevel(level, isShiftClick = false, isMetaClick = false) {
    if (isMultiSelect && (isShiftClick || isMetaClick)) {
      // Multi-select mode with modifier keys
      if (level === 'ALL') {
        selectedLevels.clear();
        selectedLevels.add('ALL');
      } else {
        selectedLevels.delete('ALL');
        if (selectedLevels.has(level)) {
          selectedLevels.delete(level);
          if (selectedLevels.size === 0) {
            selectedLevels.add('ALL');
          }
        } else {
          selectedLevels.add(level);
        }
      }
    } else {
      // Single-select mode or no modifier keys
      if (level === 'ALL') {
        selectedLevels.clear();
        selectedLevels.add('ALL');
      } else {
        selectedLevels.clear();
        selectedLevels.add(level);
      }
    }
    
    updateLevelChips();
    render();
  }

  function toggleMultiSelect() {
    isMultiSelect = !isMultiSelect;
    multiToggleBtn.setAttribute('aria-pressed', isMultiSelect);
    
    if (!isMultiSelect) {
      // Reset to single select - keep only the first selected level
      const firstLevel = Array.from(selectedLevels)[0] || 'ALL';
      selectedLevels.clear();
      selectedLevels.add(firstLevel);
    }
    
    updateLevelChips();
  }



    








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
    const onlyFree = !!(freeOnly && freeOnly.checked);
    cards.forEach(card=>{
      const topicOk = (activeTopic==='all' || card.dataset.topic===activeTopic);
      const levelOk = selectedLevels.has('ALL') || selectedLevels.has(card.dataset.level);
      const freeOk = (!onlyFree || card.dataset.free === 'true');
      card.style.display = (topicOk && levelOk && freeOk) ? '' : 'none';
    });
  }

  topicSelect && topicSelect.addEventListener('change', render);
  
  // Level chip event listeners
  if (levelChips) {
    levelChips.querySelectorAll('.level-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const level = chip.getAttribute('data-level');
        const isShiftClick = e.shiftKey;
        const isMetaClick = e.metaKey || e.ctrlKey;
        selectLevel(level, isShiftClick, isMetaClick);
      });

      // Keyboard navigation
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const level = chip.getAttribute('data-level');
          selectLevel(level);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextChip = chip.nextElementSibling || levelChips.firstElementChild;
          if (nextChip) nextChip.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevChip = chip.previousElementSibling || levelChips.lastElementChild;
          if (prevChip) prevChip.focus();
        }
      });
    });
  }

  // Multi-toggle button
  if (multiToggleBtn) {
    multiToggleBtn.addEventListener('click', toggleMultiSelect);
    multiToggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMultiSelect();
      }
    });
  }

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


  // If URL has ?free=1, pre-enable the free-only filter
  try{
    const params = new URLSearchParams(window.location.search);
    if (params.get('free') === '1' && freeOnly){
      freeOnly.checked = true;
    }
  }catch(e){}
  
  // Initialize level chips
  updateLevelChips();
  render();
})();
