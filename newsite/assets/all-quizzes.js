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
        question: "Brand attachment is mainly based on…",
        options: ["Logic only", "Emotions and memory", "Price only", "Advertising alone"],
        correctAnswer: 1
      },
      {
        question: "Which part of the brain reacts to strong brands?",
        options: [
          "Frontal lobe",
          "Limbic system (emotions)",
          "Spinal cord",
          "Cerebellum"
        ],
        correctAnswer: 1
      },
      {
        question: "Why do people trust brands?",
        options: [
          "Familiarity and positive experiences",
          "Because it's free",
          "Random chance",
          "No reason"
        ],
        correctAnswer: 0
      },
      {
        question: "Which is an example of brand attachment?",
        options: [
          "Drinking coffee at any café",
          "Always choosing Starbucks",
          "Trying new brands weekly",
          "Not caring about brands"
        ],
        correctAnswer: 1
      },
      {
        question: "A brand's 'storytelling' works because…",
        options: ["Humans love stories", "It is boring", "It costs less", "It avoids emotions"],
        correctAnswer: 0
      },
      {
        question: "Which sense is most powerful for branding?",
        options: ["Smell", "Sight", "Touch", "All combined"],
        correctAnswer: 3
      },
      {
        question: "Which is not a psychological tactic in branding?",
        options: [
          "Colors & logos",
          "Loyalty programs",
          "Scientific equations",
          "Emotional advertising"
        ],
        correctAnswer: 2
      },
      {
        question: "Why do people buy luxury brands?",
        options: [
          "Utility only",
          "Status and self-image",
          "They are always cheaper",
          "By accident"
        ],
        correctAnswer: 1
      },
      {
        question: "What's the 'halo effect' in branding?",
        options: [
          "When one positive trait influences overall perception",
          "A discount strategy",
          "Negative advertising",
          "Selling with religion"
        ],
        correctAnswer: 0
      },
      {
        question: "Which company is famous for strong brand attachment?",
        options: ["Apple", "Random grocery store", "Small unknown shop", "Local kiosk"],
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
        question: "Networking mainly helps with…",
        options: ["Sleeping more", "Building relationships", "Shopping discounts", "Watching Netflix"],
        correctAnswer: 1
      },
      {
        question: "Which platform is best for professional networking?",
        options: ["TikTok", "LinkedIn", "Snapchat", "Instagram"],
        correctAnswer: 1
      },
      {
        question: "Networking is important because…",
        options: [
          "It opens job opportunities",
          "It wastes time",
          "It only works for extroverts",
          "It lowers salaries"
        ],
        correctAnswer: 0
      },
      {
        question: "Which is not good networking?",
        options: [
          "Asking for advice",
          "Sharing knowledge",
          "Helping others",
          "Ignoring people after events"
        ],
        correctAnswer: 3
      },
      {
        question: "What does 'elevator pitch' mean?",
        options: [
          "Selling elevators",
          "Short self-introduction",
          "Talking about sports",
          "Explaining history"
        ],
        correctAnswer: 1
      },
      {
        question: "Networking works best when you…",
        options: ["Only take", "Only give", "Give and take", "Avoid contact"],
        correctAnswer: 2
      },
      {
        question: "Which event is best for networking?",
        options: ["Job fair", "Concert", "Netflix party", "Family dinner"],
        correctAnswer: 0
      },
      {
        question: "Why is follow-up important?",
        options: [
          "Shows interest and professionalism",
          "Wastes time",
          "Annoys people",
          "None"
        ],
        correctAnswer: 0
      },
      {
        question: "Which is a digital networking tool?",
        options: ["Zoom meetings", "Online games", "Amazon", "Uber"],
        correctAnswer: 0
      },
      {
        question: "Networking should be…",
        options: [
          "Transactional only",
          "Based on trust",
          "Always about money",
          "Avoided"
        ],
        correctAnswer: 1
      }
    ]
  },

  "Time-Management-Myths-at-Work(B1-B2)": {
    title: "Time Management Myths at Work (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "Which is a common time management myth?",
        options: [
          "Multitasking is productive",
          "Breaks improve focus",
          "Prioritizing tasks helps",
          "Planning saves time"
        ],
        correctAnswer: 0
      },
      {
        question: "Which tool is used for time management?",
        options: ["To-do list", "Netflix", "Candy Crush", "Instagram"],
        correctAnswer: 0
      },
      {
        question: "The 80/20 rule is also called…",
        options: ["Einstein's Law", "Pareto Principle", "Newton's Theory", "Murphy's Law"],
        correctAnswer: 1
      },
      {
        question: "Which wastes time at work?",
        options: [
          "Checking emails every 5 min",
          "Batch-processing tasks",
          "Setting deadlines",
          "Using a calendar"
        ],
        correctAnswer: 0
      },
      {
        question: "Myth: 'More hours means…'",
        options: ["More productivity", "More mistakes", "More stress", "All"],
        correctAnswer: 3
      },
      {
        question: "Which is not time management?",
        options: ["Planning", "Delegating", "Procrastinating", "Prioritizing"],
        correctAnswer: 2
      },
      {
        question: "The Pomodoro technique uses…",
        options: ["Music", "25-minute focus blocks", "Skipping sleep", "Texting"],
        correctAnswer: 1
      },
      {
        question: "Which is the biggest time waster?",
        options: ["Social media", "Prioritization", "Delegation", "Automation"],
        correctAnswer: 0
      },
      {
        question: "Myth: 'Deadlines always…'",
        options: ["Cause panic", "Improve focus", "Are bad", "Waste time"],
        correctAnswer: 1
      },
      {
        question: "Which helps avoid procrastination?",
        options: [
          "Huge tasks",
          "Breaking tasks into small steps",
          "Ignoring deadlines",
          "Multitasking"
        ],
        correctAnswer: 1
      }
    ]
  },

  "Work-Life-Balance-as-a-Business-Strategy(B1-B2)": {
    title: "Work-Life Balance Strategy (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is the main goal of work-life balance?",
        options: [
          "More working hours",
          "More family time only",
          "A balance between work and personal life",
          "Less productivity"
        ],
        correctAnswer: 2
      },
      {
        question: "Which country is famous for 'siestas' (afternoon rest)?",
        options: ["Italy", "Spain", "Germany", "Japan"],
        correctAnswer: 1
      },
      {
        question: "Which of these reduces stress?",
        options: ["Overworking", "Skipping sleep", "Exercise", "Multitasking"],
        correctAnswer: 2
      },
      {
        question: "Work-life balance improves…",
        options: ["Salary only", "Health and productivity", "Only family time", "None"],
        correctAnswer: 1
      },
      {
        question: "What is burnout?",
        options: [
          "Feeling hungry at work",
          "Extreme exhaustion from work",
          "Taking holidays",
          "A business failure"
        ],
        correctAnswer: 1
      },
      {
        question: "What helps improve balance?",
        options: ["Long meetings", "Flexible schedules", "24/7 emails", "Micromanagement"],
        correctAnswer: 1
      },
      {
        question: "Which tool supports balance?",
        options: ["Meditation apps", "Alarms only", "More deadlines", "Overtime"],
        correctAnswer: 0
      },
      {
        question: "Why do companies promote work-life balance?",
        options: [
          "To increase staff turnover",
          "To make employees quit",
          "To keep employees healthy and loyal",
          "To lower performance"
        ],
        correctAnswer: 2
      },
      {
        question: "Who is responsible for work-life balance?",
        options: ["Only the boss", "Only employees", "Both employees and companies", "Nobody"],
        correctAnswer: 2
      },
      {
        question: "Which is an example of bad work-life balance?",
        options: [
          "Spending time with family",
          "Skipping lunch for meetings",
          "Exercising before work",
          "Taking vacation days"
        ],
        correctAnswer: 1
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
          "A company logo only",
          "A product's price",
          "The identity and perception of a company/product",
          "An advertisement"
        ],
        correctAnswer: 2
      },
      {
        question: "Which is a strong global brand?",
        options: ["Apple", "Coca-Cola", "Nike", "All"],
        correctAnswer: 3
      },
      {
        question: "What helps build a brand?",
        options: ["Consistent messaging", "Quality products", "Customer trust", "All"],
        correctAnswer: 3
      },
      {
        question: "Which is not part of branding?",
        options: ["Customer experience", "Packaging design", "Employee salary", "Advertising"],
        correctAnswer: 2
      },
      {
        question: "What is 'brand loyalty'?",
        options: [
          "Customers prefer competitors",
          "Customers stay with the brand",
          "Employees promote the brand",
          "A company ignores trends"
        ],
        correctAnswer: 1
      },
      {
        question: "What makes a brand memorable?",
        options: ["Unique design", "Strong story", "Emotional connection", "All"],
        correctAnswer: 3
      },
      {
        question: "Which is an example of rebranding?",
        options: ["Facebook → Meta", "Google → Alphabet", "Dunkin' Donuts → Dunkin'", "All"],
        correctAnswer: 3
      },
      {
        question: "What is 'brand equity'?",
        options: [
          "The financial value of a brand",
          "A company's debt",
          "The number of ads",
          "Employee bonuses"
        ],
        correctAnswer: 0
      },
      {
        question: "A successful brand often creates…",
        options: ["Trust", "Recognition", "Differentiation", "All"],
        correctAnswer: 3
      },
      {
        question: "Which of these is a personal brand?",
        options: ["Elon Musk on Twitter", "Cristiano Ronaldo's CR7", "Oprah Winfrey", "All"],
        correctAnswer: 3
      }
    ]
  },

  // NEW COMPREHENSIVE QUIZZES
  "Startup-Language": {
    title: "The Language of Startups (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "A 'startup' usually means…",
        options: [
          "A huge traditional company",
          "A new innovative business",
          "A government office",
          "A school project"
        ],
        correctAnswer: 1
      },
      {
        question: "MVP stands for…",
        options: [
          "Most Valuable Player",
          "Minimum Viable Product",
          "Maximum Venture Profit",
          "Multi Value Plan"
        ],
        correctAnswer: 1
      },
      {
        question: "What does 'pivot' mean in startups?",
        options: [
          "Giving up completely",
          "Changing direction or strategy",
          "Hiring new managers only",
          "Doing nothing"
        ],
        correctAnswer: 1
      },
      {
        question: "'Bootstrapping' means…",
        options: [
          "Funding the business yourself",
          "Asking for donations",
          "Taking a big loan immediately",
          "Closing early"
        ],
        correctAnswer: 0
      },
      {
        question: "Angel investors are…",
        options: [
          "Bank managers",
          "Rich individuals funding startups",
          "Family members",
          "Lawyers"
        ],
        correctAnswer: 1
      },
      {
        question: "A 'pitch deck' is…",
        options: [
          "A presentation for investors",
          "A sports field",
          "An office room",
          "A design template"
        ],
        correctAnswer: 0
      },
      {
        question: "Unicorn in startup language means…",
        options: [
          "A rare idea",
          "A private company valued at $1B+",
          "A myth",
          "A government project"
        ],
        correctAnswer: 1
      },
      {
        question: "What's 'scaling'?",
        options: [
          "Making the company bigger",
          "Selling fish",
          "Firing people",
          "Cutting costs only"
        ],
        correctAnswer: 0
      },
      {
        question: "Which is a famous startup success story?",
        options: ["Uber", "Local bakery", "Small family shop", "City council"],
        correctAnswer: 0
      },
      {
        question: "Accelerator programs offer…",
        options: [
          "Speed dating",
          "Funding, mentorship, resources",
          "Free office snacks",
          "Random emails"
        ],
        correctAnswer: 1
      }
    ]
  },

  "Hidden-Cost-Meetings": {
    title: "The Hidden Cost of Meetings (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "Why are too many meetings a problem?",
        options: [
          "They waste time and money",
          "They increase productivity",
          "They reduce stress",
          "They shorten emails"
        ],
        correctAnswer: 0
      },
      {
        question: "What is 'meeting fatigue'?",
        options: [
          "Getting tired from long unnecessary meetings",
          "Coffee shortage",
          "Forgetting names",
          "Overeating"
        ],
        correctAnswer: 0
      },
      {
        question: "Which is a hidden cost of meetings?",
        options: ["Lost productivity", "Employee stress", "Higher salary costs", "All"],
        correctAnswer: 3
      },
      {
        question: "Which meeting is most effective?",
        options: ["Without agenda", "Short and focused", "Long and unplanned", "Daily 3-hour call"],
        correctAnswer: 1
      },
      {
        question: "Who should attend meetings?",
        options: ["Everyone always", "Only relevant people", "Random staff", "Outsiders"],
        correctAnswer: 1
      },
      {
        question: "What helps reduce costs?",
        options: ["Clear agenda", "Limiting time", "Online tools", "All"],
        correctAnswer: 3
      },
      {
        question: "What's a 'stand-up meeting'?",
        options: [
          "Comedy show",
          "Short quick meeting where people stand",
          "Lunch break",
          "Training"
        ],
        correctAnswer: 1
      },
      {
        question: "Which tool replaces long meetings?",
        options: ["Slack/Teams messages", "More emails", "Coffee breaks", "Paper memos"],
        correctAnswer: 0
      },
      {
        question: "What is meeting overload?",
        options: [
          "Too many unnecessary meetings",
          "Too many holidays",
          "Too many employees",
          "None"
        ],
        correctAnswer: 0
      },
      {
        question: "Which company is famous for limiting meetings?",
        options: ["Google", "Amazon (two-pizza rule)", "Walmart", "IBM"],
        correctAnswer: 1
      }
    ]
  },

  "Gig-Economy": {
    title: "The Gig Economy (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is the gig economy?",
        options: [
          "Traditional full-time work",
          "Short-term freelance and contract work",
          "Factory jobs only",
          "Government service"
        ],
        correctAnswer: 1
      },
      {
        question: "Which platform represents gig work?",
        options: ["Uber", "Facebook", "Netflix", "Google"],
        correctAnswer: 0
      },
      {
        question: "Why do people join gig economy?",
        options: ["Flexibility", "Control over schedule", "Extra income", "All"],
        correctAnswer: 3
      },
      {
        question: "What's a drawback?",
        options: [
          "No benefits (insurance, pension)",
          "Flexible hours",
          "More independence",
          "Quick money"
        ],
        correctAnswer: 0
      },
      {
        question: "Gig workers are often called…",
        options: ["Entrepreneurs", "Independent contractors", "Students", "Volunteers"],
        correctAnswer: 1
      },
      {
        question: "Which is not a gig platform?",
        options: ["Fiverr", "Airbnb", "Upwork", "Tesla"],
        correctAnswer: 3
      },
      {
        question: "Gig economy is growing because…",
        options: [
          "Technology enables it",
          "Companies save costs",
          "People want flexibility",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "What is 'job insecurity'?",
        options: [
          "Not sure of stable income",
          "Always safe job",
          "Guaranteed salary",
          "Secure contract"
        ],
        correctAnswer: 0
      },
      {
        question: "Gig economy is also called…",
        options: ["Platform economy", "Digital economy", "Freelance economy", "All"],
        correctAnswer: 3
      },
      {
        question: "Which job is an example of gig work?",
        options: ["Uber driver", "Lawyer in a firm", "Full-time teacher", "Government officer"],
        correctAnswer: 0
      }
    ]
  },

  "Side-Hustles": {
    title: "Side Hustles (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is a side hustle?",
        options: [
          "A full-time job",
          "A small extra income activity outside main job",
          "A company merger",
          "A school assignment"
        ],
        correctAnswer: 1
      },
      {
        question: "Why do people start side hustles?",
        options: [
          "To make extra money",
          "To explore passions",
          "To build future businesses",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Which is an example of a side hustle?",
        options: [
          "Freelance writing after work",
          "A 9–5 office job",
          "Full-time teaching",
          "Retiring"
        ],
        correctAnswer: 0
      },
      {
        question: "A benefit of side hustles is…",
        options: ["Financial security", "Skill development", "Networking", "All"],
        correctAnswer: 3
      },
      {
        question: "A risk of side hustles is…",
        options: ["Burnout", "Less free time", "Conflict with employer", "All"],
        correctAnswer: 3
      },
      {
        question: "What does 'passive income' mean?",
        options: [
          "Money earned with little daily effort",
          "Salary from full-time job",
          "Lottery ticket",
          "One-time payment"
        ],
        correctAnswer: 0
      },
      {
        question: "Which platform is popular for side hustles?",
        options: ["Etsy", "Uber", "Fiverr", "All"],
        correctAnswer: 3
      },
      {
        question: "What's important for side hustlers?",
        options: ["Time management", "Creativity", "Consistency", "All"],
        correctAnswer: 3
      },
      {
        question: "Which is not a typical side hustle?",
        options: ["Blogging", "Dropshipping", "Full-time factory job", "Tutoring"],
        correctAnswer: 2
      },
      {
        question: "Famous entrepreneurs who began with side hustles include…",
        options: [
          "Jeff Bezos (Amazon)",
          "Elon Musk (Zip2)",
          "Mark Zuckerberg (Facebook)",
          "All"
        ],
        correctAnswer: 3
      }
    ]
  },

  "Failure-Stories": {
    title: "Failure Stories in Business (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What is a key lesson from business failures?",
        options: ["Never try again", "Learn and adapt", "Always blame others", "Stop innovating"],
        correctAnswer: 1
      },
      {
        question: "Which company failed after ignoring digital trends?",
        options: ["Blockbuster", "Netflix", "Amazon", "Apple"],
        correctAnswer: 0
      },
      {
        question: "Why do many startups fail?",
        options: ["No market need", "Running out of cash", "Poor team", "All"],
        correctAnswer: 3
      },
      {
        question: "Which brand failed with 'New Coke' in 1985?",
        options: ["Pepsi", "Coca-Cola", "Sprite", "Dr Pepper"],
        correctAnswer: 1
      },
      {
        question: "What can failure bring?",
        options: ["Experience", "Lessons for future", "Resilience", "All"],
        correctAnswer: 3
      },
      {
        question: "What is a common mistake in business?",
        options: ["Ignoring customers", "Overspending", "Bad marketing", "All"],
        correctAnswer: 3
      },
      {
        question: "Which is not a famous failure story?",
        options: [
          "MySpace losing to Facebook",
          "Yahoo missing Google purchase",
          "Amazon Prime launch",
          "Kodak ignoring digital"
        ],
        correctAnswer: 2
      },
      {
        question: "Why did Kodak fail?",
        options: [
          "Ignored digital photography",
          "Too innovative",
          "Lack of patents",
          "Strong leadership"
        ],
        correctAnswer: 0
      },
      {
        question: "Entrepreneurs are advised to…",
        options: ["Take no risks", "Learn from failure", "Quit quickly", "Never innovate"],
        correctAnswer: 1
      },
      {
        question: "Which phrase is true?",
        options: [
          "Failure is the end",
          "Failure is a stepping stone",
          "Failure should be hidden",
          "Failure is always bad"
        ],
        correctAnswer: 1
      }
    ]
  },

  "Decision-Making-Stress": {
    title: "Decision-Making Under Stress (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "Stress affects decision-making by…",
        options: [
          "Reducing focus",
          "Increasing mistakes",
          "Triggering emotional reactions",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Which hormone rises during stress?",
        options: ["Insulin", "Cortisol", "Dopamine", "Melatonin"],
        correctAnswer: 1
      },
      {
        question: "What's a good stress-management technique?",
        options: ["Deep breathing", "Exercise", "Breaks", "All"],
        correctAnswer: 3
      },
      {
        question: "Under stress, people often…",
        options: ["Rush decisions", "Ignore alternatives", "Follow instincts", "All"],
        correctAnswer: 3
      },
      {
        question: "Which profession often faces stress decisions?",
        options: ["Doctors", "Pilots", "Soldiers", "All"],
        correctAnswer: 3
      },
      {
        question: "What's 'fight or flight'?",
        options: [
          "Stress response of body",
          "Holiday plan",
          "Business strategy",
          "Sleeping pattern"
        ],
        correctAnswer: 0
      },
      {
        question: "Which helps improve decisions under stress?",
        options: ["Preparation", "Training", "Checklists", "All"],
        correctAnswer: 3
      },
      {
        question: "Stress can sometimes…",
        options: [
          "Sharpen focus in short bursts",
          "Always harm performance",
          "Make life easier",
          "Replace sleep"
        ],
        correctAnswer: 0
      },
      {
        question: "Which activity reduces long-term stress?",
        options: ["Meditation", "Regular exercise", "Good sleep", "All"],
        correctAnswer: 3
      },
      {
        question: "In emergencies, leaders must…",
        options: [
          "Stay calm and clear",
          "Panic",
          "Delay decisions forever",
          "Ignore team"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Cultural-Misunderstandings": {
    title: "Cultural Misunderstandings in Business (B1-B2)",
    level: "B1-B2",
    topic: "Business",
    exercises: [
      {
        question: "What causes cultural misunderstandings?",
        options: [
          "Language differences",
          "Customs & traditions",
          "Different communication styles",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Which gesture is positive in one culture but rude in another?",
        options: ["Thumbs up", "Smiling", "Handshake", "Hug"],
        correctAnswer: 0
      },
      {
        question: "In Japan, business cards are treated with…",
        options: ["Respect and two hands", "Carelessness", "Left pocket trash", "Joke"],
        correctAnswer: 0
      },
      {
        question: "In some cultures, eye contact shows…",
        options: [
          "Respect",
          "Aggression",
          "Confidence",
          "All depending on culture"
        ],
        correctAnswer: 3
      },
      {
        question: "Silence in business meetings means…",
        options: [
          "Agreement in some cultures",
          "Respect in others",
          "Discomfort elsewhere",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Which culture values punctuality the most?",
        options: ["Germany", "Mexico", "Brazil", "Italy"],
        correctAnswer: 0
      },
      {
        question: "In Middle Eastern business culture…",
        options: [
          "Relationships matter more than contracts",
          "Time is strict",
          "Small talk is avoided",
          "No hospitality"
        ],
        correctAnswer: 0
      },
      {
        question: "Which country prefers indirect communication?",
        options: ["Japan", "USA", "Germany", "Australia"],
        correctAnswer: 0
      },
      {
        question: "What's important for cross-cultural success?",
        options: ["Open-mindedness", "Respect", "Learning about culture", "All"],
        correctAnswer: 3
      },
      {
        question: "A common mistake is…",
        options: [
          "Assuming everyone has same values",
          "Being curious",
          "Listening carefully",
          "Learning culture"
        ],
        correctAnswer: 0
      }
    ]
  },

  // NON-BUSINESS TOPICS
  "Accidental-Discoveries": {
    title: "Accidental Discoveries That Changed the World (B1)",
    level: "B1",
    topic: "History",
    exercises: [
      {
        question: "Which snack was discovered by accident?",
        options: ["Potato chips", "Pizza", "Burger", "Sushi"],
        correctAnswer: 0
      },
      {
        question: "Which medical discovery was accidental?",
        options: ["Penicillin", "X-rays", "Insulin", "Both a & b"],
        correctAnswer: 3
      },
      {
        question: "What was Post-it Notes originally?",
        options: ["A failed strong glue", "Wallpaper", "Paint", "Ink"],
        correctAnswer: 0
      },
      {
        question: "Microwave ovens were discovered when…",
        options: [
          "Candy bar melted near radar",
          "Coffee spilled on wires",
          "Scientist was hungry",
          "Oven broke"
        ],
        correctAnswer: 0
      },
      {
        question: "Coca-Cola began as…",
        options: ["Medicine", "Perfume", "Alcohol", "Snack"],
        correctAnswer: 0
      },
      {
        question: "Safety glass was discovered when…",
        options: [
          "Glass covered with plastic didn't shatter",
          "Window froze",
          "Kids played football",
          "Accident on road"
        ],
        correctAnswer: 0
      },
      {
        question: "Which toy was an accidental discovery?",
        options: ["Play-Doh", "Silly Putty", "Both", "None"],
        correctAnswer: 2
      },
      {
        question: "Penicillin was discovered by…",
        options: ["Alexander Fleming", "Marie Curie", "Isaac Newton", "Einstein"],
        correctAnswer: 0
      },
      {
        question: "The accidental discovery of vulcanized rubber came from…",
        options: [
          "Dropping rubber with sulfur on stove",
          "Mixing paint",
          "Adding metal to plastic",
          "Freezing latex"
        ],
        correctAnswer: 0
      },
      {
        question: "Lesson from accidents in science?",
        options: [
          "Curiosity + observation lead to innovation",
          "Ignore mistakes",
          "Stop experimenting",
          "Avoid risks"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Nature-Breaks-Rules": {
    title: "When Nature Breaks the Rules (B1)",
    level: "B1",
    topic: "Nature",
    exercises: [
      {
        question: "Albino animals are examples of…",
        options: ["Normal genes", "Genetic mutation", "Artificial design", "Perfect adaptation"],
        correctAnswer: 1
      },
      {
        question: "Bees that can live without males are…",
        options: ["Normal", "Breaking usual reproduction rules", "Robots", "Rarely seen"],
        correctAnswer: 1
      },
      {
        question: "What happens when plants grow in extreme places?",
        options: ["They adapt", "They die", "They move", "They become animals"],
        correctAnswer: 0
      },
      {
        question: "Two-headed snakes show…",
        options: ["Mutation", "Myth", "Science fiction", "Magic"],
        correctAnswer: 0
      },
      {
        question: "A fish that walks on land is…",
        options: ["Evolution in action", "Normal mammal", "Fake news", "Robot"],
        correctAnswer: 0
      },
      {
        question: "Which flower eats insects?",
        options: ["Venus Flytrap", "Sunflower", "Rose", "Tulip"],
        correctAnswer: 0
      },
      {
        question: "Nature breaking rules means…",
        options: [
          "Unexpected survival methods",
          "Fake news",
          "Magic",
          "Fiction"
        ],
        correctAnswer: 0
      },
      {
        question: "Animals in Chernobyl show…",
        options: [
          "Adaptation in radiation zones",
          "Extinction",
          "Migration only",
          "No effect"
        ],
        correctAnswer: 0
      },
      {
        question: "When plants bloom out of season, it's…",
        options: [
          "Phenomenon caused by climate change",
          "Always normal",
          "Never possible",
          "Fiction"
        ],
        correctAnswer: 0
      },
      {
        question: "Lesson from 'rule-breaking nature'?",
        options: [
          "Life adapts in surprising ways",
          "Rules never change",
          "Evolution is fake",
          "Science is finished"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Animals-Outsmart-Humans": {
    title: "When Animals Outsmart Humans (B1)",
    level: "B1",
    topic: "Nature",
    exercises: [
      {
        question: "Which bird uses tools to get food?",
        options: ["Crow", "Parrot", "Eagle", "Penguin"],
        correctAnswer: 0
      },
      {
        question: "Dolphins use what for hunting?",
        options: ["Sponges as tools", "Nets", "Humans", "None"],
        correctAnswer: 0
      },
      {
        question: "Octopuses show intelligence by…",
        options: ["Escaping aquariums", "Solving puzzles", "Camouflaging", "All"],
        correctAnswer: 3
      },
      {
        question: "Which animal can remember faces for years?",
        options: ["Elephants", "Sheep", "Both", "None"],
        correctAnswer: 2
      },
      {
        question: "Dogs are trained to…",
        options: [
          "Detect diseases",
          "Smell explosives",
          "Help disabled people",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Which primate uses sign language?",
        options: ["Chimpanzees", "Gorillas", "Orangutans", "All"],
        correctAnswer: 3
      },
      {
        question: "Pigeons were used in wars for…",
        options: [
          "Carrying messages",
          "Attacking",
          "Spying only",
          "Entertainment"
        ],
        correctAnswer: 0
      },
      {
        question: "Which animal can plan ahead?",
        options: ["Ravens", "Humans only", "Frogs", "Turtles"],
        correctAnswer: 0
      },
      {
        question: "Sheep can…",
        options: [
          "Recognize human faces",
          "Solve mazes",
          "Remember friends",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Lesson from animals?",
        options: [
          "Intelligence isn't only human",
          "Animals are robots",
          "Nature is dumb",
          "Instinct beats logic always"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Urban-Legends": {
    title: "Urban Legends in Different Countries (B1)",
    level: "B1",
    topic: "Culture",
    exercises: [
      {
        question: "What are urban legends?",
        options: [
          "Traditional scary stories",
          "True always",
          "Modern myths",
          "Both a & c"
        ],
        correctAnswer: 3
      },
      {
        question: "Japan's famous urban legend is…",
        options: [
          "Kuchisake-onna (Slit-Mouthed Woman)",
          "Dracula",
          "Bigfoot",
          "Zombies"
        ],
        correctAnswer: 0
      },
      {
        question: "In America, one popular legend is…",
        options: ["Bloody Mary", "Chupacabra", "Both", "None"],
        correctAnswer: 2
      },
      {
        question: "Mexico's famous ghost woman is…",
        options: ["La Llorona", "La Fiesta", "La Luna", "La Sombra"],
        correctAnswer: 0
      },
      {
        question: "Which country has the 'Black Volga' car legend?",
        options: ["Russia", "USA", "Germany", "France"],
        correctAnswer: 0
      },
      {
        question: "Why do urban legends spread?",
        options: ["Fear", "Curiosity", "Social sharing", "All"],
        correctAnswer: 3
      },
      {
        question: "Loch Ness Monster belongs to…",
        options: ["Scotland", "Ireland", "Norway", "Canada"],
        correctAnswer: 0
      },
      {
        question: "Which is a common theme in legends?",
        options: [
          "Supernatural creatures",
          "Mystery deaths",
          "Vanishing people",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Are urban legends always fake?",
        options: [
          "Some are based on real events",
          "Always fake",
          "Always true",
          "Scientific fact"
        ],
        correctAnswer: 0
      },
      {
        question: "What do legends show us?",
        options: ["Cultural fears", "Social values", "Imagination", "All"],
        correctAnswer: 3
      }
    ]
  },

  "Travel-Comprehensive": {
    title: "Travel & Tourism (A2-B1)",
    level: "A2-B1",
    topic: "Travel",
    exercises: [
      {
        question: "Why do people travel?",
        options: ["Adventure", "Work", "Relaxation", "All"],
        correctAnswer: 3
      },
      {
        question: "Which is the busiest airport?",
        options: ["Atlanta (USA)", "Heathrow (UK)", "Dubai (UAE)", "Tokyo (Japan)"],
        correctAnswer: 0
      },
      {
        question: "Which country gets the most tourists?",
        options: ["France", "USA", "Spain", "Italy"],
        correctAnswer: 0
      },
      {
        question: "Travel improves…",
        options: ["Knowledge", "Cultural awareness", "Empathy", "All"],
        correctAnswer: 3
      },
      {
        question: "Which is a form of travel?",
        options: ["Backpacking", "Luxury cruises", "Road trips", "All"],
        correctAnswer: 3
      },
      {
        question: "'Eco-tourism' means…",
        options: [
          "Traveling sustainably",
          "Expensive trips",
          "Space travel",
          "Dangerous journeys"
        ],
        correctAnswer: 0
      },
      {
        question: "Which travel app is most used?",
        options: ["Booking.com", "Airbnb", "Skyscanner", "All"],
        correctAnswer: 3
      },
      {
        question: "Which place is a world wonder?",
        options: [
          "Great Wall of China",
          "Taj Mahal",
          "Machu Picchu",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Travel challenges include…",
        options: ["Language barriers", "Health risks", "Money", "All"],
        correctAnswer: 3
      },
      {
        question: "Why do people love travel stories?",
        options: ["Inspiration", "Adventure feelings", "Escape from routine", "All"],
        correctAnswer: 3
      }
    ]
  },

  "Health-Fitness-Comprehensive": {
    title: "Health & Fitness (A2-B1)",
    level: "A2-B1",
    topic: "Health",
    exercises: [
      {
        question: "Which activities are examples of aerobic exercise?",
        options: ["Running", "Cycling", "Swimming", "Weightlifting"],
        correctAnswer: 0
      },
      {
        question: "What are benefits of regular exercise?",
        options: [
          "Improved mood",
          "Stronger muscles",
          "Poor sleep",
          "Better heart health"
        ],
        correctAnswer: 0
      },
      {
        question: "Which nutrients are essential for a healthy diet?",
        options: [
          "Proteins",
          "Carbohydrates",
          "Fats",
          "Artificial coloring"
        ],
        correctAnswer: 0
      },
      {
        question: "What can too much sugar cause?",
        options: [
          "Diabetes risk",
          "Better concentration",
          "Tooth decay",
          "Weight gain"
        ],
        correctAnswer: 0
      },
      {
        question: "Which are examples of strength training?",
        options: ["Push-ups", "Squats", "Bench press", "Walking"],
        correctAnswer: 0
      },
      {
        question: "Good sleep improves which of these?",
        options: ["Memory", "Stress levels", "Skin health", "Laziness"],
        correctAnswer: 0
      },
      {
        question: "What habits support mental fitness?",
        options: ["Meditation", "Reading", "Overeating", "Socializing"],
        correctAnswer: 0
      },
      {
        question: "Which are signs of dehydration?",
        options: ["Headache", "Clear skin", "Dizziness", "Fatigue"],
        correctAnswer: 0
      },
      {
        question: "Which are examples of healthy fats?",
        options: ["Avocado", "Olive oil", "Fried chips", "Nuts"],
        correctAnswer: 0
      },
      {
        question: "Which activities reduce stress?",
        options: [
          "Yoga",
          "Deep breathing",
          "Arguing",
          "Walking in nature"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Caffeine-Crash-Comprehensive": {
    title: "Caffeine Crash & Energy (B1)",
    level: "B1",
    topic: "Health",
    exercises: [
      {
        question: "Which drinks contain caffeine?",
        options: ["Coffee", "Tea", "Energy drinks", "Water"],
        correctAnswer: 0
      },
      {
        question: "What are short-term effects of caffeine?",
        options: [
          "Alertness",
          "Energy boost",
          "Anxiety",
          "Sleepiness"
        ],
        correctAnswer: 0
      },
      {
        question: "What are symptoms of a caffeine crash?",
        options: ["Fatigue", "Irritability", "Headache", "Motivation"],
        correctAnswer: 0
      },
      {
        question: "What causes caffeine crashes?",
        options: [
          "Overconsumption",
          "Energy spike and drop",
          "Regular small doses",
          "Balanced diet"
        ],
        correctAnswer: 0
      },
      {
        question: "Which are safe daily caffeine limits?",
        options: ["200–400 mg", "1000 mg", "50 mg", "Unlimited"],
        correctAnswer: 0
      },
      {
        question: "Which people are more sensitive to caffeine?",
        options: [
          "Children",
          "Pregnant women",
          "Smokers",
          "Older adults"
        ],
        correctAnswer: 0
      },
      {
        question: "What habits reduce caffeine crashes?",
        options: [
          "Drinking water",
          "Eating with coffee",
          "Overdrinking coffee",
          "Napping"
        ],
        correctAnswer: 0
      },
      {
        question: "Which alternatives provide steady energy?",
        options: [
          "Green tea",
          "Exercise",
          "Meditation",
          "Sugar snacks"
        ],
        correctAnswer: 0
      },
      {
        question: "Which body systems are affected by caffeine?",
        options: [
          "Nervous system",
          "Digestive system",
          "Respiratory system",
          "Circulatory system"
        ],
        correctAnswer: 0
      },
      {
        question: "What are long-term effects of high caffeine use?",
        options: ["Insomnia", "Anxiety", "Strong bones", "Addiction"],
        correctAnswer: 0
      }
    ]
  },

  // ADDITIONAL COMPREHENSIVE QUIZZES
  "Future-Jobs": {
    title: "Future Jobs That Don't Exist Yet (B1)",
    level: "B1",
    topic: "Technology",
    exercises: [
      {
        question: "Which jobs could appear due to AI growth?",
        options: [
          "Robot psychologist",
          "AI ethicist",
          "Virtual reality designer",
          "Candle maker"
        ],
        correctAnswer: 0
      },
      {
        question: "Future space jobs may include:",
        options: [
          "Space miner",
          "Moon farmer",
          "Star navigator",
          "Coffee seller"
        ],
        correctAnswer: 0
      },
      {
        question: "Which jobs might appear with climate change?",
        options: [
          "Carbon capture technician",
          "Drone reforester",
          "Ocean plastic cleaner",
          "Cowboy"
        ],
        correctAnswer: 0
      },
      {
        question: "Jobs for aging populations might include:",
        options: [
          "Memory coach",
          "Genetic health advisor",
          "Care robot engineer",
          "Horse trainer"
        ],
        correctAnswer: 0
      },
      {
        question: "Which roles may exist in virtual worlds?",
        options: [
          "Avatar designer",
          "VR teacher",
          "Digital property manager",
          "Fisherman"
        ],
        correctAnswer: 0
      },
      {
        question: "What jobs could grow with biotechnology?",
        options: [
          "Gene editor",
          "Organ grower",
          "Microbe farmer",
          "Typist"
        ],
        correctAnswer: 0
      },
      {
        question: "Which roles may focus on digital privacy?",
        options: [
          "Data guardian",
          "Cybersecurity detective",
          "Digital will manager",
          "Postman"
        ],
        correctAnswer: 0
      },
      {
        question: "Future transportation jobs might include:",
        options: [
          "Flying car mechanic",
          "Drone traffic controller",
          "Hyperloop operator",
          "Horse rider"
        ],
        correctAnswer: 0
      },
      {
        question: "Which energy-related jobs may appear?",
        options: [
          "Solar road technician",
          "Wind drone pilot",
          "Nuclear fusion engineer",
          "Candle lighter"
        ],
        correctAnswer: 0
      },
      {
        question: "Which careers may grow with ocean exploration?",
        options: [
          "Deep-sea city planner",
          "Coral reef protector",
          "Underwater architect",
          "Milkman"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Everyday-Accidents": {
    title: "Everyday Things That Were Invented by Accident (B1)",
    level: "B1",
    topic: "History",
    exercises: [
      {
        question: "Which inventions were accidents?",
        options: ["Microwave", "Penicillin", "Post-it notes", "Paperclips"],
        correctAnswer: 0
      },
      {
        question: "Chocolate chip cookies were invented by:",
        options: [
          "Accident",
          "Careful recipe",
          "Food lab research",
          "Random experiment"
        ],
        correctAnswer: 0
      },
      {
        question: "Which products came from chemical mistakes?",
        options: ["Teflon", "Super glue", "Coca-Cola", "Smartphones"],
        correctAnswer: 0
      },
      {
        question: "Potato chips were invented when:",
        options: [
          "A chef sliced potatoes thin by accident",
          "They were planned",
          "A customer complained",
          "Factory experiment failed"
        ],
        correctAnswer: 0
      },
      {
        question: "Which drinks were discovered accidentally?",
        options: ["Coca-Cola", "Tea", "Beer", "Lemonade"],
        correctAnswer: 0
      },
      {
        question: "Penicillin was discovered when:",
        options: [
          "Mold killed bacteria by accident",
          "Scientist planned it",
          "It was tested on purpose",
          "It appeared in a petri dish unexpectedly"
        ],
        correctAnswer: 0
      },
      {
        question: "Which toys were accidental inventions?",
        options: ["Silly Putty", "Play-Doh", "Frisbee", "Barbie"],
        correctAnswer: 0
      },
      {
        question: "Velcro was inspired by:",
        options: [
          "Burrs sticking to clothes",
          "Glue accident",
          "Broken zipper",
          "Tape experiment"
        ],
        correctAnswer: 0
      },
      {
        question: "Which inventions came from failed experiments?",
        options: [
          "Safety glass",
          "Corn flakes",
          "Matches",
          "Bicycle"
        ],
        correctAnswer: 0
      },
      {
        question: "Which everyday items were accident-based?",
        options: ["X-rays", "Bubble wrap", "Nylon", "Radio"],
        correctAnswer: 0
      }
    ]
  },

  "Dark-History": {
    title: "Everyday Items with a Dark History (B1)",
    level: "B1",
    topic: "History",
    exercises: [
      {
        question: "Which common items have dark origins?",
        options: ["Coca-Cola", "Diamonds", "Rubber", "Salt"],
        correctAnswer: 0
      },
      {
        question: "Which items were linked to wars?",
        options: ["Gunpowder", "GPS", "Nylon", "Antibiotics"],
        correctAnswer: 0
      },
      {
        question: "Which fashion items were linked to toxic chemicals?",
        options: [
          "Green dresses (arsenic dye)",
          "Lipstick (lead)",
          "Perfume",
          "Cotton shirts"
        ],
        correctAnswer: 0
      },
      {
        question: "What items were once made with child labor?",
        options: ["Matches", "Coal", "Toys", "Paper"],
        correctAnswer: 0
      },
      {
        question: "Which food items had controversial origins?",
        options: [
          "Sugar plantations",
          "Chocolate",
          "Coffee",
          "Tea"
        ],
        correctAnswer: 0
      },
      {
        question: "Which everyday items were linked to slavery?",
        options: ["Cotton", "Tobacco", "Bananas", "Computers"],
        correctAnswer: 0
      },
      {
        question: "What inventions were linked to dangerous experiments?",
        options: [
          "Radium watches",
          "Asbestos",
          "DDT",
          "Shampoo"
        ],
        correctAnswer: 0
      },
      {
        question: "Which items caused health problems?",
        options: [
          "Cigarettes",
          "Lead pipes",
          "Alcohol",
          "Plastic toys"
        ],
        correctAnswer: 0
      },
      {
        question: "What products were linked to colonization?",
        options: ["Spices", "Rubber", "Sugar", "Electronics"],
        correctAnswer: 0
      },
      {
        question: "Which household items had unsafe histories?",
        options: ["Paint", "Gasoline", "Toothpaste", "Soap"],
        correctAnswer: 0
      }
    ]
  },

  "Environment-Climate": {
    title: "Environment and Climate Change (B1)",
    level: "B1",
    topic: "Environment",
    exercises: [
      {
        question: "Which gases cause climate change?",
        options: ["CO₂", "Methane", "Oxygen", "Nitrous oxide"],
        correctAnswer: 0
      },
      {
        question: "Effects of global warming include:",
        options: [
          "Rising sea levels",
          "More storms",
          "Longer winters",
          "Melting glaciers"
        ],
        correctAnswer: 0
      },
      {
        question: "Which actions reduce carbon footprint?",
        options: ["Recycling", "Using bikes", "Burning coal", "Planting trees"],
        correctAnswer: 0
      },
      {
        question: "Which renewable energies help fight climate change?",
        options: ["Solar", "Wind", "Oil", "Hydro"],
        correctAnswer: 0
      },
      {
        question: "Which animals are affected by melting ice?",
        options: ["Polar bears", "Penguins", "Elephants", "Seals"],
        correctAnswer: 0
      },
      {
        question: "What human activities harm the environment?",
        options: [
          "Deforestation",
          "Plastic waste",
          "Fishing",
          "Recycling"
        ],
        correctAnswer: 0
      },
      {
        question: "Which organizations fight climate change?",
        options: ["Greenpeace", "WWF", "NASA", "Red Cross"],
        correctAnswer: 0
      },
      {
        question: "What are signs of climate change?",
        options: [
          "Heatwaves",
          "Hurricanes",
          "Wildfires",
          "Better farming"
        ],
        correctAnswer: 0
      },
      {
        question: "Which daily habits help reduce waste?",
        options: [
          "Reusing bags",
          "Composting",
          "Buying fast fashion",
          "Repairing items"
        ],
        correctAnswer: 0
      },
      {
        question: "Which solutions are sustainable?",
        options: [
          "Green energy",
          "Carpooling",
          "Coal mining",
          "Public transport"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Conspiracy-Theories": {
    title: "Conspiracy Theories People Actually Believed (B1)",
    level: "B1",
    topic: "Psychology",
    exercises: [
      {
        question: "Which conspiracies became popular?",
        options: [
          "Flat Earth",
          "Moon landing hoax",
          "Aliens in Area 51",
          "Evolution"
        ],
        correctAnswer: 0
      },
      {
        question: "What are features of conspiracy theories?",
        options: [
          "Secret groups",
          "Hidden truth",
          "Scientific proof",
          "Government lies"
        ],
        correctAnswer: 0
      },
      {
        question: "Which health conspiracies spread widely?",
        options: [
          "Anti-vaccine",
          "5G radiation",
          "Magic water",
          "Healthy eating"
        ],
        correctAnswer: 0
      },
      {
        question: "Which famous people are linked to conspiracies?",
        options: [
          "Elvis alive",
          "JFK assassination",
          "Beatles hoax",
          "Einstein faked math"
        ],
        correctAnswer: 0
      },
      {
        question: "Which science conspiracies exist?",
        options: [
          "Chemtrails",
          "Fake dinosaurs",
          "Hollow Earth",
          "Germ theory"
        ],
        correctAnswer: 0
      },
      {
        question: "Which events sparked conspiracies?",
        options: ["9/11", "COVID-19", "Blackout in 2003", "Big Bang"],
        correctAnswer: 0
      },
      {
        question: "Which are common traits of believers?",
        options: [
          "Distrust",
          "Critical thinking",
          "Fear",
          "Following evidence"
        ],
        correctAnswer: 0
      },
      {
        question: "Which conspiracies involve technology?",
        options: [
          "Microchips",
          "Mind control",
          "Alien tech",
          "Bluetooth"
        ],
        correctAnswer: 0
      },
      {
        question: "Which organizations are targets of conspiracies?",
        options: ["NASA", "WHO", "Illuminati", "United Nations"],
        correctAnswer: 0
      },
      {
        question: "Why do conspiracies spread online?",
        options: [
          "Social media",
          "Algorithms",
          "Fast sharing",
          "Fact-checking"
        ],
        correctAnswer: 0
      }
    ]
  },

  "Bizarre-Laws": {
    title: "Bizarre Laws Around the World (B1)",
    level: "B1",
    topic: "Law",
    exercises: [
      {
        question: "In which country is it illegal to chew gum?",
        options: ["Singapore", "France", "Japan", "Canada"],
        correctAnswer: 0
      },
      {
        question: "Where is it illegal to own just one guinea pig (for animal loneliness)?",
        options: ["Switzerland", "Germany", "Brazil", "USA"],
        correctAnswer: 0
      },
      {
        question: "In which country is it illegal to wear camouflage clothing as a civilian?",
        options: ["Barbados", "Italy", "Nigeria", "Spain"],
        correctAnswer: 0
      },
      {
        question: "Which places have strange laws about public dancing?",
        options: [
          "Japan (late-night ban)",
          "Iran",
          "USA",
          "UK"
        ],
        correctAnswer: 0
      },
      {
        question: "In which country is it illegal to walk your cow down the street on Sunday?",
        options: ["Switzerland", "Canada", "Australia", "USA"],
        correctAnswer: 0
      },
      {
        question: "Where can you be fined for forgetting your wife's birthday?",
        options: ["Samoa", "Sweden", "Italy", "China"],
        correctAnswer: 0
      },
      {
        question: "In which country is it illegal to step on money (it's disrespectful)?",
        options: ["Thailand", "USA", "South Africa", "India"],
        correctAnswer: 0
      },
      {
        question: "Which countries have unusual rules about naming children?",
        options: ["Germany", "Iceland", "China", "UK"],
        correctAnswer: 0
      },
      {
        question: "In which country is it illegal to carry an ice cream cone in your back pocket?",
        options: ["USA (Kentucky)", "Japan", "Brazil", "Norway"],
        correctAnswer: 0
      },
      {
        question: "Which places ban strange foods or drinks?",
        options: [
          "Singapore (durian on public transport)",
          "USA (Kinder Surprise eggs)",
          "France (ketchup in school cafeterias)",
          "Italy (pineapple pizza)"
        ],
        correctAnswer: 0
      }
    ]
  },

  // FINAL COMPREHENSIVE QUIZZES
  "Technology-Comprehensive": {
    title: "Technology & Innovation (B1)",
    level: "B1",
    topic: "Technology",
    exercises: [
      {
        question: "Who co-founded Apple?",
        options: ["Bill Gates", "Steve Jobs", "Jeff Bezos", "Elon Musk"],
        correctAnswer: 1
      },
      {
        question: "Which is the newest tech trend?",
        options: [
          "Artificial Intelligence",
          "Steam engines",
          "Typewriters",
          "Telegrams"
        ],
        correctAnswer: 0
      },
      {
        question: "Which company created Windows?",
        options: ["Google", "Microsoft", "IBM", "Apple"],
        correctAnswer: 1
      },
      {
        question: "The first iPhone was released in…",
        options: ["2005", "2007", "2010", "2012"],
        correctAnswer: 1
      },
      {
        question: "Cloud storage means…",
        options: [
          "Storing data on internet servers",
          "Saving files in the sky",
          "A weather app",
          "USB sticks"
        ],
        correctAnswer: 0
      },
      {
        question: "Which is not a search engine?",
        options: ["Google", "Yahoo", "Bing", "Facebook"],
        correctAnswer: 3
      },
      {
        question: "VR stands for…",
        options: ["Very Real", "Virtual Reality", "Video Recorder", "Visual Reading"],
        correctAnswer: 1
      },
      {
        question: "Which tech is used for cryptocurrencies?",
        options: ["Blockchain", "Cloud", "AI", "Database"],
        correctAnswer: 0
      },
      {
        question: "Which company owns YouTube?",
        options: ["Meta", "Google", "Apple", "Microsoft"],
        correctAnswer: 1
      },
      {
        question: "A self-driving car uses…",
        options: ["AI + sensors", "Horses", "Human-only drivers", "Maps only"],
        correctAnswer: 0
      }
    ]
  },

  "Psychology-Fear": {
    title: "The Psychology of Fear (B1)",
    level: "B1",
    topic: "Psychology",
    exercises: [
      {
        question: "Fear is mainly processed in…",
        options: ["The amygdala", "Kidneys", "Heart", "Stomach"],
        correctAnswer: 0
      },
      {
        question: "Which is a common fear?",
        options: ["Heights", "Spiders", "Public speaking", "All"],
        correctAnswer: 3
      },
      {
        question: "'Fight or flight' is a…",
        options: [
          "Stress response",
          "Vacation idea",
          "Workout plan",
          "Meditation"
        ],
        correctAnswer: 0
      },
      {
        question: "Fear can be…",
        options: [
          "Useful for survival",
          "Always harmful",
          "A myth",
          "Not real"
        ],
        correctAnswer: 0
      },
      {
        question: "Which hormone is linked to fear?",
        options: ["Cortisol", "Dopamine", "Insulin", "Serotonin"],
        correctAnswer: 0
      },
      {
        question: "A phobia is…",
        options: [
          "An extreme irrational fear",
          "A normal worry",
          "Always fake",
          "A hobby"
        ],
        correctAnswer: 0
      },
      {
        question: "Which therapy helps overcome fear?",
        options: ["Exposure therapy", "Avoidance", "Silence", "Overthinking"],
        correctAnswer: 0
      },
      {
        question: "Which movie monster is based on fear of the unknown?",
        options: ["Alien", "Dracula", "Frankenstein", "All"],
        correctAnswer: 0
      },
      {
        question: "Fear spreads quickly through…",
        options: ["Stories", "Media", "Movies", "All"],
        correctAnswer: 3
      },
      {
        question: "Courage means…",
        options: [
          "Having no fear",
          "Acting despite fear",
          "Ignoring danger",
          "Being reckless"
        ],
        correctAnswer: 1
      }
    ]
  },

  "Science-Luck": {
    title: "The Science of Luck (B1)",
    level: "B1",
    topic: "Psychology",
    exercises: [
      {
        question: "Luck is often described as…",
        options: ["Random chance", "A skill", "Always planned", "Fake"],
        correctAnswer: 0
      },
      {
        question: "Who said, 'Luck favors the prepared mind'?",
        options: ["Einstein", "Pasteur", "Newton", "Tesla"],
        correctAnswer: 1
      },
      {
        question: "Superstitions are linked to…",
        options: [
          "Beliefs about luck",
          "Science only",
          "Mathematics only",
          "No connection"
        ],
        correctAnswer: 0
      },
      {
        question: "Which object is a symbol of good luck?",
        options: [
          "Four-leaf clover",
          "Horseshoe",
          "Rabbit's foot",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "What does probability study?",
        options: [
          "Chance and likelihood of events",
          "Magic",
          "History",
          "Language"
        ],
        correctAnswer: 0
      },
      {
        question: "'Beginner's luck' means…",
        options: [
          "Beginners always win",
          "Beginners sometimes succeed unexpectedly",
          "Experts always lose",
          "No skill is needed"
        ],
        correctAnswer: 1
      },
      {
        question: "Which culture believes in lucky red envelopes?",
        options: ["Chinese", "American", "Egyptian", "German"],
        correctAnswer: 0
      },
      {
        question: "Gamblers rely on…",
        options: ["Chance", "Probability", "Risk-taking", "All"],
        correctAnswer: 3
      },
      {
        question: "Psychologists say 'lucky people'…",
        options: [
          "Are more open to opportunities",
          "Have no skills",
          "Only guess",
          "Never prepare"
        ],
        correctAnswer: 0
      },
      {
        question: "What increases 'luck'?",
        options: ["Positive mindset", "Preparation", "Networking", "All"],
        correctAnswer: 3
      }
    ]
  },

  "Human-Limits": {
    title: "Things Humans Cannot Do (B1)",
    level: "B1",
    topic: "Science",
    exercises: [
      {
        question: "Humans cannot…",
        options: [
          "Breathe underwater without help",
          "Fly naturally",
          "See in total darkness",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Which animal sense is stronger than humans?",
        options: [
          "Dog's smell",
          "Eagle's vision",
          "Bat's hearing",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Humans cannot live without…",
        options: ["Oxygen", "Water", "Sleep", "All"],
        correctAnswer: 3
      },
      {
        question: "Which bone humans cannot break easily?",
        options: ["Skull", "Femur", "Spine", "None"],
        correctAnswer: 1
      },
      {
        question: "Humans cannot rotate their heads fully like…",
        options: ["Owls", "Snakes", "Both", "None"],
        correctAnswer: 2
      },
      {
        question: "What can't humans digest?",
        options: ["Cellulose (grass)", "Rocks", "Metal", "All"],
        correctAnswer: 3
      },
      {
        question: "Humans cannot live in space without…",
        options: [
          "Spacesuits",
          "Oxygen supply",
          "Gravity support",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "What's impossible for humans?",
        options: [
          "Running 100 km/h",
          "Jumping like kangaroos",
          "Staying awake forever",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Why do humans have limits?",
        options: ["Biology", "Physics", "Evolution", "All"],
        correctAnswer: 3
      },
      {
        question: "What helps humans overcome limits?",
        options: ["Technology", "Medicine", "Innovation", "All"],
        correctAnswer: 3
      }
    ]
  },

  "Alternate-History": {
    title: "What If Alternate History (B1)",
    level: "B1",
    topic: "History",
    exercises: [
      {
        question: "What if the Roman Empire never fell?",
        options: [
          "Europe would be very different",
          "Same as now",
          "No effect",
          "Robots would rule"
        ],
        correctAnswer: 0
      },
      {
        question: "Alternate history is also called…",
        options: [
          "Counterfactual history",
          "Science fiction only",
          "Fake news",
          "Real timeline"
        ],
        correctAnswer: 0
      },
      {
        question: "What if World War II ended differently?",
        options: [
          "Different political powers today",
          "Same history",
          "No changes",
          "No wars ever"
        ],
        correctAnswer: 0
      },
      {
        question: "Why do people imagine alternate history?",
        options: [
          "To explore 'what ifs'",
          "Entertainment",
          "Learning from mistakes",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "Which TV series explores alternate history?",
        options: [
          "The Man in the High Castle",
          "Friends",
          "Breaking Bad",
          "None"
        ],
        correctAnswer: 0
      },
      {
        question: "What if dinosaurs never went extinct?",
        options: [
          "Humans might not exist",
          "No effect",
          "Dinosaurs would use cars",
          "It's impossible"
        ],
        correctAnswer: 0
      },
      {
        question: "Which event created a huge 'what if' scenario?",
        options: [
          "Assassination of JFK",
          "Industrial Revolution",
          "First moon landing",
          "All"
        ],
        correctAnswer: 0
      },
      {
        question: "Alternate history stories are often…",
        options: [
          "Speculative fiction",
          "Documentaries",
          "Pure fact",
          "Science textbooks"
        ],
        correctAnswer: 0
      },
      {
        question: "What can alternate history teach us?",
        options: [
          "Consequences of events",
          "Lessons from mistakes",
          "Imagination skills",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "What if electricity was never discovered?",
        options: [
          "No modern life",
          "Internet impossible",
          "Medicine weaker",
          "All"
        ],
        correctAnswer: 3
      }
    ]
  },

  "Objects-Stories": {
    title: "Objects That Tell a Story (A2)",
    level: "A2",
    topic: "History",
    exercises: [
      {
        question: "The Rosetta Stone helped…",
        options: [
          "Translate Egyptian hieroglyphs",
          "Build pyramids",
          "Find treasure",
          "None"
        ],
        correctAnswer: 0
      },
      {
        question: "The Mona Lisa is an object that tells a story of…",
        options: ["Renaissance art", "Ancient Greece", "War", "Science"],
        correctAnswer: 0
      },
      {
        question: "A diary can…",
        options: [
          "Tell personal history",
          "Share emotions",
          "Preserve memories",
          "All"
        ],
        correctAnswer: 3
      },
      {
        question: "The Dead Sea Scrolls are…",
        options: [
          "Ancient manuscripts",
          "Fiction books",
          "Recipes",
          "Maps"
        ],
        correctAnswer: 0
      },
      {
        question: "An artifact is…",
        options: [
          "An object made by humans, often historical",
          "A natural rock",
          "A plant",
          "An animal"
        ],
        correctAnswer: 0
      },
      {
        question: "Anne Frank's diary tells a story of…",
        options: [
          "WWII and survival",
          "Cooking tips",
          "Music",
          "Mythology"
        ],
        correctAnswer: 0
      },
      {
        question: "Museums keep objects because…",
        options: [
          "They teach history and culture",
          "They look pretty only",
          "They hide secrets",
          "They are useless"
        ],
        correctAnswer: 0
      },
      {
        question: "Which object tells the story of navigation?",
        options: ["Compass", "Pen", "Spoon", "Glass"],
        correctAnswer: 0
      },
      {
        question: "Cave paintings are stories of…",
        options: [
          "Early human life",
          "Robots",
          "Factories",
          "Phones"
        ],
        correctAnswer: 0
      },
      {
        question: "Why are objects important in history?",
        options: [
          "They give physical evidence of the past",
          "They are decorative only",
          "They are easy to carry",
          "They are fictional"
        ],
        correctAnswer: 0
      }
    ]
  }
};

// Quiz Categories for Organization
const quizCategories = {
  "Business": [
    "Cultural-Misunderstandings-in-Business(B1-B2)", 
    "Decision-Making-Under-Stress(B1-B2)", 
    "Failure-Stories-in-Business(B1-B2)", 
    "Side-Hustles(B1-B2)", 
    "The-Gig-Economy(B1-B2)", 
    "The-Hidden-Cost-of-Meetings(B1-B2)", 
    "The-Language-of-Startups(B1-B2)", 
    "The-Neuroscience-and-Psychology-of-Brand-Attachment(B1-B2)", 
    "The-Power-of-Networking(B1-B2)", 
    "Time-Management-Myths-at-Work(B1-B2)", 
    "Work-Life-Balance-as-a-Business-Strategy(B1-B2)", 
    "Brand",
    "Startup-Language",
    "Hidden-Cost-Meetings",
    "Gig-Economy",
    "Side-Hustles",
    "Failure-Stories",
    "Decision-Making-Stress",
    "Cultural-Misunderstandings"
  ],
  "Technology": [
    "technology", 
    "future-jobs-that-dont-exist-yet",
    "Technology-Comprehensive",
    "Future-Jobs"
  ],
  "Health": [
    "health-and-fitness", 
    "caffeine-crash",
    "Health-Fitness-Comprehensive",
    "Caffeine-Crash-Comprehensive"
  ],
  "Travel": [
    "travel", 
    "urban-legends-in-different-countries",
    "Travel-Comprehensive",
    "Urban-Legends"
  ],
  "History": [
    "accidental-discoveries-that-changed-the-world", 
    "everyday-things-that-were-invented-by-accident", 
    "lost-civilizations-forgotten-technologies",
    "Accidental-Discoveries",
    "Everyday-Accidents",
    "Dark-History",
    "Alternate-History",
    "Objects-Stories"
  ],
  "Psychology": [
    "the-psychology-of-fear", 
    "the-science-of-luck",
    "Psychology-Fear",
    "Science-Luck",
    "Conspiracy-Theories"
  ],
  "Nature": [
    "when-animals-outsmart-humans", 
    "when-nature-breaks-the-rules",
    "Animals-Outsmart-Humans",
    "Nature-Breaks-Rules"
  ],
  "Environment": [
    "environment-climate-change",
    "Environment-Climate"
  ],
  "Law": [
    "bizarre-laws-around-the-world",
    "Bizarre-Laws"
  ],
  "Culture": [
    "objects-that-tell-a-story"
  ],
  "Science": [
    "Human-Limits"
  ]
};

// Quiz Levels
const quizLevels = {
  "A2": [
    "objects-that-tell-a-story",
    "Objects-Stories"
  ],
  "A2-B1": [
    "travel",
    "Travel-Comprehensive"
  ],
  "B1": [
    "urban-legends-in-different-countries", 
    "future-jobs-that-dont-exist-yet", 
    "health-and-fitness", 
    "caffeine-crash", 
    "accidental-discoveries-that-changed-the-world", 
    "everyday-things-that-were-invented-by-accident", 
    "lost-civilizations-forgotten-technologies", 
    "the-psychology-of-fear", 
    "the-science-of-luck", 
    "when-animals-outsmart-humans", 
    "when-nature-breaks-the-rules", 
    "environment-climate-change", 
    "bizarre-laws-around-the-world", 
    "Brand",
    "Accidental-Discoveries",
    "Nature-Breaks-Rules",
    "Animals-Outsmart-Humans",
    "Urban-Legends",
    "Health-Fitness-Comprehensive",
    "Caffeine-Crash-Comprehensive",
    "Future-Jobs",
    "Everyday-Accidents",
    "Dark-History",
    "Environment-Climate",
    "Conspiracy-Theories",
    "Bizarre-Laws",
    "Technology-Comprehensive",
    "Psychology-Fear",
    "Science-Luck",
    "Human-Limits",
    "Alternate-History"
  ],
  "B1-B2": [
    "Cultural-Misunderstandings-in-Business(B1-B2)", 
    "Decision-Making-Under-Stress(B1-B2)", 
    "Failure-Stories-in-Business(B1-B2)", 
    "Side-Hustles(B1-B2)", 
    "The-Gig-Economy(B1-B2)", 
    "The-Hidden-Cost-of-Meetings(B1-B2)", 
    "The-Language-of-Startups(B1-B2)", 
    "The-Neuroscience-and-Psychology-of-Brand-Attachment(B1-B2)", 
    "The-Power-of-Networking(B1-B2)", 
    "Time-Management-Myths-at-Work(B1-B2)", 
    "Work-Life-Balance-as-a-Business-Strategy(B1-B2)",
    "Startup-Language",
    "Hidden-Cost-Meetings",
    "Gig-Economy",
    "Side-Hustles",
    "Failure-Stories",
    "Decision-Making-Stress",
    "Cultural-Misunderstandings"
  ],
  "B1-C1": ["technology"]
};

// Make data available globally
if (typeof window !== 'undefined') {
  window.allQuizData = allQuizData;
  window.quizCategories = quizCategories;
  window.quizLevels = quizLevels;
}
