// React Quiz Component for "Objects That Tell a Story"
const quizData = {
  title: "Objects That Tell a Story (A2)",
  exercises: [
    // Warm-up questions (converted to multiple choice)
    {
      type: "multiple-choice",
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
      type: "multiple-choice",
      question: "Have you ever bought something second-hand?",
      options: [
        "Yes, and I love finding unique items",
        "No, I only buy new things",
        "Only books",
        "I'm not sure"
      ],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "What object in your home has a memory attached to it?",
      options: [
        "A family photo",
        "My phone",
        "The refrigerator",
        "Nothing special"
      ],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "Do you prefer to repair things or buy new ones?",
      options: [
        "Repair when possible",
        "Always buy new",
        "It depends on the item",
        "I don't care"
      ],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "What is the most special gift you have received?",
      options: [
        "Something handmade",
        "An expensive item",
        "A gift card",
        "I don't receive gifts"
      ],
      correctAnswer: 0
    },
    
    // Vocabulary matching (converted to multiple choice)
    {
      type: "multiple-choice",
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
      type: "multiple-choice",
      question: "What does 'faded' mean?",
      options: [
        "Less bright or colorful than before",
        "Completely broken",
        "Very old",
        "Expensive"
      ],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "What is an 'auction'?",
      options: [
        "A public sale where people offer higher and higher prices",
        "A charity event",
        "A garage sale",
        "A flea market"
      ],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "What does 'donate' mean?",
      options: [
        "To give something to a charity or organization",
        "To sell something",
        "To borrow something",
        "To repair something"
      ],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "What does 'borrow' mean?",
      options: [
        "To take something for a short time and return it later",
        "To buy something",
        "To steal something",
        "To give something away"
      ],
      correctAnswer: 0
    },
    
    // Vocabulary review (converted to multiple choice)
    {
      type: "multiple-choice",
      question: "The old photo looks ____ after many years in the sun.",
      options: ["faded", "bright", "new", "expensive"],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "My grandmother gave me a ring; it's a family ____.",
      options: ["heirloom", "gift", "memory", "story"],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "Please read the ____ to see how to wash this shirt.",
      options: ["label", "note", "postcard", "book"],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "Could I ____ your dictionary for the test?",
      options: ["borrow", "buy", "donate", "repair"],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "They will ____ the painting to raise money for the museum.",
      options: ["auction", "donate", "repair", "sell"],
      correctAnswer: 0
    },
    
    // Grammar review (converted to multiple choice)
    {
      type: "multiple-choice",
      question: "We ____ (visit) the shop last Saturday and ____ (buy) two books.",
      options: ["visited, bought", "visit, buy", "visiting, buying", "visits, buys"],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "She ____ (find) a postcard and ____ (send) it to her friend.",
      options: ["found, sent", "find, send", "finding, sending", "finds, sends"],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "They ____ (repair) the clock and ____ (donate) it.",
      options: ["repaired, donated", "repair, donate", "repairing, donating", "repairs, donates"],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "I ____ (read) the label but ____ (not/understand) it.",
      options: ["read, didn't understand", "reading, not understanding", "read, not understand", "reads, doesn't understand"],
      correctAnswer: 0
    },
    {
      type: "multiple-choice",
      question: "He ____ (leave) a note in the pocket for the next owner.",
      options: ["left", "leaving", "leaves", "leave"],
      correctAnswer: 0
    }
  ]
};

// Quiz Component
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.exercises.length - 1) {
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
    quizData.exercises.forEach((exercise, index) => {
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
      if (optionIndex === quizData.exercises[currentQuestion].correctAnswer) {
        return 'correct';
      }
      if (selectedAnswers[currentQuestion] === optionIndex && optionIndex !== quizData.exercises[currentQuestion].correctAnswer) {
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
          <p>Your Score: <span className="score">{score}</span> out of <span className="total">{quizData.exercises.length}</span></p>
          <p className="percentage">{Math.round((score / quizData.exercises.length) * 100)}%</p>
        </div>
        <button className="btn reset-btn" onClick={resetQuiz}>Try Again</button>
      </div>
    );
  }

  const currentExercise = quizData.exercises[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>{quizData.title}</h2>
        <div className="progress">
          Question {currentQuestion + 1} of {quizData.exercises.length}
        </div>
      </div>

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
          {currentQuestion === quizData.exercises.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// Make Quiz available globally for browser use
if (typeof window !== 'undefined') {
  window.Quiz = Quiz;
}
