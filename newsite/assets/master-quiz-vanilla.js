// Function to create and display a specific quiz
function createQuiz(quizKey, quizData) {
  console.log('createQuiz called with:', { quizKey, quizData });
  
  const quizRoot = document.getElementById('quiz-root');
  if (!quizRoot || !quizData) {
    console.error('Missing quizRoot or quizData:', { quizRoot: !!quizRoot, quizData: !!quizData });
    return;
  }
  
  console.log('Quiz data structure:', {
    title: quizData.title,
    level: quizData.level,
    topic: quizData.topic,
    exercisesCount: quizData.exercises ? quizData.exercises.length : 'UNDEFINED',
    exercises: quizData.exercises
  });

  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];

  function renderQuiz() {
    if (currentQuestionIndex >= quizData.exercises.length) {
      renderResults();
      return;
    }

    const question = quizData.exercises[currentQuestionIndex];
    quizRoot.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h3>${quizData.title}</h3>
          <div class="quiz-progress">
            Question ${currentQuestionIndex + 1} of ${quizData.exercises.length}
          </div>
        </div>
        
        <div class="question-container">
          <h4 class="question-text">${question.question}</h4>
          
          <div class="options-container">
            ${question.options.map((option, index) => `
              <button 
                class="option-btn" 
                onclick="selectOption(${index})"
                data-option="${index}"
              >
                ${option}
              </button>
            `).join('')}
          </div>
        </div>
        
        <div class="quiz-navigation">
          <button class="btn" onclick="previousQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
            Previous
          </button>
          <button class="btn" onclick="nextQuestion()" ${currentQuestionIndex === quizData.exercises.length - 1 ? 'disabled' : ''}>
            Next
          </button>
        </div>
      </div>
    `;
  }

  function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Highlight selected option
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      if (index === optionIndex) {
        btn.classList.add('selected');
        if (index === quizData.exercises[currentQuestionIndex].correctAnswer) {
          btn.classList.add('correct');
          if (!userAnswers[currentQuestionIndex] || userAnswers[currentQuestionIndex] !== index) {
            score++;
          }
        } else {
          btn.classList.add('incorrect');
        }
      }
    });
  }

  function nextQuestion() {
    if (currentQuestionIndex < quizData.exercises.length - 1) {
      currentQuestionIndex++;
      renderQuiz();
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuiz();
    }
  }

  function renderResults() {
    const percentage = Math.round((score / quizData.exercises.length) * 100);
    quizRoot.innerHTML = `
      <div class="quiz-results">
        <h3>Quiz Complete!</h3>
        <div class="score-display">
          <p>Your Score: ${score} out of ${quizData.questions.length}</p>
          <p>Percentage: ${percentage}%</p>
        </div>
        <div class="result-actions">
          <button class="btn" onclick="restartQuiz()">Take Quiz Again</button>
          <button class="btn" onclick="closeQuizModal()">Close Quiz</button>
        </div>
      </div>
    `;
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    renderQuiz();
  }

  // Make functions globally accessible
  window.selectOption = selectOption;
  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
  window.restartQuiz = restartQuiz;

  // Start the quiz
  renderQuiz();
}

// Vanilla JavaScript Master Quiz Selector (No JSX required)
function createMasterQuizSelector() {
  const quizRoot = document.getElementById('quiz-root');
  if (!quizRoot) return;

  let selectedQuiz = null;
  let selectedCategory = 'All';
  let selectedLevel = 'All';
  let searchTerm = '';

  // Get unique categories and levels
  const categories = ['All', ...Object.keys(window.quizCategories || {})];
  const levels = ['All', ...Object.keys(window.quizLevels || {})];

  // Filter quizzes based on selection
  function getFilteredQuizzes() {
    return Object.entries(window.allQuizData || {}).filter(([key, quiz]) => {
      const matchesCategory = selectedCategory === 'All' || quiz.topic === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || quiz.level === selectedLevel;
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }

  function handleQuizSelect(quizKey) {
    selectedQuiz = quizKey;
    renderQuiz();
  }

  function handleBackToSelector() {
    selectedQuiz = null;
    renderQuiz();
  }

  function handleCategoryChange(e) {
    selectedCategory = e.target.value;
    renderQuiz();
  }

  function handleLevelChange(e) {
    selectedLevel = e.target.value;
    renderQuiz();
  }

  function handleSearchChange(e) {
    searchTerm = e.target.value;
    renderQuiz();
  }

  function clearFilters() {
    selectedCategory = 'All';
    selectedLevel = 'All';
    searchTerm = '';
    renderQuiz();
  }

  // If a quiz is selected, render it
  if (selectedQuiz && window.allQuizData[selectedQuiz]) {
    renderSelectedQuiz();
    return;
  }

  // Render quiz selector
  renderQuizSelector();

  function renderQuizSelector() {
    const filteredQuizzes = getFilteredQuizzes();
    
    quizRoot.innerHTML = `
      <div class="master-quiz-selector">
        <div class="selector-header">
          <h2>Choose Your Quiz</h2>
          <p>Select from ${Object.keys(window.allQuizData || {}).length} interactive quizzes covering all lesson topics</p>
        </div>

        <div class="quiz-filters">
          <div class="search-box">
            <input
              type="text"
              placeholder="Search quizzes..."
              value="${searchTerm}"
              class="search-input"
              oninput="handleSearchInput(this.value)"
            />
          </div>
          
          <div class="filter-controls">
            <select class="filter-select" onchange="handleCategorySelect(this.value)">
              ${categories.map(cat => `<option value="${cat}" ${cat === selectedCategory ? 'selected' : ''}>${cat}</option>`).join('')}
            </select>
            
            <select class="filter-select" onchange="handleLevelSelect(this.value)">
              ${levels.map(level => `<option value="${level}" ${level === selectedLevel ? 'selected' : ''}>${level}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="quiz-grid">
          ${filteredQuizzes.map(([key, quiz]) => `
            <div class="quiz-card" onclick="selectQuiz('${key}')">
              <div class="quiz-card-header">
                <h3>${quiz.title}</h3>
                <div class="quiz-meta">
                  <span class="level-badge">${quiz.level}</span>
                  <span class="topic-badge">${quiz.topic}</span>
                </div>
              </div>
              <div class="quiz-card-content">
                <p>${quiz.exercises.length} questions</p>
                <button class="btn start-quiz-btn">Start Quiz</button>
              </div>
            </div>
          `).join('')}
        </div>

        ${filteredQuizzes.length === 0 ? `
          <div class="no-results">
            <p>No quizzes match your current filters.</p>
            <button class="btn" onclick="clearAllFilters()">Clear Filters</button>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderSelectedQuiz() {
    const quiz = window.allQuizData[selectedQuiz];
    if (!quiz) return;

    quizRoot.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <button class="btn back-btn" onclick="goBackToSelector()">← Back to Quiz Selection</button>
          <h2>${quiz.title}</h2>
          <div class="progress">Level: ${quiz.level} | Topic: ${quiz.topic}</div>
        </div>
        
        <div id="individual-quiz-container"></div>
      </div>
    `;

    // Initialize individual quiz
    createIndividualQuiz(selectedQuiz);
  }

  function renderQuiz() {
    if (selectedQuiz) {
      renderSelectedQuiz();
    } else {
      renderQuizSelector();
    }
  }

  // Make functions globally available
  window.selectQuiz = handleQuizSelect;
  window.goBackToSelector = handleBackToSelector;
  window.handleCategorySelect = handleCategoryChange;
  window.handleLevelSelect = handleLevelChange;
  window.handleSearchInput = function(value) {
    searchTerm = value;
    renderQuiz();
  };
  window.clearAllFilters = clearFilters;
}

// Individual Quiz Component
function createIndividualQuiz(quizKey) {
  const container = document.getElementById('individual-quiz-container');
  if (!container) return;

  const quiz = window.allQuizData[quizKey];
  if (!quiz) return;

  let currentQuestion = 0;
  let selectedAnswers = {};
  let showResults = false;
  let score = 0;

  function renderQuiz() {
    if (showResults) {
      renderResults();
      return;
    }

    const currentExercise = quiz.exercises[currentQuestion];
    const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

    container.innerHTML = `
      <div class="question-container">
        <h3 class="question">${currentExercise.question}</h3>
        
        <div class="options">
          ${currentExercise.options.map((option, index) => `
            <button class="option-btn ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}" 
                    onclick="selectAnswer(${index})">
              ${option}
            </button>
          `).join('')}
        </div>

        <div class="quiz-navigation">
          <button class="btn nav-btn" onclick="previousQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>
            Previous
          </button>
          
          <button class="btn nav-btn primary" onclick="nextQuestion()" ${!hasAnswered ? 'disabled' : ''}>
            ${currentQuestion === quiz.exercises.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    `;
  }

  function renderResults() {
    container.innerHTML = `
      <div class="quiz-results">
        <h2>Quiz Complete!</h2>
        <div class="score-display">
          <p>Your Score: <span class="score">${score}</span> out of <span class="total">${quiz.exercises.length}</span></p>
          <p class="percentage">${Math.round((score / quiz.exercises.length) * 100)}%</p>
        </div>
        <div class="result-actions">
          <button class="btn reset-btn" onclick="resetQuiz()">Try Again</button>
          <button class="btn back-btn" onclick="goBackToSelector()">Back to Selection</button>
        </div>
      </div>
    `;
  }

  function selectAnswer(answerIndex) {
    selectedAnswers[currentQuestion] = answerIndex;
    renderQuiz();
  }

  function nextQuestion() {
    if (currentQuestion < quiz.exercises.length - 1) {
      currentQuestion++;
      renderQuiz();
    } else {
      calculateScore();
      showResults = true;
      renderQuiz();
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuiz();
    }
  }

  function calculateScore() {
    score = 0;
    quiz.exercises.forEach((exercise, index) => {
      if (selectedAnswers[index] === exercise.correctAnswer) {
        score++;
      }
    });
  }

  function resetQuiz() {
    currentQuestion = 0;
    selectedAnswers = {};
    showResults = false;
    score = 0;
    renderQuiz();
  }

  // Make functions globally available
  window.selectAnswer = selectAnswer;
  window.nextQuestion = nextQuestion;
  window.previousQuestion = previousQuestion;
  window.resetQuiz = resetQuiz;

  // Initial render
  renderQuiz();
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createMasterQuizSelector);
} else {
  createMasterQuizSelector();
}

// Make functions available globally
if (typeof window !== 'undefined') {
  window.createMasterQuizSelector = createMasterQuizSelector;
  window.createIndividualQuiz = createIndividualQuiz;
}
