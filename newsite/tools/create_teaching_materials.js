/*
  Build a printable PDF pack for English tutors.
  Usage:
    1) From the project root (folder that contains newsite/), run:
         npm init -y && npm i pdf-lib
    2) Then generate the PDF:
         node tools/create_teaching_materials.js
    3) Output: newsite/private-files/english-teaching-pack.pdf
*/

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs/promises');
const path = require('path');

async function addWrappedText(page, text, options){
  const {
    x = 48,
    y = 700,
    maxWidth = 500,
    font,
    size = 12,
    color = rgb(0.12, 0.12, 0.12),
    leading = 18
  } = options;

  const words = text.split(/\s+/);
  let line = '';
  let cursorY = y;

  const drawLine = async (ln) => {
    if (!ln) return;
    page.drawText(ln, { x, y: cursorY, size, font, color });
  };

  for (const w of words){
    const test = line ? line + ' ' + w : w;
    const width = font.widthOfTextAtSize(test, size);
    if (width > maxWidth){
      await drawLine(line);
      cursorY -= leading;
      line = w;
      if (cursorY < 72){
        // caller can add a new page if needed; here we simply stop
        break;
      }
    } else {
      line = test;
    }
  }
  await drawLine(line);
  return cursorY - leading;
}

async function addSection(page, title, body, fonts, color){
  const { bold, regular } = fonts;
  const { width, height } = page.getSize();
  // Title
  page.drawText(title, {
    x: 48,
    y: height - 72,
    size: 20,
    font: bold,
    color: color || rgb(0.06,0.53,0.29)
  });
  // Rule
  page.drawLine({ start: {x:48, y: height-78}, end: {x: width-48, y: height-78}, thickness: 1, color: rgb(0.8,0.8,0.8)});
  // Body
  await addWrappedText(page, body, {
    x: 48,
    y: height - 108,
    maxWidth: width - 96,
    font: regular,
    size: 12,
    leading: 18
  });
}

async function createPdf(){
  const pdfDoc = await PDFDocument.create();
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fonts = { regular, bold };

  const green = rgb(0.06, 0.53, 0.29);

  const addPageWith = async (title, body) => {
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    await addSection(page, title, body, fonts, green);
  };

  await addPageWith(
    'Warmers & Starters (10 mins)',
    '1) Two Truths & a Lie: Students write three short facts about their week (two true, one false). Classmates ask follow-up questions and guess the lie. 2) Image Prompt: Show a simple picture and elicit vocabulary using “There is/are” and present continuous (e.g., “They are walking”). 3) Quick Poll: Ask 3–4 quick opinion questions (e.g., “Coffee or tea?”). Students explain their choices with one sentence each.'
  );

  await addPageWith(
    'Vocabulary Focus (15 mins)',
    'Theme: Everyday Innovation. Target words: prototype, breakthrough, habit, device, upgrade, efficient, fragile, assemble, launch, feedback. A) Matching: Match terms to definitions. B) Collocations: Find pairs (e.g., “launch a product”, “collect feedback”). C) Personalize: Which device do you upgrade most often and why?'
  );

  await addPageWith(
    'Reading + Comprehension (20 mins)',
    'Text: “Accidental Inventions”. Short passage about Post-it Notes / Microwave / Penicillin. Tasks: A) Gist: What do all stories have in common? B) Detail: True/False/Not Given for 6 statements. C) Vocabulary-in-text: Underline words with positive/negative connotations and explain why.'
  );

  await addPageWith(
    'Grammar in Context (15 mins)',
    'Focus: Past Simple vs Past Continuous. A) Guided discovery: From the reading, underline examples and identify the rule. B) Controlled practice: Gap-fill (10 sentences). C) Speaking: Mini-stories—students describe a time something unexpected happened while they were doing something else.'
  );

  await addPageWith(
    'Speaking & Discussion (15 mins)',
    'A) Mini-debates: “Accidents are essential for innovation.” “Upgrading every year is wasteful.” B) Role-play: Designer & Customer—give product feedback and negotiate changes. C) Task: In pairs, design a small solution for a real-life problem (one-sentence pitch).'
  );

  await addPageWith(
    'Writing (Homework or 15 mins in class)',
    'Choose ONE: 1) Write a 120–150 word product review including pros, cons, and a suggestion. 2) Write a short story: “The day I discovered something by accident.” Use at least five target words (underline them).'
  );

  await addPageWith(
    'Assessment & Reflection (5 mins)',
    'Exit Ticket: Students complete three prompts—“Today I learned…”, “One new word…”, “One question I still have…”. Optional self-rating for confidence using target language (1–5).'
  );

  await addPageWith(
    'Answer Key (Sample)',
    'Vocabulary Matching (suggested): prototype = first workable model; breakthrough = major discovery;… Grammar Gap-fill: 1) was walking / saw, 2) were cooking / exploded, 3) … (adapt as needed to your chosen reading).'
  );

  await addPageWith(
    'Teacher Notes',
    'Timing is flexible; adapt to class size and level (B1–B2). Use the Warmers to diagnose who needs more speaking support. Encourage note-taking during reading and require evidence for True/False decisions. For speaking tasks, model one example with a confident student before open practice.'
  );

  const bytes = await pdfDoc.save();
  const outPath = path.resolve(__dirname, '../private-files/english-teaching-pack.pdf');
  await fs.writeFile(outPath, bytes);
  console.log('Created:', outPath);
}

createPdf().catch(err => {
  console.error(err);
  process.exit(1);
});


