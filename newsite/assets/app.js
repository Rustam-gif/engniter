
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

// Global function for testing
window.testFilters = function() {
  console.log('Testing filters...');
  console.log('Level chips found:', document.querySelectorAll('.level-chip').length);
  console.log('Topic chips found:', document.querySelectorAll('.chipbtn').length);
  
  // Try to add a simple click handler to test
  const testChip = document.querySelector('.level-chip');
  if (testChip) {
    testChip.addEventListener('click', function() {
      alert('Test click handler works!');
    });
    console.log('Added test click handler to first level chip');
  }
};

// Function to initialize filters
function initializeFilters() {
  console.log('Initializing filters...');
  
  const topicSelect = document.getElementById('pdf-filter-topic');
  const topicChips = document.getElementById('pdf-topic-chips');
  const freeOnly = document.getElementById('pdf-filter-free');
  const freeSwitch = document.getElementById('pdf-free-switch');
  const levelChips = document.getElementById('level-chips');
  const multiToggleBtn = document.getElementById('multi-toggle-btn');
  const levelCount = document.getElementById('level-count');
  
  console.log('Elements found:', {
    levelChips: levelChips,
    topicChips: topicChips,
    multiToggleBtn: multiToggleBtn
  });
  
  // Check if we're on the right page
  if (!levelChips) {
    console.error('Level chips element not found!');
    return;
  }
  
  // Test if we can find the elements by different methods
  console.log('Testing element selection methods:');
  console.log('By ID level-chips:', document.getElementById('level-chips'));
  console.log('By ID pdf-topic-chips:', document.getElementById('pdf-topic-chips'));
  console.log('By class level-chip:', document.querySelectorAll('.level-chip').length);
  console.log('By class chipbtn:', document.querySelectorAll('.chipbtn').length);
    
    const topicSelect = document.getElementById('pdf-filter-topic');
    const topicChips = document.getElementById('pdf-topic-chips');
    const freeOnly = document.getElementById('pdf-filter-free');
    const freeSwitch = document.getElementById('pdf-free-switch');
    const levelChips = document.getElementById('level-chips');
    const multiToggleBtn = document.getElementById('multi-toggle-btn');
    const levelCount = document.getElementById('level-count');
    
    console.log('Elements found:', {
      levelChips: levelChips,
      topicChips: topicChips,
      multiToggleBtn: multiToggleBtn
    });
    
    // Check if we're on the right page
    if (!levelChips) {
      console.error('Level chips element not found!');
      return;
    }
    
    // Test if we can find the elements by different methods
    console.log('Testing element selection methods:');
    console.log('By ID level-chips:', document.getElementById('level-chips'));
    console.log('By ID pdf-topic-chips:', document.getElementById('pdf-topic-chips'));
    console.log('By class level-chip:', document.querySelectorAll('.level-chip').length);
    console.log('By class chipbtn:', document.querySelectorAll('.chipbtn').length);

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

  // Populate topic controls (simplified)
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
    console.log('Setting up level chip event listeners...');
    const levelChipElements = levelChips.querySelectorAll('.level-chip');
    console.log('Found level chip elements:', levelChipElements.length);
    
    levelChipElements.forEach((chip, index) => {
      console.log(`Setting up level chip ${index}:`, chip.textContent);
      
      // Add a simple test click handler first
      chip.addEventListener('click', (e) => {
        alert('Level chip clicked: ' + chip.getAttribute('data-level'));
        console.log('Level chip clicked:', chip.getAttribute('data-level'));
        
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

  // Topic chip event listeners
  if (topicChips){
    console.log('Setting up topic chip event listeners...');
    const topicChipElements = topicChips.querySelectorAll('.chipbtn');
    console.log('Found topic chip elements:', topicChipElements.length);
    
    topicChipElements.forEach((btn, index) => {
      console.log(`Setting up topic chip ${index}:`, btn.textContent);
      
      // Add a simple test click handler first
      btn.addEventListener('click',()=>{
        alert('Topic chip clicked: ' + btn.getAttribute('data-topic'));
        console.log('Topic chip clicked:', btn.getAttribute('data-topic'));
        
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
  
  // Initialize level chips and ensure they're clickable
  if (levelChips) {
    updateLevelChips();
    
    // Double-check that all level chips have event listeners
    levelChips.querySelectorAll('.level-chip').forEach(chip => {
      // Remove any existing listeners to avoid duplicates
      chip.replaceWith(chip.cloneNode(true));
    });
    
    // Re-attach event listeners
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
  
  render();
}

// Make the function globally available
window.initializeFilters = initializeFilters;

// Try to initialize immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFilters);
} else {
  // DOM is already loaded
  initializeFilters();
}
