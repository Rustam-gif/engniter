// News Lessons System for Engniter
// Handles news lesson display, filtering, and modal functionality

// Handle missing thumbnail images
function handleImageError(img) {
    img.style.display = 'none';
    const parent = img.parentElement;
    const fallback = document.createElement('div');
    fallback.className = 'news-image-fallback';
    fallback.innerHTML = `
        <div class="fallback-content">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span>News Image</span>
        </div>
    `;
    parent.appendChild(fallback);
}

// Add error handlers to all news images
document.addEventListener('DOMContentLoaded', function() {
    const newsImages = document.querySelectorAll('.news-image img');
    newsImages.forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
});

// News Lessons Data
const newsLessons = {
    "soccer-party": {
        title: "Soccer Star's Party Sparks Disability Rights Backlash",
        level: "B1-B2",
        wordCount: 300,
        date: "2025-08-25",
        topic: "Sports",
        article: "Lamine Yamal, Barcelona's 18-year-old superstar, celebrated his birthday with a big private party in mid-July. Soon after, a Spanish disability rights group, ADEE, said that people with dwarfism were hired as entertainment at the event. The group argued this practice is outdated and harmful because it turns a real physical condition into a joke for others to watch. In their view, it keeps negative stereotypes alive and can make daily life harder for people who already face barriers. ADEE said they would push for legal and social action, and asked authorities to check whether Spain's disability laws were broken. Government officials publicly supported an investigation and asked prosecutors to review any available videos, contracts, or witness statements. Not everyone agreed. One entertainer said the job was voluntary and respectful, and that people with dwarfism, like everyone else, deserve the right to work in roles they choose. Supporters of this view argue that banning certain jobs might remove income from the very people we want to protect. They also say context matters: Are performers treated with respect? Are they paid fairly and given safe conditions? Yamal, a national hero after his breakout season with Spain and Barça, has not made a long public statement about the claims. His team has kept the focus on football while the discussion plays out online, where opinions are split. Some fans demand a clear apology; others want to wait for facts. Whatever the final legal outcome, the moment is important. It raises tough questions about entertainment, work, and dignity. It also reminds us to listen to the people most affected. If performers say the setup is fair and empowering, that matters. If many others say it hurts them, that matters too. Societies change when we keep having honest, respectful conversations—and back them with fair rules that protect everyone.",
        vocabulary: [
            { term: "Perpetuate", definition: "To keep something going (usually something bad or unfair)", example: "Bad habits can perpetuate poor health." },
            { term: "Stereotype", definition: "A fixed idea that doesn't reflect the true diversity of people", example: "Breaking stereotypes helps create understanding." },
            { term: "Dignity", definition: "Being respected and valued as a person", example: "Everyone deserves to be treated with dignity." },
            { term: "Legal action", definition: "Using the law or courts to resolve a problem or get justice", example: "The company took legal action against the competitor." },
            { term: "Investigation", definition: "Official checking to see if rules were broken", example: "Police launched an investigation into the incident." },
            { term: "We're normal", definition: "We are just regular people—expressing equality", example: "People with disabilities often say 'we're normal' to challenge assumptions." }
        ],
        comprehension: [
            { question: "What type of party did Lamine Yamal throw?", type: "multiple", options: ["A small family gathering", "A big private party", "A team meeting", "A charity event"], answer: "A big private party" },
            { question: "Which organization complained about the party?", type: "multiple", options: ["FIFA", "ADEE", "Barcelona FC", "Spanish government"], answer: "ADEE" },
            { question: "The entertainers at the party were people with dwarfism.", type: "truefalse", answer: "True" },
            { question: "Spain's Ministry of Social Rights supported the party organizers.", type: "truefalse", answer: "False" },
            { question: "What did one entertainer say about their treatment?", type: "multiple", options: ["They were disrespected", "The job was voluntary and respectful", "They were forced to leave", "They were not paid"], answer: "The job was voluntary and respectful" }
        ],
        discussion: [
            "Is hiring people based on physical traits respectful entertainment—or disrespectful? Why?",
            "When a public figure is involved, does the impact feel bigger? How?",
            "What's a fair way for performers to earn a living while staying respectful of others' rights?",
            "If you were organizing a party, how would you decide what's appropriate?"
        ],
        source: "Sky News coverage and other reports."
    },
    "ai-lawyer": {
        title: "Lawyer Apologizes After Fake AI Citations Delay Murder Trial",
        level: "B1-B2",
        wordCount: 300,
        date: "2025-08-25",
        topic: "Technology",
        article: "A high-profile lawyer in Australia, Rishi Nathwani KC, apologized in the Supreme Court of Victoria after filing documents that contained quotes and case references invented by an AI tool. The submissions looked polished, but several citations pointed to laws or judgments that simply did not exist. Court staff and the judge flagged the problems, and the trial was delayed for a day while the lawyers corrected the record. The case itself involved a teenager accused of murder. Under Australian law, the court later found the young person not guilty by reason of mental impairment. That decision was based on medical evidence and legal standards, not on the AI mistake. Still, the incident became a teachable moment. Judge James Elliott stressed that AI can assist with drafting or summarizing, but it cannot replace a lawyer's duty to verify every fact and citation. He also noted that professional bodies had already warned the legal community: treat AI outputs like any untrusted source—check, confirm, and document your checks. Both the prosecution and the defense missed the false references before filing. That detail matters, because it shows how easily a sleek, confident paragraph can slip past busy humans. It also shows why courts require sources: accuracy is not optional. In some countries, submitting fake case law has led to fines or formal discipline. In extreme situations, using false material could violate serious criminal laws about interfering with justice. For students and professionals, the lesson is simple. Use AI to brainstorm, translate, or outline. Then slow down. Track the original sources, open the actual documents, and read the parts you plan to cite. If something cannot be verified, remove it. Your credibility—and a fair trial—depend on it.",
        vocabulary: [
            { term: "King's Counsel (KC)", definition: "A senior, top-tier lawyer honored by the monarch", example: "Only the best lawyers become King's Counsel." },
            { term: "Submissions", definition: "Documents lawyers give to the court", example: "The lawyer prepared his submissions carefully." },
            { term: "Fabricated", definition: "Made up—false but presented as real", example: "The evidence was fabricated and not reliable." },
            { term: "Verified", definition: "Checked carefully to make sure it's accurate", example: "All facts must be verified before use." },
            { term: "Contempt of court", definition: "Breaking or disrespecting court rules—punishable", example: "Refusing to answer questions can result in contempt of court." },
            { term: "Perverting the course of justice", definition: "Blocking fair legal process—very serious", example: "Lying under oath is perverting the course of justice." }
        ],
        comprehension: [
            { question: "What type of lawyer was Rishi Nathwani?", type: "multiple", options: ["Junior lawyer", "King's Counsel (KC)", "Judge", "Prosecutor"], answer: "King's Counsel (KC)" },
            { question: "The fake citations were generated by AI.", type: "truefalse", answer: "True" },
            { question: "How long did the trial get delayed?", type: "multiple", options: ["One week", "One day", "One month", "Not delayed"], answer: "One day" },
            { question: "The defendant was found guilty of murder.", type: "truefalse", answer: "False" },
            { question: "What did Judge Elliott say about AI tools?", type: "multiple", options: ["They should be banned", "They can assist but cannot replace verification", "They are always reliable", "They are useless"], answer: "They can assist but cannot replace verification" }
        ],
        discussion: [
            "Why is AI tempting for lawyers—but also risky?",
            "Have you trusted something without checking and regretted it?",
            "Should courts ban AI, regulate it, or embrace it carefully?",
            "If a tool helps but sometimes lies, how would you use it wisely?"
        ],
        source: "AP News."
    },
    "pokemon-whale": {
        title: "Ancient 'Pokémon-Like' Whale Fossil Found in Australia",
        level: "B1-B2",
        wordCount: 300,
        date: "2025-08-25",
        topic: "Science",
        article: "Say hello to Janjucetus dullardi, a small but fierce whale from about 25 million years ago. The fossil was found near Jan Juc Beach in Victoria, Australia, and later studied by museum researchers and paleontologists. Unlike modern baleen whales that filter tiny animals from the water, Janjucetus had sharp, pointed teeth and a short, powerful snout. Its eyes were unusually large for its body size, suggesting strong vision for hunting near the surface or along the coast. Scientists think it ate fish, squid, or even small seabirds when it had the chance. Janjucetus belonged to an early group called mammalodontids. These whales are important because they sit close to a key moment in whale evolution: the shift from toothy hunters to gentle filter feeders. Some early whales may have mixed behaviors—biting larger prey at times, while also taking advantage of small swarms of food. Over millions of years, tooth shapes, jaws, and skulls changed, and baleen plates appeared in later relatives. Those changes became the toolkit that powers today's giant, peaceful feeders. The fossil was first spotted by Ross Dullard, a school principal who enjoys searching for fossils on weekends. He donated the specimen to Museums Victoria so experts could scan, compare, and describe it properly. That public-spirited choice helps science move forward. To many people, the animal looks cute in reconstructions—round eyes, compact body—but the teeth tell the real story. This was a quick, capable predator in a busy coastal world. Finds like this remind us that the ocean has changed again and again. What is common now—a sea full of filter feeders—once grew from countless experiments, winners, and dead ends. Janjucetus is one more page in that long, surprising book.",
        vocabulary: [
            { term: "Deceptively cute", definition: "Looks sweet, but really isn't—kind of tricks you", example: "The baby shark was deceptively cute but dangerous." },
            { term: "Predator", definition: "Animal that hunts and eats other animals", example: "Lions are apex predators in their ecosystem." },
            { term: "Mammalodontid", definition: "Early, toothy whale group—ancestors of big whales", example: "Mammalodontids were the first whales with teeth." },
            { term: "Evolution", definition: "How species change slowly over millions of years", example: "Human evolution took millions of years." },
            { term: "Fossil", definition: "Remains or traces of ancient life preserved in rock", example: "Dinosaur fossils help us understand prehistoric life." },
            { term: "Juvenile", definition: "Young; not yet fully grown", example: "The juvenile whale was smaller than adults." }
        ],
        comprehension: [
            { question: "How old is the whale fossil?", type: "multiple", options: ["25 million years", "25 thousand years", "25 hundred years", "25 years"], answer: "25 million years" },
            { question: "The whale was large and gentle.", type: "truefalse", answer: "False" },
            { question: "Who discovered the fossil?", type: "multiple", options: ["A scientist", "Ross Dullard", "A fisherman", "A tourist"], answer: "Ross Dullard" },
            { question: "The whale had small eyes and dull teeth.", type: "truefalse", answer: "False" },
            { question: "What does this discovery help us understand?", type: "multiple", options: ["Modern whale behavior", "Whale evolution from predators to filter-feeders", "Australian beaches", "Fossil preservation"], answer: "Whale evolution from predators to filter-feeders" }
        ],
        discussion: [
            "What's the coolest (or oddest) prehistoric animal you've heard of—and why?",
            "If this whale looked cute but was dangerous, does that change how you judge appearances?",
            "Why is it important when everyday people help discover fossils?",
            "How do you imagine the oceans looked when little toothy whales ruled?"
        ],
        source: "AP News and science coverage."
    },
    "doomscrollers": {
        title: "CEO Wants to Hire Full-Time Doom-Scrollers",
        level: "B1-B2",
        wordCount: 300,
        date: "2025-08-25",
        topic: "Business",
        article: "Imagine turning your late-night scrolling habit into a real job. That is the pitch from a Mumbai-based media company whose CEO says he wants to hire a full-time 'doom-scroller.' The idea sounds like a meme, but the tasks are quite practical: watch social feeds for hours, spot fresh trends before they go mainstream, and summarize what creators, brands, and fans are talking about. In other words, do the time-consuming discovery work that busy teams often skip. The job description calls for spending six or more hours a day on platforms like Instagram and YouTube, checking niche subreddits, and tracking creator news. Applicants should write clearly in English and Hindi, feel comfortable with spreadsheets, and show a sense of humor. The company says the salary is 'very competitive,' though it did not share a number. Online, reactions landed all over the map. Some people said this is the perfect role for the chronically online. Others worried about burnout and mental health. Staring at endless feeds—especially negative or dramatic content—can raise stress and shrink attention spans. The healthier approach is structure: time blocks, breaks, and a clear definition of what counts as useful insight. If you were to apply, the best portfolio would look less like 'hours spent' and more like 'wins delivered.' Examples: a weekly trends brief that helped a campaign, a simple dashboard that tracks rising tags, or a memo that saved a client from jumping on a tired meme. Turning scrolling into strategy is the difference between wasting time and creating value.",
        vocabulary: [
            { term: "Doom-scrolling", definition: "Endlessly scrolling social media, often through negative news", example: "I spent hours doom-scrolling through bad news yesterday." },
            { term: "Creator culture", definition: "The world of influencers, trends, and online content", example: "Creator culture has changed how people consume media." },
            { term: "Competitive salary", definition: "Pay that's better than average", example: "The company offers competitive salaries to attract talent." },
            { term: "Obsession", definition: "A very strong interest in something", example: "His obsession with gaming affects his studies." },
            { term: "Overqualified", definition: "Having more skills/experience than a job needs", example: "She was overqualified for the entry-level position." },
            { term: "Full-time role", definition: "Regular, 5-day-a-week job—not a side hustle", example: "I'm looking for a full-time role in marketing." }
        ],
        comprehension: [
            { question: "What company is hiring doom-scrollers?", type: "multiple", options: ["Instagram", "Reddit", "Mumbai-based media company", "YouTube"], answer: "Mumbai-based media company" },
            { question: "The job requires spending 6+ hours per day on social media.", type: "truefalse", answer: "True" },
            { question: "Where is the job located?", type: "multiple", options: ["New York", "London", "Mumbai", "Tokyo"], answer: "Mumbai" },
            { question: "The salary is clearly stated in the job posting.", type: "truefalse", answer: "False" },
            { question: "What language skills are required?", type: "multiple", options: ["English only", "Hindi only", "English + Hindi", "Any language"], answer: "English + Hindi" }
        ],
        discussion: [
            "What would you tell your parents if scrolling Instagram could be your job?",
            "Does this fit today's creator-driven world—or go too far?",
            "Would you apply if you could prove elite scrolling skills?",
            "Should jobs like this limit screen time? How would you balance it?"
        ],
        source: "NDTV and related reports."
    },
    "area-51": {
        title: "Secret Air Force Jet Spotted Over Area 51",
        level: "B1-B2",
        wordCount: 300,
        date: "2025-08-25",
        topic: "Technology",
        article: "Aviation fans have long watched the desert ridges around Groom Lake, the remote Nevada base better known as Area 51. From a mountain called Tikaboo Peak, patient spotters sometimes catch glimpses of unusual aircraft. Recently, one photographer filmed a highly modified Boeing 737-200 associated with U.S. Air Force radar testing, often nicknamed RAT55. The jet appeared to perform touch-and-go landings before rolling toward one of the base's large hangars. Even a short clip like this can set off days of analysis online. Why does a plain old 737 matter? Because test aircraft can carry special radars, antennas, and sensor pods to evaluate how new systems perform. Engineers need a reliable, roomy platform to fly predictable patterns while they collect data. A commercial airframe can be a perfect truck for that job. It is not always a sign of aliens or a brand-new stealth jet—though the base's secret history invites that kind of guesswork. Area 51 was officially acknowledged by the U.S. government only in 2013, even though it had been operating for decades. Classic programs like the U-2 and A-12 were tested in the region, and it remains a natural home for sensitive work. Because the area is restricted, the best public views come from faraway peaks. That distance means shaky videos, partial details, and lots of room for speculation. For most observers, the fun is in the puzzle: watching flight paths, comparing photos, and slowly building a story from scraps. Whether the latest clip shows routine calibration or a hint of something new, it proves one thing—Area 51 still keeps its secrets well.",
        vocabulary: [
            { term: "Touch-and-go", definition: "A landing where the plane immediately takes off again", example: "The pilot practiced touch-and-go landings for training." },
            { term: "Radar testbed", definition: "An aircraft used to test radar systems and stealth tech", example: "The military uses radar testbeds to improve detection." },
            { term: "Transponder", definition: "A device that broadcasts an aircraft's identity/location", example: "Air traffic control tracks planes using transponders." },
            { term: "Groom Lake", definition: "The dry lakebed where Area 51's runway complex sits", example: "Groom Lake is the official name for Area 51." },
            { term: "Hangar 18", definition: "A large building at Area 51 often linked with secret projects", example: "Hangar 18 is famous for its mysterious contents." },
            { term: "Classified", definition: "Officially secret information or activity", example: "The documents were classified and not available to the public." }
        ],
        comprehension: [
            { question: "What type of aircraft was spotted?", type: "multiple", options: ["Boeing 737-200", "Fighter jet", "Helicopter", "Drone"], answer: "Boeing 737-200" },
            { question: "The jet was photographed from 26 miles away.", type: "truefalse", answer: "True" },
            { question: "Who filmed the aircraft?", type: "multiple", options: ["A pilot", "A photographer from Tikaboo Peak", "A soldier", "A tourist"], answer: "A photographer from Tikaboo Peak" },
            { question: "Area 51 was officially acknowledged in 2013.", type: "truefalse", answer: "True" },
            { question: "What is RAT55 used for?", type: "multiple", options: ["Passenger transport", "Radar testing and evaluation", "Cargo delivery", "Training flights"], answer: "Radar testing and evaluation" }
        ],
        discussion: [
            "Why do places like Area 51 capture people's imaginations?",
            "Should the public know more about secret military testing—why or why not?",
            "What's the line between national security and healthy transparency?",
            "If you were the photographer, would you publish the footage?"
        ],
        source: "New York Post summary and follow-up coverage."
    }
};

