#!/usr/bin/env node

// Script to add VectorAnnotator HTML structure to all lesson HTML files
const fs = require('fs');
const path = require('path');

const files = [
  'aviation_careers_lesson_B2.html',
  'decision_fatigue_lesson_B2.html', 
  'human_memory_future_lesson_B2.html',
  'illusion_of_choice_lesson_A2.html',
  'world_without_sleep_lesson_B2.html'
];

const toolbarHTML = `
  <!-- VectorAnnotator Tool Interface -->
  <div id="va-root-toolbar">
    <button class="va-btn" data-tool="pen" title="Freehand vector pen">✏</button>
    <button class="va-btn" data-tool="text" title="Click + type (vector)">T</button>
    
    <div class="va-sep"></div>
    
    <div class="va-control-group">
      <label>Color <input type="color" value="#0EAA9F"></label>
    </div>
    
    <div class="va-control-group">
      <label>Width <input type="range" min="1" max="20" value="3"></label>
    </div>
    
    <div class="va-control-group">
      <label>Font <input type="number" min="8" max="96" step="1" value="24"></label>
    </div>
    
    <div class="va-sep"></div>
    
    <button class="va-btn" id="va-undo" title="Ctrl/Cmd+Z">↶</button>
    <button class="va-btn" id="va-clear" title="Clear all">×</button>
    <button class="va-btn" id="va-passthru" title="Toggle click-through" data-tool="passthru">👆</button>
    
    <div class="va-sep"></div>
    
    <div class="va-control-group">
      <label>Download <button class="va-btn" id="va-save" title="Print / Save as PDF">⬇</button></label>
    </div>
  </div>

  <!-- SVG Overlay -->
  <div id="va-root-overlay" style="position: fixed; inset: 0; pointer-events: auto; z-index: 999998;">
    <svg id="va-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="display: block; width: 100%; height: 100%; touch-action: none; user-select: none;">
      <defs>
        <style>.stroke{fill:none;stroke-linecap:round;stroke-linejoin:round}</style>
      </defs>
      <g id="va-content"></g>
      <g id="va-ui"></g>
    </svg>
  </div>
`;

function addVectorAnnotatorHTML(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if VectorAnnotator HTML is already added
    if (content.includes('va-root-toolbar') || content.includes('va-root-overlay')) {
      console.log(`✓ VectorAnnotator HTML already exists in ${filePath}`);
      return;
    }
    
    // Add HTML before the closing body tag
    const bodyCloseRegex = /(\s*<\/body>\s*<\/html>\s*)$/;
    if (bodyCloseRegex.test(content)) {
      content = content.replace(bodyCloseRegex, `\n${toolbarHTML}\n$1`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Added VectorAnnotator HTML to ${filePath}`);
    
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

console.log('Adding VectorAnnotator HTML structure to all lesson files...\n');

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    addVectorAnnotatorHTML(filePath);
  } else {
    console.log(`✗ File not found: ${filePath}`);
  }
});

console.log('\nVectorAnnotator HTML integration complete!');
console.log('\nNow all lesson files have:');
console.log('1. VectorAnnotator CSS included');
console.log('2. VectorAnnotator JavaScript included');
console.log('3. VectorAnnotator HTML structure added');
console.log('\nTo test: Open any lesson HTML file in a browser - the toolbar should appear on the right side!');
