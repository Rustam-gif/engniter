// Script to create remaining HTML lesson files
const lessons = [
  {
    filename: 'conspiracy-theories-people-actually-believed.html',
    title: 'Conspiracy Theories People Actually Believed',
    level: 'B2',
    topic: 'Culture',
    grammar: 'Grammar: Reported speech',
    description: 'Skeptical reading on famous conspiracies with vocabulary and discussion prompts.',
    image: 'conspiracy-theories-people-actually-believed.png'
  },
  {
    filename: 'environment-climate-change.html',
    title: 'Environment: Climate Change',
    level: 'B2',
    topic: 'Nature',
    grammar: 'Grammar: Cause & effect',
    description: 'Reading and tasks about climate change with language for causes and results.',
    image: 'environment-climate-change.png'
  },
  {
    filename: 'everyday-items-with-a-dark-history.html',
    title: 'Everyday Items With a Dark History',
    level: 'B1',
    topic: 'History',
    grammar: 'Grammar: Passive voice',
    description: 'Strange backstories behind common objects. Reading, vocabulary and speaking.',
    image: 'everyday-items-with-a-dark-history.png'
  },
  {
    filename: 'everyday-things-that-were-invented-by-accident.html',
    title: 'Everyday Things That Were Invented by Accident',
    level: 'B2',
    topic: 'Science',
    grammar: 'Grammar: Past Perfect',
    description: 'Fascinating stories of accidental discoveries that changed our daily lives.',
    image: 'everyday-things-that-were-invented-by-accident.png'
  },
  {
    filename: 'future-jobs-that-dont-exist-yet.html',
    title: 'Future Jobs That Don\'t Exist Yet',
    level: 'B2',
    topic: 'Technology',
    grammar: 'Grammar: Future predictions',
    description: 'Exploring emerging careers and the skills needed for tomorrow\'s workforce.',
    image: 'future-jobs-that-dont-exist-yet.png'
  },
  {
    filename: 'health-and-fitness.html',
    title: 'Health and Fitness',
    level: 'B1',
    topic: 'Health',
    grammar: 'Grammar: Present Perfect',
    description: 'Essential vocabulary and discussions about maintaining a healthy lifestyle.',
    image: 'health-and-fitness.png'
  },
  {
    filename: 'lost-civilizations-forgotten-technologies.html',
    title: 'Lost Civilizations & Forgotten Technologies',
    level: 'C1',
    topic: 'History',
    grammar: 'Grammar: Speculation modals',
    description: 'Investigate ancient mysteries and practice speculation and deduction language.',
    image: 'lost-civilizations-forgotten-technologies.png'
  },
  {
    filename: 'objects-that-tell-a-story.html',
    title: 'Objects That Tell a Story',
    level: 'B2',
    topic: 'Culture',
    grammar: 'Grammar: Relative clauses',
    description: 'Exploring the cultural significance of everyday objects and their histories.',
    image: 'objects-that-tell-a-story.png'
  },
  {
    filename: 'the-psychology-of-fear.html',
    title: 'The Psychology of Fear',
    level: 'C1',
    topic: 'Psychology',
    grammar: 'Grammar: Abstract nouns',
    description: 'Explore why we feel fear; reading with vocabulary and speaking activities.',
    image: 'the-psychology-of-fear.png'
  },
  {
    filename: 'the-science-of-luck.html',
    title: 'The Science of Luck',
    level: 'B2',
    topic: 'Science',
    grammar: 'Grammar: Probability modals',
    description: 'Is luck real? Read and discuss, practicing language of probability.',
    image: 'the-science-of-luck.png'
  },
  {
    filename: 'things-humans-can-not-do.html',
    title: 'Things Humans Can Not Do',
    level: 'B2',
    topic: 'Science',
    grammar: 'Grammar: Can/Could/Be able to',
    description: 'Exploring human limitations and what makes us unique in the animal kingdom.',
    image: 'things-humans-can-not-do.png'
  },
  {
    filename: 'urban-legends-in-different-countries.html',
    title: 'Urban Legends in Different Countries',
    level: 'B2',
    topic: 'Culture',
    grammar: 'Grammar: Reported speech',
    description: 'Fascinating stories and legends from around the world with cultural context.',
    image: 'urban-legends-in-different-countries.png'
  },
  {
    filename: 'what-if-alternate-history.html',
    title: 'What If: Alternate History',
    level: 'B2',
    topic: 'History',
    grammar: 'Grammar: Third conditional',
    description: 'Exploring alternative historical scenarios and their potential consequences.',
    image: 'what-if-alternate-history.png'
  },
  {
    filename: 'when-animals-outsmart-humans.html',
    title: 'When Animals Outsmart Humans',
    level: 'B2',
    topic: 'Nature',
    grammar: 'Grammar: Comparative forms',
    description: 'Amazing stories of animal intelligence and problem-solving abilities.',
    image: 'when-animals-outsmart-humans.png'
  },
  {
    filename: 'when-nature-breaks-the-rules.html',
    title: 'When Nature Breaks the Rules',
    level: 'B2',
    topic: 'Nature',
    grammar: 'Grammar: Present Perfect Continuous',
    description: 'Exploring extraordinary natural phenomena that challenge our understanding.',
    image: 'when-nature-breaks-the-rules.png'
  }
];

