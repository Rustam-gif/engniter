// Comprehensive Quiz System for All PDF Files
const allQuizData = {
  // TRAVEL & CULTURE
  "travel": {
    title: "Travel & Tourism (A2-B1)",
    level: "A2-B1",
    topic: "Travel",
    exercises: [
      {
        question: "What should you do before traveling to a new country?",
        options: [
          "Research local customs and culture",
          "Pack only summer clothes",
          "Book the cheapest flight possible",
          "Learn the entire language"
        ],
        correctAnswer: 0
      },
      {
        question: "What is 'jet lag'?",
        options: [
          "Tiredness from crossing time zones",
          "Fear of flying",
          "Motion sickness on planes",
          "Lost luggage"
        ],
        correctAnswer: 0
      },
      {
        question: "What should you do if you get lost in a foreign city?",
        options: [
          "Ask a local for directions",
          "Start walking randomly",
          "Hide in a building",
          "Call your embassy immediately"
        ],
        correctAnswer: 0
      }
    ]
  },

  "urban-legends-in-different-countries": {
    title: "Urban Legends Around the World (B1)",
    level: "B1",
    topic: "Culture",
    exercises: [
      {
        question: "What are urban legends?",
        options: [
          "Modern folk stories that spread quickly",
          "Official government announcements",
          "Historical facts about cities",
          "Travel guide information"
        ],
        correctAnswer: 0
      },
      {
        question: "Why do urban legends spread so quickly?",
        options: [
          "They're often shocking or mysterious",
          "They're always true",
          "They're written by famous authors",
          "They're taught in schools"
        ],
        correctAnswer: 0
      }
    ]
  },

  // SCIENCE & TECHNOLOGY
  "technology": {
    title: "Technology & Innovation (B1-C1)",
    level: "B1-C1",
    topic: "Technology",
    exercises: [
      {
        question: "How has technology changed education?",
        options: [
          "Online learning and digital resources",
          "Only traditional classroom teaching",
          "No changes at all",
          "Less access to information"
        ],
        correctAnswer: 0
      },
      {
        question: "What is artificial intelligence?",
        options: [
          "Computers that can think like humans",
          "Regular computer programs",
          "Human brain enhancement",
          "Science fiction only"
        ],
        correctAnswer: 0
      }
    ]
  },

  "future-jobs-that-dont-exist-yet": {
    title: "Future Jobs That Don't Exist Yet (B1)",
    level: "B1",
    topic: "Technology",
    exercises: [
      {
        question: "What skills will be important for future jobs?",
        options: [
          "Adaptability and digital literacy",
          "Only traditional skills",
          "Physical strength only",
          "No new skills needed"
        ],
        correctAnswer: 0
      },
      {
        question: "How might automation affect employment?",
        options: [
          "Some jobs will change or disappear",
          "All jobs will disappear",
          "No changes to employment",
          "Only manual jobs affected"
        ],
        correctAnswer: 0
      }
    ]
  },

  // HEALTH & LIFESTYLE
  "health-and-fitness": {
    title: "Health & Fitness (A2-B1)",
    level: "A2-B1",
    topic: "Health",
    exercises: [
      {
        question: "What are the benefits of regular exercise?",
        options: [
          "Better health and mood",
          "Only weight loss",
          "No real benefits",
          "Tiredness and pain"
        ],
        correctAnswer: 0
      },
      {
        question: "How much water should you drink daily?",
        options: [
          "6-8 glasses (about 2 liters)",
          "Only when thirsty",
          "As much as possible",
          "No water needed"
        ],
        correctAnswer: 0
      }
    ]
  },

  "caffeine-crash": {
    title: "Caffeine Crash & Energy (B1)",
    level: "B1",
    topic: "Health",
    exercises: [
      {
        question: "What causes a caffeine crash?",
        options: [
          "Caffeine leaving your system",
          "Too much sleep",
          "Not enough food",
          "Exercise"
        ],
        correctAnswer: 0
      },
      {
        question: "How can you avoid caffeine crashes?",
        options: [
          "Limit caffeine and stay hydrated",
          "Drink more coffee",
          "Skip meals",
          "Stay up late"
        ],
        correctAnswer: 0
      }
    ]
  },

  // BUSINESS & PROFESSIONAL
  "Cultural-Misunderstandings-in-Business(B1-B2)": {
    title: "Cultural Misunderstandings in Business (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "Why is cultural awareness important in business?",
        options: [
          "Prevents misunderstandings and builds trust",
          "Only for international companies",
          "Not really important",
          "Makes meetings longer"
        ],
        correctAnswer: 0
      },
      {
        question: "What should you do before a business meeting with international partners?",
        options: [
          "Research their cultural customs",
          "Only prepare your presentation",
          "Arrive late to show importance",
          "Speak only your language"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Decision-Making-Under-Stress(B1-B2)": {
    title: "Decision-Making Under Stress (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "How does stress affect decision-making?",
        options: [
          "Can lead to poor choices and rushed decisions",
          "Always improves decision quality",
          "No effect on decisions",
          "Makes decisions easier"
        ],
        correctAnswer: 0
      },
      {
        question: "What's a good strategy for making decisions under pressure?",
        options: [
          "Take a moment to breathe and think",
          "Make the first decision that comes to mind",
          "Ask everyone else to decide",
          "Delay the decision indefinitely"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Failure-Stories-in-Business(B1-B2)": {
    title: "Failure Stories in Business (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What can we learn from business failures?",
        options: [
          "Valuable lessons for future success",
          "Nothing useful",
          "Only that business is risky",
          "To avoid business entirely"
        ],
        correctAnswer: 0
      },
      {
        question: "How should you view failure in business?",
        options: [
          "As a learning opportunity",
          "As a sign to give up",
          "As something to hide",
          "As proof of incompetence"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Side-Hustles(B1-B2)": {
    title: "Side Hustles (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is a side hustle?",
        options: [
          "A part-time job or business alongside your main work",
          "A hobby that costs money",
          "A full-time career change",
          "A vacation activity"
        ],
        correctAnswer: 0
      },
      {
        question: "What are the benefits of having a side hustle?",
        options: [
          "Extra income and skill development",
          "Only extra money",
          "No real benefits",
          "Less free time"
        ],
        correctAnswer: 0
      }
    ]
  },

  "The-Gig-Economy(B1-B2)": {
    title: "The Gig Economy (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is the gig economy?",
        options: [
          "Short-term, flexible work arrangements",
          "Traditional 9-5 jobs only",
          "Government employment",
          "Volunteer work"
        ],
        correctAnswer: 0
      },
      {
        question: "What are the advantages of gig work?",
        options: [
          "Flexibility and variety",
          "Only low pay",
          "No advantages",
          "Always stressful"
        ],
        correctAnswer: 0
      }
    ]
  },

  "The-Hidden-Cost-of-Meetings(B1-B2)": {
    title: "The Hidden Cost of Meetings (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What are the hidden costs of meetings?",
        options: [
          "Time, productivity, and opportunity cost",
          "Only room rental fees",
          "Coffee and snacks",
          "No hidden costs"
        ],
        correctAnswer: 0
      },
      {
        question: "How can you make meetings more efficient?",
        options: [
          "Set clear agendas and time limits",
          "Invite everyone in the company",
          "Have no structure",
          "Always schedule for 2 hours"
        ],
        correctAnswer: 0
      }
    ]
  },

  "The-Language-of-Startups(B1-B2)": {
    title: "The Language of Startups (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is a startup?",
        options: [
          "A new, fast-growing company",
          "An established corporation",
          "A government agency",
          "A non-profit organization"
        ],
        correctAnswer: 0
      },
      {
        question: "What does 'MVP' mean in startup language?",
        options: [
          "Minimum Viable Product",
          "Most Valuable Player",
          "Maximum Value Proposition",
          "Main Venture Plan"
        ],
        correctAnswer: 0
      }
    ]
  },

  "The-Neuroscience-and-Psychology-of-Brand-Attachment(B1-B2)": {
    title: "Brand Attachment Psychology (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "Why do people become attached to brands?",
        options: [
          "Emotional connection and trust",
          "Only because of advertising",
          "No real reason",
          "Because they're expensive"
        ],
        correctAnswer: 0
      },
      {
        question: "How do brands build customer loyalty?",
        options: [
          "Consistent quality and positive experiences",
          "Only through low prices",
          "By changing constantly",
          "Through aggressive marketing"
        ],
        correctAnswer: 0
      }
    ]
  },

  "The-Power-of-Networking(B1-B2)": {
    title: "The Power of Networking (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is professional networking?",
        options: [
          "Building relationships for career growth",
          "Only using social media",
          "Selling products to friends",
          "Avoiding colleagues"
        ],
        correctAnswer: 0
      },
      {
        question: "What are the benefits of networking?",
        options: [
          "Career opportunities and knowledge sharing",
          "Only finding jobs",
          "No real benefits",
          "Wasting time"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Time-Management-Myths-at-Work(B1-B2)": {
    title: "Time Management Myths at Work (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is a common time management myth?",
        options: [
          "Multitasking makes you more productive",
          "Planning takes too much time",
          "Deadlines are always helpful",
          "Breaks reduce productivity"
        ],
        correctAnswer: 0
      },
      {
        question: "What's the best way to manage your time at work?",
        options: [
          "Prioritize tasks and avoid distractions",
          "Work longer hours",
          "Do everything at once",
          "Wait until the last minute"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Work-Life-Balance-as-a-Business-Strategy(B1-B2)": {
    title: "Work-Life Balance Strategy (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is work-life balance?",
        options: [
          "Maintaining harmony between work and personal life",
          "Working all the time",
          "Only focusing on personal life",
          "Avoiding work entirely"
        ],
        correctAnswer: 0
      },
      {
        question: "Why is work-life balance important for business?",
        options: [
          "Improves productivity and reduces burnout",
          "Only for employees' happiness",
          "No business benefit",
          "Reduces company profits"
        ],
        correctAnswer: 0
      }
    ]
  },

  // HISTORY & DISCOVERIES
  "accidental-discoveries-that-changed-the-world": {
    title: "Accidental Discoveries That Changed the World (B1)",
    level: "B1",
    topic: "History",
    exercises: [
      {
        question: "What is an accidental discovery?",
        options: [
          "Finding something while looking for something else",
          "Only planned research results",
          "Something that was stolen",
          "A discovery made by accident"
        ],
        correctAnswer: 0
      },
      {
        question: "Why are accidental discoveries important?",
        options: [
          "They often lead to major breakthroughs",
          "They're always useless",
          "They're only interesting stories",
          "They waste research time"
        ],
        correctAnswer: 0
      }
    ]
  },

  "everyday-things-that-were-invented-by-accident": {
    title: "Everyday Things Invented by Accident (B1)",
    level: "B1",
    topic: "History",
    exercises: [
      {
        question: "How do accidental inventions happen?",
        options: [
          "Through unexpected results or mistakes",
          "Only through careful planning",
          "By copying other inventions",
          "Through government research"
        ],
        correctAnswer: 0
      },
      {
        question: "What can we learn from accidental inventions?",
        options: [
          "Innovation can come from unexpected places",
          "Only planned inventions matter",
          "Accidents are always bad",
          "Nothing useful"
        ],
        correctAnswer: 0
      }
    ]
  },

  "lost-civilizations-forgotten-technologies": {
    title: "Lost Civilizations & Forgotten Technologies (B1)",
    level: "B1",
    topic: "History",
    exercises: [
      {
        question: "What can we learn from lost civilizations?",
        options: [
          "Ancient knowledge and cultural insights",
          "Only that they failed",
          "Nothing useful today",
          "How to avoid progress"
        ],
        correctAnswer: 0
      },
      {
        question: "Why do civilizations sometimes lose knowledge?",
        options: [
          "Wars, disasters, or cultural changes",
          "Only because they were stupid",
          "They never had real knowledge",
          "Knowledge always disappears"
        ],
        correctAnswer: 0
      }
    ]
  },

  // PSYCHOLOGY & BEHAVIOR
  "the-psychology-of-fear": {
    title: "The Psychology of Fear (B1)",
    level: "B1",
    topic: "Psychology",
    exercises: [
      {
        question: "What is fear?",
        options: [
          "A natural response to perceived danger",
          "Always a bad emotion",
          "Something to avoid completely",
          "Only for children"
        ],
        correctAnswer: 0
      },
      {
        question: "How can understanding fear help us?",
        options: [
          "Better manage our responses and decisions",
          "Only avoid scary situations",
          "No real help",
          "Make us more afraid"
        ],
        correctAnswer: 0
      }
    ]
  },

  "the-science-of-luck": {
    title: "The Science of Luck (B1)",
    level: "B1",
    topic: "Psychology",
    exercises: [
      {
        question: "What is luck?",
        options: [
          "Random chance or good fortune",
          "Something you can control",
          "Only for lucky people",
          "A scientific fact"
        ],
        correctAnswer: 0
      },
      {
        question: "How can you improve your chances of success?",
        options: [
          "Preparation and persistence",
          "Only hoping for luck",
          "Doing nothing",
          "Avoiding all risks"
        ],
        correctAnswer: 0
      }
    ]
  },

  // NATURE & SCIENCE
  "when-animals-outsmart-humans": {
    title: "When Animals Outsmart Humans (B1)",
    level: "B1",
    topic: "Nature",
    exercises: [
      {
        question: "How do animals sometimes outsmart humans?",
        options: [
          "Using instincts and natural abilities",
          "Only through training",
          "By being more intelligent",
          "Through magic"
        ],
        correctAnswer: 0
      },
      {
        question: "What can we learn from animal intelligence?",
        options: [
          "Different ways of solving problems",
          "Only that animals are smart",
          "Nothing useful",
          "To avoid animals"
        ],
        correctAnswer: 0
      }
    ]
  },

  "when-nature-breaks-the-rules": {
    title: "When Nature Breaks the Rules (B1)",
    level: "B1",
    topic: "Nature",
    exercises: [
      {
        question: "What does it mean when nature 'breaks the rules'?",
        options: [
          "Unusual or unexpected natural phenomena",
          "Nature making mistakes",
          "Only natural disasters",
          "Animals behaving badly"
        ],
        correctAnswer: 0
      },
      {
        question: "Why do natural anomalies occur?",
        options: [
          "Complex natural processes and variations",
          "Nature being disobedient",
          "Only human interference",
          "Random chaos"
        ],
        correctAnswer: 0
      }
    ]
  },

  // ENVIRONMENT & CLIMATE
  "environment-climate-change": {
    title: "Environment & Climate Change (B1)",
    level: "B1",
    topic: "Environment",
    exercises: [
      {
        question: "What is climate change?",
        options: [
          "Long-term changes in global weather patterns",
          "Only temperature increases",
          "Daily weather changes",
          "Seasonal variations"
        ],
        correctAnswer: 0
      },
      {
        question: "What can individuals do to help the environment?",
        options: [
          "Reduce waste and use sustainable practices",
          "Only wait for government action",
          "Nothing meaningful",
          "Ignore the problem"
        ],
        correctAnswer: 0
      }
    ]
  },

  // LAW & CULTURE
  "bizarre-laws-around-the-world": {
    title: "Bizarre Laws Around the World (B1)",
    level: "B1",
    topic: "Law",
    exercises: [
      {
        question: "Why do strange laws exist in different countries?",
        options: [
          "Historical, cultural, or practical reasons",
          "Only because governments are crazy",
          "No real reason",
          "To confuse tourists"
        ],
        correctAnswer: 0
      },
      {
        question: "What should you do when visiting a foreign country?",
        options: [
          "Research local laws and customs",
          "Ignore all local rules",
          "Only follow your country's laws",
          "Break rules to test them"
        ],
        correctAnswer: 0
      }
    ]
  },

  // OBJECTS & STORIES
  "objects-that-tell-a-story": {
    title: "Objects That Tell a Story (A2)",
    level: "A2",
    topic: "Culture",
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
      }
    ]
  },

  // FREE LESSONS
  "Brand": {
    title: "Brand & Marketing (B1)",
    level: "B1",
    topic: "Business",
    exercises: [
      {
        question: "What is a brand?",
        options: [
          "A company's identity and reputation",
          "Only a logo",
          "A product name",
          "An advertisement"
        ],
        correctAnswer: 0
      },
      {
        question: "Why is branding important?",
        options: [
          "Builds trust and customer loyalty",
          "Only for large companies",
          "No real importance",
          "Wastes money"
        ],
        correctAnswer: 0
      }
    ]
  }
};

