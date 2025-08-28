
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
  
  // Check if we're on the right page
  if (!levelChips) return;

  const cards = Array.from(document.querySelectorAll('article.card'))
    .filter(card => {
      const hasH2 = card.querySelector('h2');
      const hasH3 = card.querySelector('h3');
      return hasH3 && !hasH2; // We want cards with h3 but not h2
    });

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

  // Level chip management
  let selectedLevels = new Set(['ALL']);

  function updateLevelChips() {
    const chips = levelChips.querySelectorAll('.level-chip');
    chips.forEach(chip => {
      const level = chip.getAttribute('data-level');
      const isSelected = selectedLevels.has(level);
      
      chip.classList.toggle('active', isSelected);
      chip.setAttribute('aria-selected', isSelected);
    });
  }

  function selectLevel(level) {
    if (level === 'ALL') {
      selectedLevels.clear();
      selectedLevels.add('ALL');
    } else {
      selectedLevels.clear();
      selectedLevels.add(level);
    }
    
    updateLevelChips();
    render();
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
    
    console.log('=== RENDER FUNCTION DEBUG ===');
    console.log('freeOnly element:', freeOnly);
    console.log('freeOnly.checked:', freeOnly?.checked);
    console.log('onlyFree calculated:', onlyFree);
    
    cards.forEach((card, index) => {
      const topicOk = (activeTopic==='all' || card.dataset.topic===activeTopic);
      const levelOk = selectedLevels.has('ALL') || selectedLevels.has(card.dataset.level);
      const freeOk = (!onlyFree || card.dataset.free === 'true');
      
      console.log(`Card ${index + 1} (${card.querySelector('.h3')?.textContent}):`, {
        topicOk,
        levelOk,
        freeOk,
        topic: card.dataset.topic,
        level: card.dataset.level,
        free: card.dataset.free,
        onlyFree: onlyFree
      });
      
      card.style.display = (topicOk && levelOk && freeOk) ? '' : 'none';
    });
    
    console.log('=== RENDER: FILTERS APPLIED ===');
    console.log('Active topic:', activeTopic);
    console.log('Selected levels:', Array.from(selectedLevels));
    console.log('Free only:', onlyFree);
    
    // Update global filter tracking for pagination system
    window.currentFilters = [];
    if (activeTopic !== 'all') {
      window.currentFilters.push({ type: 'topic', value: activeTopic });
    }
    if (!selectedLevels.has('ALL')) {
      selectedLevels.forEach(level => {
        if (level !== 'ALL') {
          window.currentFilters.push({ type: 'level', value: level });
        }
      });
    }
    if (onlyFree) {
      window.currentFilters.push({ type: 'free', value: true });
    }
    
    console.log('Current filters for pagination:', window.currentFilters);
    
    // Update pagination after filtering
    setTimeout(() => {
      console.log('=== RENDER: UPDATING PAGINATION ===');
      
      // Call pagination update function
      if (typeof window.updatePaginationForVisibleCards === 'function') {
        console.log('Calling updatePaginationForVisibleCards...');
        window.updatePaginationForVisibleCards();
      } else {
        console.log('WARNING: updatePaginationForVisibleCards not available!');
        
        // Fallback: Update pagination manually
        const visibleCards = Array.from(document.querySelectorAll('article.card')).filter(card => 
          card.style.display !== 'none'
        );
        const cardsPerPage = 15;
        const totalPages = Math.ceil(visibleCards.length / cardsPerPage);
        
        console.log('Fallback pagination update:');
        console.log('  Visible cards:', visibleCards.length);
        console.log('  Total pages:', totalPages);
        
        // Update display
        const totalPagesElement = document.getElementById('total-pages');
        const currentPageElement = document.getElementById('current-page');
        if (totalPagesElement && currentPageElement) {
          totalPagesElement.textContent = totalPages;
          currentPageElement.textContent = '1';
        }
        
        // Update button states
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) prevBtn.disabled = true; // Always disabled on page 1
        if (nextBtn) nextBtn.disabled = totalPages <= 1;
        
        console.log('Fallback button states - Prev disabled:', prevBtn?.disabled, 'Next disabled:', nextBtn?.disabled);
      }
    }, 100);
  }

  // Make render function globally accessible
  window.render = render;

  topicSelect && topicSelect.addEventListener('change', render);
  
  // Level chip event listeners
  if (levelChips) {
    levelChips.querySelectorAll('.level-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const level = chip.getAttribute('data-level');
        selectLevel(level);
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



  // Topic chip event listeners
  if (topicChips){
    topicChips.querySelectorAll('.chipbtn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        // Remove active class from all topic chips
        topicChips.querySelectorAll('.chipbtn').forEach(b=>b.classList.remove('active'));
        // Add active class to clicked chip
        btn.classList.add('active');
        render();
      });
    });
    // Set "All" as default active topic
    const first = topicChips.querySelector('[data-topic="all"]'); 
    if (first) first.classList.add('active');
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
  
  // Check if free filter should be enabled from session storage
  try{
    if (sessionStorage.getItem('enableFreeFilter') === 'true' && freeOnly){
      freeOnly.checked = true;
      sessionStorage.removeItem('enableFreeFilter'); // Clear the flag
      // Update the switch visual state
      if (freeSwitch) {
        freeSwitch.classList.toggle('on', freeOnly.checked);
      }
    }
  }catch(e){}
  
  // Initialize level chips
  updateLevelChips();
  render();
})();
