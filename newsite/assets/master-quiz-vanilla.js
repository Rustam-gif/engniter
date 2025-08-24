// Function to create and display a specific quiz
function createQuiz(quizKey, quizData) {
  console.log('createQuiz called with:', { quizKey, quizData });
  
  const quizRoot = document.getElementById('quiz-root');
  if (!quizRoot || !quizData) {
    console.error('Missing quizRoot or quizData:', { quizRoot: !!quizRoot, quizData: !!quizData });
    return;
  }
  
  // Create a deep copy of the quiz data and shuffle the answer options
  const shuffledQuizData = JSON.parse(JSON.stringify(quizData));
  shuffleQuizAnswers(shuffledQuizData);
  
  console.log('Quiz data structure:', {
    title: shuffledQuizData.title,
    level: shuffledQuizData.level,
    topic: shuffledQuizData.topic,
    exercisesCount: shuffledQuizData.exercises ? shuffledQuizData.exercises.length : 'UNDEFINED',
    exercises: shuffledQuizData.exercises
  });

  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];

  // Function to shuffle answer options for each question
  function shuffleQuizAnswers(quizData) {
    quizData.exercises.forEach(exercise => {
      // Store the correct answer text
      const correctAnswerText = exercise.options[exercise.correctAnswer];
      
      // Shuffle the options array
      const shuffledOptions = [...exercise.options];
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }
      
      // Find the new position of the correct answer
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);
      
      // Update the exercise with shuffled options and new correct answer index
      exercise.options = shuffledOptions;
      exercise.correctAnswer = newCorrectIndex;
    });
  }

  function renderQuiz() {
    if (currentQuestionIndex >= shuffledQuizData.exercises.length) {
      renderResults();
      return;
    }

    const question = shuffledQuizData.exercises[currentQuestionIndex];
    quizRoot.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h3>${shuffledQuizData.title}</h3>
          <div class="quiz-progress">
            Question ${currentQuestionIndex + 1} of ${shuffledQuizData.exercises.length}
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
          
          <div class="answer-explanation" style="display: none;">
            <p><strong>Correct Answer:</strong> ${question.options[question.correctAnswer]}</p>
            <p><strong>Explanation:</strong> This is the correct answer because it best addresses the question asked.</p>
          </div>
        </div>
        
        <div class="quiz-navigation">
          <button class="btn" onclick="previousQuestion()" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
            Previous
          </button>
          <button class="btn" onclick="showAnswer()" class="show-answer-btn">
            Show Answer
          </button>
          ${currentQuestionIndex === shuffledQuizData.exercises.length - 1 ? 
            '<button class="btn finish-btn" onclick="nextQuestion()">Finish Quiz</button>' :
            '<button class="btn" onclick="nextQuestion()">Next</button>'
          }
        </div>
      </div>
    `;
  }

  function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Get current question data
    const currentQuestion = shuffledQuizData.exercises[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    
    // Highlight all options to show correct answer
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, index) => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      
      if (index === optionIndex) {
        // User's selected answer
        btn.classList.add('selected');
        if (index === correctAnswer) {
          btn.classList.add('correct');
          // Only increment score if this is the first time answering correctly
          if (!userAnswers[currentQuestionIndex] || userAnswers[currentQuestionIndex] !== index) {
            score++;
          }
        } else {
          btn.classList.add('incorrect');
        }
      } else if (index === correctAnswer) {
        // Show correct answer even if not selected
        btn.classList.add('correct');
      }
    });
    
    // Disable all buttons after selection
    optionBtns.forEach(btn => {
      btn.disabled = true;
      btn.style.cursor = 'not-allowed';
    });
  }

  function nextQuestion() {
    console.log('nextQuestion called, currentQuestionIndex:', currentQuestionIndex, 'total questions:', shuffledQuizData.exercises.length);
    if (currentQuestionIndex < shuffledQuizData.exercises.length - 1) {
      currentQuestionIndex++;
      renderQuiz();
    } else {
      // If we're on the last question, show results
      console.log('Showing results page');
      renderResults();
    }
  }

  function previousQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderQuiz();
    }
  }

  function renderResults() {
    const percentage = Math.round((score / shuffledQuizData.exercises.length) * 100);
    const totalQuestions = shuffledQuizData.exercises.length;
    
    // Generate detailed results with correct answers and mistakes
    let detailedResults = '';
    for (let i = 0; i < totalQuestions; i++) {
      const question = shuffledQuizData.exercises[i];
      const userAnswer = userAnswers[i];
      const correctAnswer = question.correctAnswer;
      const isCorrect = userAnswer === correctAnswer;
      
      detailedResults += `
        <div class="question-result ${isCorrect ? 'correct' : 'incorrect'}">
          <h4>Question ${i + 1}</h4>
          <p class="question-text">${question.question}</p>
          <div class="answer-analysis">
            <div class="user-answer">
              <strong>Your Answer:</strong> 
              <span class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                ${userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'}
              </span>
            </div>
            ${!isCorrect ? `
              <div class="correct-answer-display">
                <strong>Correct Answer:</strong> 
                <span class="correct-answer">${question.options[correctAnswer]}</span>
              </div>
            ` : ''}
            <div class="result-indicator">
              ${isCorrect ? '✅ Correct' : '❌ Incorrect'}
            </div>
          </div>
        </div>
      `;
    }
    
    quizRoot.innerHTML = `
      <div class="quiz-results">
        <h3>Quiz Complete!</h3>
        <div class="score-display">
          <p class="final-score">Your Score: ${score} out of ${totalQuestions}</p>
          <p class="percentage">Percentage: ${percentage}%</p>
          <div class="score-bar">
            <div class="score-fill" style="width: ${percentage}%"></div>
          </div>
        </div>
        
        <div class="detailed-results">
          <h4>Detailed Results</h4>
          ${detailedResults}
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
  window.showAnswer = showAnswer;
  
  function showAnswer() {
    const answerExplanation = document.querySelector('.answer-explanation');
    if (answerExplanation) {
      answerExplanation.style.display = 'block';
    }
  }

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