// Quiz Categories for Organization
const quizCategories = {
  "Business": ["Cultural-Misunderstandings-in-Business(B1-B2)", "Decision-Making-Under-Stress(B1-B2)", "Failure-Stories-in-Business(B1-B2)", "Side-Hustles(B1-B2)", "The-Gig-Economy(B1-B2)", "The-Hidden-Cost-of-Meetings(B1-B2)", "The-Language-of-Startups(B1-B2)", "The-Neuroscience-and-Psychology-of-Brand-Attachment(B1-B2)", "The-Power-of-Networking(B1-B2)", "Time-Management-Myths-at-Work(B1-B2)", "Work-Life-Balance-as-a-Business-Strategy(B1-B2)", "Brand"],
  "Technology": ["technology", "future-jobs-that-dont-exist-yet"],
  "Health": ["health-and-fitness", "caffeine-crash"],
  "Travel": ["travel", "urban-legends-in-different-countries"],
  "History": ["accidental-discoveries-that-changed-the-world", "everyday-things-that-were-invented-by-accident", "lost-civilizations-forgotten-technologies"],
  "Psychology": ["the-psychology-of-fear", "the-science-of-luck"],
  "Nature": ["when-animals-outsmart-humans", "when-nature-breaks-the-rules"],
  "Environment": ["environment-climate-change"],
  "Law": ["bizarre-laws-around-the-world"],
  "Culture": ["objects-that-tell-a-story"]
};

