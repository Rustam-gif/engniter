// Master Quiz Selector Component
function MasterQuizSelector() {
  const [selectedQuiz, setSelectedQuiz] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedLevel, setSelectedLevel] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  // Get unique categories and levels
  const categories = ['All', ...Object.keys(window.quizCategories || {})];
  const levels = ['All', ...Object.keys(window.quizLevels || {})];

  // Filter quizzes based on selection
  const filteredQuizzes = Object.entries(window.allQuizData || {}).filter(([key, quiz]) => {
    const matchesCategory = selectedCategory === 'All' || quiz.topic === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || quiz.level === selectedLevel;
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleQuizSelect = (quizKey) => {
    setSelectedQuiz(quizKey);
  };

  const handleBackToSelector = () => {
    setSelectedQuiz(null);
  };

  // If a quiz is selected, render it
  if (selectedQuiz && window.allQuizData[selectedQuiz]) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button className="btn back-btn" onClick={handleBackToSelector}>
            ← Back to Quiz Selection
          </button>
          <h2>{window.allQuizData[selectedQuiz].title}</h2>
          <div className="progress">
            Level: {window.allQuizData[selectedQuiz].level} | Topic: {window.allQuizData[selectedQuiz].topic}
          </div>
        </div>
        
        <QuizComponent quizKey={selectedQuiz} />
      </div>
    );
  }

  // Render quiz selector
  return (
    <div className="master-quiz-selector">
      <div className="selector-header">
        <h2>Choose Your Quiz</h2>
        <p>Select from {Object.keys(window.allQuizData || {}).length} interactive quizzes covering all lesson topics</p>
      </div>

      {/* Search and Filters */}
      <div className="quiz-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select 
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="filter-select"
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="quiz-grid">
        {filteredQuizzes.map(([key, quiz]) => (
          <div key={key} className="quiz-card" onClick={() => handleQuizSelect(key)}>
            <div className="quiz-card-header">
              <h3>{quiz.title}</h3>
              <div className="quiz-meta">
                <span className="level-badge">{quiz.level}</span>
                <span className="topic-badge">{quiz.topic}</span>
              </div>
            </div>
            <div className="quiz-card-content">
              <p>{quiz.exercises.length} questions</p>
              <button className="btn start-quiz-btn">Start Quiz</button>
            </div>
          </div>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="no-results">
          <p>No quizzes match your current filters.</p>
          <button 
            className="btn" 
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLevel('All');
              setSearchTerm('');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

// Individual Quiz Component
function QuizComponent({ quizKey }) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const quiz = window.allQuizData[quizKey];
  if (!quiz) return <div>Quiz not found</div>;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.exercises.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.exercises.forEach((exercise, index) => {
      if (selectedAnswers[index] === exercise.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const getAnswerClass = (optionIndex) => {
    if (!showResults && selectedAnswers[currentQuestion] === optionIndex) {
      return 'selected';
    }
    if (showResults) {
      if (optionIndex === quiz.exercises[currentQuestion].correctAnswer) {
        return 'correct';
      }
      if (selectedAnswers[currentQuestion] === optionIndex && optionIndex !== quiz.exercises[currentQuestion].correctAnswer) {
        return 'incorrect';
      }
    }
    return '';
  };

  if (showResults) {
    return (
      <div className="quiz-results">
        <h2>Quiz Complete!</h2>
        <div className="score-display">
          <p>Your Score: <span className="score">{score}</span> out of <span className="total">{quiz.exercises.length}</span></p>
          <p className="percentage">{Math.round((score / quiz.exercises.length) * 100)}%</p>
        </div>
        <div className="result-actions">
          <button className="btn reset-btn" onClick={resetQuiz}>Try Again</button>
          <button className="btn back-btn" onClick={() => window.location.reload()}>Back to Selection</button>
        </div>
      </div>
    );
  }

  const currentExercise = quiz.exercises[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="question-container">
      <h3 className="question">{currentExercise.question}</h3>
      
      <div className="options">
        {currentExercise.options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${getAnswerClass(index)}`}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResults}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="quiz-navigation">
        <button 
          className="btn nav-btn" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        
        <button 
          className="btn nav-btn primary" 
          onClick={handleNext}
          disabled={!hasAnswered}
        >
          {currentQuestion === quiz.exercises.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// Make component available globally
if (typeof window !== 'undefined') {
  window.MasterQuizSelector = MasterQuizSelector;
}
