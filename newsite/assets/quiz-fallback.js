// Vanilla JavaScript Quiz Fallback
const quizData = {
  title: "Objects That Tell a Story (A2)",
  exercises: [
    {
      question: "Do you keep things from your childhood? What and why?",
      options: [
        "Yes, because they have sentimental value",
        "No, I throw everything away",
        "Only expensive items",
        "I don't remember my childhood"
      ],
      correctAnswer: 0
    },
    {
      question: "What is an 'heirloom'?",
      options: [
        "A valuable object passed down in a family",
        "A type of jewelry",
        "An antique shop",
        "A family tradition"
      ],
      correctAnswer: 0
    },
    {
      question: "The old photo looks ____ after many years in the sun.",
      options: ["faded", "bright", "new", "expensive"],
      correctAnswer: 0
    },
    {
      question: "We ____ (visit) the shop last Saturday and ____ (buy) two books.",
      options: ["visited, bought", "visit, buy", "visiting, buying", "visits, buys"],
      correctAnswer: 0
    },
    {
      question: "What does 'donate' mean?",
      options: [
        "To give something to a charity or organization",
        "To sell something",
        "To borrow something",
        "To repair something"
      ],
      correctAnswer: 0
    }
  ]
};

function createVanillaQuiz() {
  const quizRoot = document.getElementById('quiz-root');
  if (!quizRoot) return;

  let currentQuestion = 0;
  let selectedAnswers = {};
  let showResults = false;
  let score = 0;

  function renderQuiz() {
    if (showResults) {
      renderResults();
      return;
    }

    const currentExercise = quizData.exercises[currentQuestion];
    const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

    quizRoot.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-header">
          <h2>${quizData.title}</h2>
          <div class="progress">Question ${currentQuestion + 1} of ${quizData.exercises.length}</div>
        </div>

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
        </div>

        <div class="quiz-navigation">
          <button class="btn nav-btn" onclick="previousQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>
            Previous
          </button>
          
          <button class="btn nav-btn primary" onclick="nextQuestion()" ${!hasAnswered ? 'disabled' : ''}>
            ${currentQuestion === quizData.exercises.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    `;
  }

  function renderResults() {
    quizRoot.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-results">
          <h2>Quiz Complete!</h2>
          <div class="score-display">
            <p>Your Score: <span class="score">${score}</span> out of <span class="total">${quizData.exercises.length}</span></p>
            <p class="percentage">${Math.round((score / quizData.exercises.length) * 100)}%</p>
          </div>
          <button class="btn reset-btn" onclick="resetQuiz()">Try Again</button>
        </div>
      </div>
    `;
  }

  function selectAnswer(answerIndex) {
    selectedAnswers[currentQuestion] = answerIndex;
    renderQuiz();
  }

  function nextQuestion() {
    if (currentQuestion < quizData.exercises.length - 1) {
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
    quizData.exercises.forEach((exercise, index) => {
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

// Auto-initialize if this script is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createVanillaQuiz);
} else {
  createVanillaQuiz();
}