// Quiz Levels
const quizLevels = {
  "A2": ["objects-that-tell-a-story"],
  "A2-B1": ["travel"],
  "B1": ["urban-legends-in-different-countries", "future-jobs-that-dont-exist-yet", "health-and-fitness", "caffeine-crash", "accidental-discoveries-that-changed-the-world", "everyday-things-that-were-invented-by-accident", "lost-civilizations-forgotten-technologies", "the-psychology-of-fear", "the-science-of-luck", "when-animals-outsmart-humans", "when-nature-breaks-the-rules", "environment-climate-change", "bizarre-laws-around-the-world", "Brand"],
  "B1-B2": ["Cultural-Misunderstandings-in-Business(B1-B2)", "Decision-Making-Under-Stress(B1-B2)", "Failure-Stories-in-Business(B1-B2)", "Side-Hustles(B1-B2)", "The-Gig-Economy(B1-B2)", "The-Hidden-Cost-of-Meetings(B1-B2)", "The-Language-of-Startups(B1-B2)", "The-Neuroscience-and-Psychology-of-Brand-Attachment(B1-B2)", "The-Power-of-Networking(B1-B2)", "Time-Management-Myths-at-Work(B1-B2)", "Work-Life-Balance-as-a-Business-Strategy(B1-B2)"],
  "B1-C1": ["technology"]
};

// Make data available globally
if (typeof window !== 'undefined') {
  window.allQuizData = allQuizData;
  window.quizCategories = quizCategories;
  window.quizLevels = quizLevels;
}