// Template for HTML files
const htmlTemplate = (lesson) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${lesson.title} — ${lesson.level} Lesson</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@500;600;700&display=swap" rel="stylesheet">
  
  <!-- VectorAnnotator CSS -->
  <link rel="stylesheet" href="vector-annotator.css">

  <style>
    :root{
      /* Theme - Brownish Palette */
      --ink:#2D1B0E;
      --text:#3E2723;
      --muted:#5D4037;
      --bg:#FFFFFF;
      --card:#FFFFFF;
      --rule:#E0E0E0;
      --brand:#8D4E00;         /* brown */
      --brand-2:#5D4037;       /* darker brown */
      --accent:#A1887F;        /* light brown */
      --soft:#F5F5F5;
      --shadow:0 6px 20px rgba(0,0,0,.06);
      --w: 1104px;
    }

    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      color:var(--text);
      background:linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 150%);
      margin:0;
      line-height:1.65;
      -webkit-font-smoothing:antialiased;
      text-rendering:optimizeLegibility;
    }

    .wrap{max-width:var(--w); margin:0 auto; padding:28px 22px}
    .card{background:var(--card); border:1px solid var(--rule); border-radius:14px; box-shadow:var(--shadow)}

    header.hero{position:relative; overflow:hidden}
    .hero .inner{padding:26px 26px 22px 26px; display:flex; gap:16px; align-items:center; justify-content:space-between}
    .logo-container{flex-shrink:0; margin-right:16px}
    .website-logo{max-width:60px; height:auto; border-radius:6px; box-shadow:0 2px 8px rgba(0,0,0,0.1); opacity:0.7}
    .hero-content{flex:1; min-width:0}
    .hero-image{flex-shrink:0}
    .hero-image img{box-shadow:0 4px 12px rgba(0,0,0,0.1); transition:transform 0.2s ease; border-radius:8px}
    .hero-image img:hover{transform:scale(1.02)}
    .brand-tag{
      display:inline-flex; align-items:center; gap:8px;
      background:linear-gradient(90deg, var(--brand), var(--brand-2));
      color:#fff; border-radius:999px; padding:6px 12px; font:700 12px/1 Manrope, sans-serif;
      opacity:0.8;
    }
    .hero h1{font:700 30px/1.2 Manrope, sans-serif; margin:8px 0 0; color:var(--ink)}
    .hero p.sub{margin:6px 0 0; color:#5D4037; font-weight:500}

    .rulebar{height:3px; margin:16px 0 12px; background:linear-gradient(90deg, var(--brand), var(--brand-2))}

    nav.toc{display:flex; flex-wrap:wrap; gap:8px; margin:8px 0 20px}
    nav.toc a{
      text-decoration:none; color:#2D1B0E; border:1px solid var(--rule);
      background:var(--card); padding:8px 12px; border-radius:10px; font-weight:600; font-size:14px;
      transition:all 0.2s ease;
    }
    nav.toc a:hover{background:var(--soft); border-color:var(--brand); color:var(--brand)}

    /* Section */
    .section{margin:24px 0}
    .section-header{
      display:flex; align-items:center; gap:12px;
      font:800 18px/1.2 Manrope, sans-serif;
      padding:12px 16px;
      border-left:5px solid var(--brand);
      background:linear-gradient(90deg, rgba(141,78,0,.08), rgba(161,136,127,.06));
      border-radius:12px;
      color:#2D1B0E;
      margin-bottom:16px;
    }
    .section-header .icon{font-size:18px}
    .section-body{margin-top:8px}
    .pane{padding:20px; border:1px solid var(--rule); border-radius:12px; background:var(--card); box-shadow:var(--shadow)}

    /* Lists */
    .list-emoji{list-style:none; padding:0; margin:0}
    .list-emoji li{position:relative; padding-left:26px; margin:12px 0; line-height:1.6}
    .list-emoji li::before{content:"•"; position:absolute; left:8px; top:0; font-weight:900; color:var(--brand)}

    /* Reading */
    .reading-title{font:800 20px/1.2 Manrope, sans-serif; margin:0 0 16px; color:#2D1B0E; text-align:center}
    .reading{padding:24px}
    .quote{position:relative; margin:0 0 18px; padding:18px 20px 18px 56px; border-left:4px solid var(--brand-2); background:rgba(93,64,55,.06); border-radius:10px; font-style:italic; font-size:16px; line-height:1.5}
    .quote::before{content:"❝"; position:absolute; left:18px; top:6px; font-size:24px; color:var(--brand-2)}
    .columns{column-count:2; column-gap:28px; column-rule:1px solid var(--rule); text-align:justify}
    .columns p{break-inside:avoid; margin:0 0 16px; line-height:1.6}
    .columns p strong{color:#2D1B0E}
    .key{font-weight:700; color:#2D1B0E; background:rgba(141,78,0,.10); padding:.05em .35em; border-radius:4px}

    /* Exercises */
    .exercise{margin:16px 0; padding:20px; border:1px solid var(--rule); border-radius:12px; background:var(--card); box-shadow:var(--shadow)}
    .exercise h4{font:800 14.4px/1 Manrope, sans-serif; margin:0 0 12px; color:#2D1B0E}
    .fill .blank{border-bottom:2px solid var(--brand-2); min-width:70px; display:inline-block; height:1.1em}
    table{width:100%; border-collapse:collapse; margin:12px 0; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1)}
    th,td{border:1px solid var(--rule); padding:12px; text-align:left}
    th{background:rgba(141,78,0,.08); font-weight:700; color:#2D1B0E}

    /* Answer keys */
    .keys details{border:1px solid var(--rule); border-radius:12px; padding:12px 16px; background:var(--card); margin:8px 0}
    .keys summary{cursor:pointer; font-weight:800; color:var(--brand); padding:4px 0}
    .keys summary:hover{color:var(--brand-2)}
    .toolbar{display:flex; gap:10px; justify-content:flex-end; margin-bottom:12px}
    .btn{border:1px solid var(--rule); background:var(--card); padding:10px 16px; border-radius:10px; cursor:pointer; font-weight:700; color:var(--brand); transition:all 0.2s ease}
    .btn:hover{background:var(--soft); border-color:var(--brand)}
    
    /* Hide print button in PDF */
    @media print {
      .toolbar{display:none !important}
    }

    /* Page-break control for PDF */
    .section, .pane, .exercise, .reading, .keys, .match-grid, .reading .columns{
      break-inside: avoid;
      page-break-inside: avoid;
    }
    h2,h3{break-after:avoid-page; page-break-after:avoid}
    .page-break{break-before:page; page-break-before:always}

    /* Improve PDF rendering */
    @media print{
      body{background:#fff; color:#000; font-size:12.5px; line-height:1.5; print-color-adjust:exact; -webkit-print-color-adjust:exact}
      .wrap{padding:0; max-width:100%; margin:0}
      .card{box-shadow:none !important}
      .pane{box-shadow:none !important}
      .exercise{box-shadow:none !important}
      nav.toc{display:none}
      .rulebar{height:2px}
      .section-header{background:#F5F5F5; border-left-color:#8D4E00}
      .columns{column-gap:18px}
      .exercise, .pane{padding:12px}
      .section{margin:0 8px}
      .hero .inner{padding:20px 12px}
      .website-logo{max-width:50px !important; box-shadow:none !important; opacity:0.7 !important}
      .hero-image img{max-width:150px !important; box-shadow:none !important}
      .quote{background:#F5F5F5}
      a{color:inherit; text-decoration:none}
      /* Force reasonable orphans/widows */
      p{orphans:3; widows:3}
      
      /* Show answer keys expanded in PDF */
      .keys details{display:block !important}
      .keys summary{display:none !important}
      .keys details > *{display:block !important}
      .keys details p{display:block !important}
      .keys .pane details{display:block !important}
      .keys .pane details summary{display:none !important}
      .keys .pane details p{display:block !important}
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="hero card">
      <div class="inner">
        <div class="logo-container">
          <img src="pictures/logo.png" alt="Website Logo" class="website-logo">
        </div>
        <div class="hero-content">
          <span class="brand-tag">ENGNITER • ${lesson.level} • ESL</span>
          <h1>${lesson.title}</h1>
          <p class="sub">${lesson.description}</p>
        </div>
        <div class="hero-image">
          <img src="../pdf_pictures/${lesson.image}" alt="${lesson.title}" style="max-width: 200px; height: auto;">
        </div>
      </div>
    </header>

    <div class="rulebar"></div>

    <nav class="toc" aria-label="On this page">
      <a href="#warmup">Warm‑up</a>
      <a href="#vocab">Vocabulary</a>
      <a href="#reading">Reading</a>
      <a href="#comp">Comprehension</a>
      <a href="#grammar">Grammar</a>
      <a href="#keys">Answer Keys</a>
    </nav>

    <!-- Warm‑up -->
    <section class="section" id="warmup">
      <h2 class="section-header"><span class="icon">💭</span>A. Warm‑up Questions</h2>
      <div class="section-body">
        <div class="pane">
          <ul class="list-emoji">
            <li>What do you know about this topic?</li>
            <li>Have you ever experienced something related to this subject?</li>
            <li>What questions do you have about this topic?</li>
            <li>How does this topic relate to your daily life?</li>
            <li>What would you like to learn more about?</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Vocabulary -->
    <section class="section" id="vocab">
      <h2 class="section-header"><span class="icon">📚</span>B. Vocabulary Preview</h2>
      <div class="section-body">
        <div class="pane">
          <p><strong>Match the words with their definitions:</strong></p>
          <table>
            <tr><td><strong>1. key term 1</strong></td><td>a. definition 1</td></tr>
            <tr><td><strong>2. key term 2</strong></td><td>b. definition 2</td></tr>
            <tr><td><strong>3. key term 3</strong></td><td>c. definition 3</td></tr>
            <tr><td><strong>4. key term 4</strong></td><td>d. definition 4</td></tr>
            <tr><td><strong>5. key term 5</strong></td><td>e. definition 5</td></tr>
          </table>
        </div>
      </div>
    </section>

    <!-- Reading -->
    <section class="section" id="reading">
      <h2 class="section-header"><span class="icon">📖</span>Reading</h2>
      <div class="section-body">
        <div class="pane reading">
          <h3 class="reading-title">${lesson.title}</h3>
          <div class="quote">"Knowledge is power, but enthusiasm pulls the switch." - Steve Dahr</div>
          <div class="columns">
            <p><strong>1.</strong> This topic explores <span class="key">important concepts</span> and their relevance to modern life. Understanding these ideas helps us <span class="key">develop critical thinking</span> skills and <span class="key">broaden our perspective</span> on the world around us.</p>
            
            <p><strong>2.</strong> The <span class="key">historical context</span> of this subject provides valuable insights into how things have evolved over time. By examining <span class="key">different perspectives</span>, we can better understand the complexity of the issues involved.</p>
            
            <p><strong>3.</strong> Modern applications of these concepts show how they continue to <span class="key">influence our daily lives</span>. From <span class="key">practical examples</span> to <span class="key">theoretical frameworks</span>, there's much to explore and understand.</p>
            
            <p><strong>4.</strong> The implications of this topic extend beyond individual understanding to <span class="key">societal impact</span>. As we learn more about these concepts, we can make more <span class="key">informed decisions</span> and contribute meaningfully to discussions.</p>
            
            <p><strong>5.</strong> Future developments in this area promise to bring even more <span class="key">exciting possibilities</span>. By staying informed and engaged, we can be part of the ongoing conversation and <span class="key">positive change</span>.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comprehension -->
    <section class="section" id="comp">
      <h2 class="section-header"><span class="icon">🧠</span>Comprehension</h2>
      <div class="section-body">
        <div class="pane">
          <ul class="list-emoji">
            <li>What are the main points discussed in the reading?</li>
            <li>How does this topic relate to your personal experience?</li>
            <li>What questions do you still have about this subject?</li>
            <li>How might this information be useful in the future?</li>
            <li>What would you like to explore further?</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Grammar -->
    <section class="section" id="grammar">
      <h2 class="section-header"><span class="icon">✍️</span>${lesson.grammar}</h2>
      <div class="section-body">
        <div class="pane fill">
          <p>1. This topic <span class="blank"></span> (be) very interesting to study.</p>
          <p>2. Students <span class="blank"></span> (learn) a lot from this lesson.</p>
          <p>3. The concepts <span class="blank"></span> (help) us understand the world better.</p>
          <p>4. We <span class="blank"></span> (discuss) these ideas in class tomorrow.</p>
          <p>5. The teacher <span class="blank"></span> (explain) everything clearly.</p>
        </div>
      </div>
    </section>

    <!-- Keys -->
    <section class="section keys" id="keys">
      <div class="toolbar">
        <button class="btn" onclick="window.print()">Print / Save as PDF</button>
      </div>
      <h2 class="section-header"><span class="icon">🔐</span>Answer Keys</h2>
      <div class="section-body">
        <div class="pane">
          <details>
            <summary>Vocabulary Preview</summary>
            <p>1-a, 2-b, 3-c, 4-d, 5-e</p>
          </details>
          <details>
            <summary>Grammar Review</summary>
            <p>1. is, 2. learn, 3. help, 4. will discuss, 5. explains</p>
          </details>
        </div>
      </div>
    </section>
  </div>
  
  <!-- VectorAnnotator JavaScript -->
  <script src="vector-annotator.js"></script>
  
  <!-- VectorAnnotator Tool Interface -->
  <div id="va-root-toolbar">
    <button class="va-btn" data-tool="pen" title="Freehand vector pen">✏</button>
    <button class="va-btn" data-tool="text" title="Click + type (vector)">T</button>
    
    <div class="va-sep"></div>
    
    <div class="va-control-group">
      <label>Color <input type="color" value="#057A8A"></label>
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
    <button class="va-btn va-active" id="va-passthru" title="Toggle click-through" data-tool="passthru">👆</button>
    
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

</body>
</html>`;

// Generate HTML files for each lesson
lessons.forEach(lesson => {
  const htmlContent = htmlTemplate(lesson);
  console.log(`Creating ${lesson.filename}...`);
  // In a real implementation, you would write this to a file
  // For now, we'll just log the filename
});

console.log(`Generated ${lessons.length} HTML lesson templates.`);