// Open news lesson modal
function openNewsLesson(lessonKey) {
    console.log('Opening lesson:', lessonKey);
    const lesson = newsLessons[lessonKey];
    if (!lesson) {
        console.error('Lesson not found:', lessonKey);
        return;
    }

    const modal = document.getElementById('newsModal');
    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Populate modal content
    const modalContent = document.getElementById('newsModalContent');
    if (modalContent) {
        modalContent.innerHTML = createLessonContent(lesson);
    }

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Initialize interactive elements
    initializeInteractiveElements();
}

// Create lesson content with new design
function createLessonContent(lesson) {
    return `
        <div class="lesson-header">
            <div class="lesson-header-content">
                <div class="lesson-header-text">
                    <h2>${lesson.title}</h2>
                    <div class="lesson-meta">
                        <span class="level-badge">${lesson.level}</span>
                        <span class="word-count">~${lesson.wordCount} words</span>
                        <span class="date">${lesson.date}</span>
                        <span class="topic">${lesson.topic}</span>
                    </div>
                </div>
                <div class="lesson-header-image">
                    <img src="newsthumbs/${getThumbnailForLesson(lesson.title)}.png" alt="${lesson.topic}" loading="lazy">
                </div>
            </div>
        </div>

        <div class="lesson-content">
            <!-- Vocabulary Section -->
            <section class="vocabulary-section">
                <h3>📚 Vocabulary</h3>
                <div class="vocabulary-list">
                    ${lesson.vocabulary.map((vocab, i) => `
                        <div class="vocab-item">
                            <div class="vocab-header">
                                <span class="vocab-term">${vocab.term}</span>
                                <span class="vocab-pos">${getPartOfSpeech(vocab.term)}</span>
                                <span class="vocab-pronunciation">${getPronunciation(vocab.term)}</span>
                            </div>
                            <div class="vocab-definition">${vocab.definition}</div>
                            <div class="vocab-example">${vocab.example}</div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Article Section -->
            <section class="article-section">
                <h3>📰 Article</h3>
                <div class="article-text">
                    ${lesson.article}
                </div>
            </section>

            <!-- Comprehension Section -->
            <section class="comprehension-section">
                <h3>❓ Comprehension Questions</h3>
                <div class="comprehension-questions">
                    ${lesson.comprehension.map((q, i) => `
                        <div class="question-item">
                            <div class="question-number">${i + 1}</div>
                            <div class="question-content">
                                <div class="question-text">${q.question}</div>
                                ${q.type === 'truefalse' ? `
                                    <div class="answer-options">
                                        <button class="option-btn" onclick="selectAnswer(this, ${i}, 'True')">True</button>
                                        <button class="option-btn" onclick="selectAnswer(this, ${i}, 'False')">False</button>
                                    </div>
                                ` : `
                                    <div class="answer-options">
                                        ${q.options.map((option, j) => `
                                            <button class="option-btn" onclick="selectAnswer(this, ${i}, '${option.replace(/'/g, "\\'")}')">${option}</button>
                                        `).join('')}
                                    </div>
                                `}
                                <button class="check-answer-btn" onclick="checkAnswer(${i}, '${q.answer.replace(/'/g, "\\'")}')" style="display: none;">
                                    Check Answer
                                </button>
                                <div class="answer-result" style="display: none;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Discussion Section -->
            <section class="discussion-section">
                <h3>💬 Discussion Questions</h3>
                <div class="discussion-questions">
                    ${lesson.discussion.map((q, i) => `
                        <div class="discussion-question">
                            <span class="question-number">${i + 1}</span>
                            <span class="question-text">${q}</span>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Related Lessons Section -->
            <section class="related-lessons-section">
                <h3>🔗 Related Lessons</h3>
                <div class="related-lessons-grid">
                    ${Object.keys(newsLessons).filter(key => key !== Object.keys(newsLessons).find(k => newsLessons[k].title === lesson.title)).map(key => `
                        <div class="related-lesson-card" onclick="openNewsLesson('${key}')">
                            <div class="related-lesson-image">
                                <img src="newsthumbs/${getThumbnailForLessonByKey(key)}.png" alt="${newsLessons[key].topic}" loading="lazy">
                            </div>
                            <div class="related-lesson-content">
                                <h4>${newsLessons[key].title.substring(0, 50)}...</h4>
                                <span class="related-lesson-level">${newsLessons[key].level}</span>
                                <span class="related-lesson-topic">${newsLessons[key].topic}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>

        <div class="lesson-actions">
            <button class="btn btn-orange" onclick="printLesson()">Print Lesson</button>
            <button class="btn btn-blue" onclick="closeNewsModal()">Close</button>
        </div>
    `;
}

// Helper function to get thumbnail for lesson headlines
function getThumbnailForLesson(lessonTitle) {
    const thumbnails = {
        "Soccer Star's Party Sparks Disability Rights Backlash": "Soccer-player",
        "Lawyer Apologizes After Fake AI Citations Delay Murder Trial": "lawyer",
        "Ancient 'Pokémon-Like' Whale Fossil Found in Australia": "pokemon-whale",
        "CEO Wants to Hire Full-Time Doom-Scrollers": "doomscrollers",
        "Secret Air Force Jet Spotted Over Area 51": "lawyer" // Reusing lawyer image for area-51
    };
    return thumbnails[lessonTitle] || 'lawyer';
}

// Helper function to get thumbnail for related lessons by key
function getThumbnailForLessonByKey(lessonKey) {
    const thumbnails = {
        'soccer-party': 'Soccer-player',
        'ai-lawyer': 'lawyer',
        'pokemon-whale': 'pokemon-whale',
        'doomscrollers': 'doomscrollers',
        'area-51': 'lawyer' // Reusing lawyer image for area-51
    };
    return thumbnails[lessonKey] || 'lawyer';
}

// Helper function to get part of speech
function getPartOfSpeech(word) {
    const posMap = {
        'reward': 'Verb',
        'shoplifter': 'Noun',
        'offense': 'Noun',
        'confront': 'Verb',
        'punishment': 'Noun',
        'perpetuate': 'Verb',
        'stereotype': 'Noun',
        'dignity': 'Noun',
        'legal action': 'Noun',
        'investigation': 'Noun',
        'fabricated': 'Adjective',
        'verified': 'Adjective',
        'contempt': 'Noun',
        'deceptively': 'Adverb',
        'predator': 'Noun',
        'evolution': 'Noun',
        'fossil': 'Noun',
        'doom-scrolling': 'Noun',
        'creator culture': 'Noun',
        'competitive': 'Adjective',
        'obsession': 'Noun',
        'overqualified': 'Adjective',
        'touch-and-go': 'Adjective',
        'radar': 'Noun',
        'transponder': 'Noun',
        'classified': 'Adjective',
        'king\'s counsel': 'Noun',
        'submissions': 'Noun',
        'perverting': 'Verb',
        'justice': 'Noun',
        'mammalodontid': 'Noun',
        'juvenile': 'Adjective'
    };
    return posMap[word.toLowerCase()] || 'Noun';
}

// Helper function to get pronunciation
function getPronunciation(word) {
    const pronMap = {
        'reward': '/rɪˈwɔ:rd/',
        'shoplifter': '/ˈʃɒplɪftər/',
        'offense': '/əˈfɛns/',
        'confront': '/kənˈfrʌnt/',
        'punishment': '/ˈpʌnɪʃmənt/',
        'perpetuate': '/pərˈpetʃueɪt/',
        'stereotype': '/ˈsteriətaɪp/',
        'dignity': '/ˈdɪɡnəti/',
        'legal action': '/ˈliːɡəl ˈækʃən/',
        'investigation': '/ɪnˌvestɪˈɡeɪʃən/',
        'fabricated': '/ˈfæbrɪkeɪtɪd/',
        'verified': '/ˈverɪfaɪd/',
        'contempt': '/kənˈtempt/',
        'deceptively': '/dɪˈseptɪvli/',
        'predator': '/ˈpredətər/',
        'evolution': '/ˌevəˈluːʃən/',
        'fossil': '/ˈfɒsəl/',
        'doom-scrolling': '/ˈduːm skroʊlɪŋ/',
        'creator culture': '/kriˈeɪtər ˈkʌltʃər/',
        'competitive': '/kəmˈpetətɪv/',
        'obsession': '/əbˈseʃən/',
        'overqualified': '/ˌoʊvərˈkwɒlɪfaɪd/',
        'touch-and-go': '/ˈtʌtʃ ənd ˈɡoʊ/',
        'radar': '/ˈreɪdɑːr/',
        'transponder': '/trænˈspɒndər/',
        'classified': '/ˈklæsɪfaɪd/',
        'king\'s counsel': '/ˈkɪŋz ˈkaʊnsəl/',
        'submissions': '/səbˈmɪʃənz/',
        'perverting': '/pərˈvɜːtɪŋ/',
        'justice': '/ˈdʒʌstɪs/',
        'mammalodontid': '/ˌmæmələˈdɒntɪd/',
        'juvenile': '/ˈdʒuːvənaɪl/'
    };
    return pronMap[word.toLowerCase()] || '/ˈwɜːrd/';
}

// Toggle article read more/less
function toggleArticle(button, fullText) {
    const intro = button.previousElementSibling;
    const full = button.nextElementSibling;
    
    if (full.style.display === 'none') {
        full.style.display = 'block';
        intro.style.display = 'none';
        button.textContent = 'Show Less';
    } else {
        full.style.display = 'none';
        intro.style.display = 'block';
        button.textContent = 'Read More';
    }
}

// Flip vocabulary card
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Select answer option
function selectAnswer(button, questionIndex, selectedAnswer) {
    const questionContainer = button.closest('.question-item');
    const optionBtns = questionContainer.querySelectorAll('.option-btn');
    const checkBtn = questionContainer.querySelector('.check-answer-btn');
    
    // Remove previous selections
    optionBtns.forEach(btn => btn.classList.remove('selected'));
    
    // Select current option
    button.classList.add('selected');
    
    // Show check answer button
    checkBtn.style.display = 'inline-block';
    
    // Store selected answer
    questionContainer.dataset.selectedAnswer = selectedAnswer;
}

// Check answer
function checkAnswer(questionIndex, correctAnswer) {
    const questionContainer = document.querySelector(`[data-question="${questionIndex}"]`);
    const selectedAnswer = questionContainer.dataset.selectedAnswer;
    const resultDiv = questionContainer.querySelector('.answer-result');
    const checkBtn = questionContainer.querySelector('.check-answer-btn');
    
    if (!selectedAnswer) {
        alert('Please select an answer first!');
        return;
    }
    
    const isCorrect = selectedAnswer === correctAnswer;
    
    resultDiv.innerHTML = `
        <div class="result ${isCorrect ? 'correct' : 'incorrect'}">
            <span class="result-icon">${isCorrect ? '✅' : '❌'}</span>
            <span class="result-text">
                ${isCorrect ? 'Correct!' : 'Incorrect. The correct answer is: ' + correctAnswer}
            </span>
        </div>
    `;
    
    resultDiv.style.display = 'block';
    checkBtn.style.display = 'none';
    
    // Disable all option buttons
    const optionBtns = questionContainer.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => btn.disabled = true);
}

// Toggle answer key
function toggleAnswerKey() {
    const content = document.querySelector('.answer-key-content');
    const icon = document.querySelector('.toggle-icon');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}

// Initialize interactive elements
function initializeInteractiveElements() {
    // Any additional initialization can go here
}

// Close news modal
function closeNewsModal() {
    console.log('Closing news modal');
    const modal = document.getElementById('newsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Filter news by level and topic
function filterNews() {
    const levelFilter = document.getElementById('levelFilter').value;
    const topicFilter = document.getElementById('topicFilter').value;
    
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        const level = card.dataset.level;
        const topic = card.dataset.topic;
        
        const levelMatch = levelFilter === 'all' || level === levelFilter;
        const topicMatch = topicFilter === 'all' || topic === topicFilter;
        
        if (levelMatch && topicMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Clear all filters
function clearFilters() {
    document.getElementById('levelFilter').value = 'all';
    document.getElementById('topicFilter').value = 'all';
    
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.style.display = 'block';
    });
}

// Print lesson
function printLesson() {
    const printWindow = window.open('', '_blank');
    const lessonContent = document.getElementById('newsModalContent').innerHTML;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>News Lesson - Print</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
                h2, h3 { color: #333; }
                .lesson-meta { margin-bottom: 20px; color: #666; }
                .level-badge { background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; margin-right: 10px; }
                .vocabulary-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 20px 0; }
                .vocab-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
                .comprehension-questions { margin: 20px 0; }
                .question-container { margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 8px; }
                .discussion-questions { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .discussion-question { margin-bottom: 10px; }
                .question-number { font-weight: bold; margin-right: 10px; }
                @media print { .lesson-actions, .answer-key-header { display: none; } }
            </style>
        </head>
        <body>
            ${lessonContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking outside
    const modal = document.getElementById('newsModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeNewsModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeNewsModal();
        }
    });
});
