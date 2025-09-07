#!/usr/bin/env node

// Script to add VectorAnnotator to all lesson HTML files
const fs = require('fs');
const path = require('path');

const files = [
  'aviation_careers_lesson_B2.html',
  'decision_fatigue_lesson_B2.html', 
  'human_memory_future_lesson_B2.html',
  'illusion_of_choice_lesson_A2.html',
  'world_without_sleep_lesson_B2.html'
];

function addVectorAnnotator(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if VectorAnnotator is already added
    if (content.includes('vector-annotator.css') || content.includes('vector-annotator.js')) {
      console.log(`✓ VectorAnnotator already exists in ${filePath}`);
      return;
    }
    
    // Add CSS link after fonts
    const fontLinkRegex = /(<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^"]*" rel="stylesheet">)/;
    if (fontLinkRegex.test(content)) {
      content = content.replace(fontLinkRegex, `$1\n  \n  <!-- VectorAnnotator CSS -->\n  <link rel="stylesheet" href="vector-annotator.css">`);
    }
    
    // Add JavaScript before closing body tag
    const bodyCloseRegex = /(\s*<\/body>\s*<\/html>\s*)$/;
    if (bodyCloseRegex.test(content)) {
      content = content.replace(bodyCloseRegex, `\n  \n  <!-- VectorAnnotator JavaScript -->\n  <script src="vector-annotator.js"></script>\n$1`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Added VectorAnnotator to ${filePath}`);
    
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

console.log('Adding VectorAnnotator to all lesson files...\n');

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    addVectorAnnotator(filePath);
  } else {
    console.log(`✗ File not found: ${filePath}`);
  }
});

console.log('\nVectorAnnotator integration complete!');
console.log('\nTo use:');
console.log('1. Open any lesson HTML file in a browser');
console.log('2. The VectorAnnotator toolbar will appear on the right side');
console.log('3. Use the tools to draw, add text, and annotate the lesson');
console.log('4. Click the download button to save as PDF');
