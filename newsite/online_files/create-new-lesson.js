#!/usr/bin/env node

// Script to create new lessons from the template
const fs = require('fs');
const path = require('path');

function createNewLesson(lessonName, topic) {
  const templatePath = path.join(__dirname, 'lesson-template.html');
  const newLessonPath = path.join(__dirname, `${lessonName}_lesson_B2.html`);
  
  try {
    // Read the template
    let content = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders
    content = content.replace(/Your Lesson Title/g, lessonName);
    content = content.replace(/Your lesson subtitle/g, `Learn about ${topic}`);
    content = content.replace(/pictures\/your-topic\/hero\.png/g, `pictures/${topic.toLowerCase().replace(/\s+/g, '-')}/hero.png`);
    content = content.replace(/Your Lesson/g, lessonName);
    
    // Write the new lesson file
    fs.writeFileSync(newLessonPath, content, 'utf8');
    
    console.log(`✅ Created new lesson: ${newLessonPath}`);
    console.log(`📝 Title: ${lessonName}`);
    console.log(`🎯 Topic: ${topic}`);
    console.log(`🖼️  Hero image: pictures/${topic.toLowerCase().replace(/\s+/g, '-')}/hero.png`);
    console.log(`\n🚀 The lesson includes VectorAnnotator and is ready to use!`);
    
  } catch (error) {
    console.error(`❌ Error creating lesson:`, error.message);
  }
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node create-new-lesson.js "Lesson Name" "Topic"');
  console.log('\nExample:');
  console.log('node create-new-lesson.js "Climate Change" "Environmental Science"');
  console.log('\nThis will create: climate-change_lesson_B2.html');
  process.exit(1);
}

const lessonName = args[0];
const topic = args[1];

createNewLesson(lessonName, topic);
