
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
  // Get all lesson cards (excluding news promo and other non-lesson cards)
  const cards = document.querySelectorAll('article.card:not(.news-promo):not([data-is-promo="true"]):not([data-skip-processing="true"])');
  
  // Get filter elements
  const topicSelect = document.getElementById('pdf-filter-topic');
  const levelChips = document.getElementById('level-chips');
  const freeOnly = document.getElementById('pdf-filter-free');
  const freeSwitch = document.getElementById('pdf-free-switch');
  
  // Level chip management
  let selectedLevels = new Set(['ALL']);
  
  // Get current filter values
  const activeTopic = topicSelect ? topicSelect.value : 'all';
  
  if (levelChips) {
    levelChips.querySelectorAll('.level-chip.active').forEach(chip => {
      selectedLevels.add(chip.getAttribute('data-level'));
    });
  }
  
  const onlyFree = !!(freeOnly && freeOnly.checked);
  
  console.log('=== RENDER FUNCTION DEBUG ===');
  console.log('freeOnly element:', freeOnly);
  console.log('freeOnly.checked:', freeOnly?.checked);
  console.log('onlyFree calculated:', onlyFree);
  console.log('Total cards found (excluding promo):', cards.length);
  
  cards.forEach((card, index) => {
    // Triple-check: Skip promo cards
    if (card.classList.contains('news-promo') || 
        card.getAttribute('data-is-promo') === 'true' || 
        card.getAttribute('data-skip-processing') === 'true') {
      console.log(`Skipping promo card: ${card.querySelector('.h3')?.textContent}`);
      return;
    }
    
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

  // Populate topic controls
  if (topicSelect){
    topicSelect.innerHTML = '';
    const optAllT = document.createElement('option');
    optAllT.value = 'all'; optAllT.textContent = 'All topics';
    topicSelect.appendChild(optAllT);
    
    // Create topic map from existing cards
    const topicMap = new Map();
    cards.forEach(card => {
      const topicPill = card.querySelector('.pill.topic');
      if (topicPill) {
        const topicText = topicPill.textContent;
        const topicSlug = topicText.toLowerCase().replace(/\s+/g, '-');
        topicMap.set(topicSlug, topicText);
      }
    });
    
    Array.from(topicMap.entries()).sort((a,b)=>a[1].localeCompare(b[1])).forEach(([value,label])=>{
      const opt = document.createElement('option');
      opt.value = value; opt.textContent = label;
      topicSelect.appendChild(opt);
    });
  }

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
    return topicSelect ? topicSelect.value : 'all';
  }

  function render(){
    const activeTopic = activeTopicValue();
    const onlyFree = !!(freeOnly && freeOnly.checked);
    
    console.log('=== RENDER FUNCTION DEBUG ===');
    console.log('freeOnly element:', freeOnly);
    console.log('freeOnly.checked:', freeOnly?.checked);
    console.log('onlyFree calculated:', onlyFree);
    
    cards.forEach((card, index) => {
      // Skip promo cards
      if (card.classList.contains('news-promo') || card.getAttribute('data-is-promo') === 'true') {
        return;
      }
      
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
        const visibleCards = Array.from(document.querySelectorAll('article.card:not(.news-promo)')).filter(card => 
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
    });
  }
  
  // Free filter event listener
  if (freeOnly) {
    freeOnly.addEventListener('change', render);
  }
  
  // Free switch functionality
  if (freeSwitch) {
    freeSwitch.addEventListener('click', () => {
      if (freeOnly) {
        freeOnly.checked = !freeOnly.checked;
        freeSwitch.classList.toggle('on', freeOnly.checked);
        render();
      }
    });
    
    // Set initial state
    freeSwitch.classList.toggle('on', !!(freeOnly && freeOnly.checked));
  }
  
  // Initialize level chips
  updateLevelChips();
  
  // Initial render
  render();
})();
