import { Exam } from '@/types';

const exams: Exam[] = [
  {
    id: '1',
    name: 'Introduction to Biology',
    numberOfQuestions: 3,
    difficulty: 'Medium',
    attempts: 2,
    bestGrade: 85,
    subject: 'Biology',
    topics: ['Cell Biology', 'Genetics', 'Ecology'],
    questions: [
      {
        id: '1',
        text: 'What is the powerhouse of the cell?',
        options: ['Mitochondria', 'Nucleus', 'Endoplasmic Reticulum', 'Golgi Apparatus'],
        rightAnswerIndex: 0,
        explanation: 'Mitochondria are often referred to as the powerhouse of the cell because they generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.'
      },
      {
        id: '2',
        text: 'Which of the following is NOT a nucleotide base found in DNA?',
        options: ['Adenine', 'Cytosine', 'Uracil', 'Guanine'],
        rightAnswerIndex: 2,
        explanation: 'Uracil is found in RNA, not DNA. The four nucleotide bases in DNA are Adenine, Cytosine, Guanine, and Thymine.'
      },
      {
        id: '3',
        text: 'What is the term for the variety of life in a particular habitat or ecosystem?',
        options: ['Biodiversity', 'Ecology', 'Evolution', 'Adaptation'],
        rightAnswerIndex: 0,
        explanation: 'Biodiversity refers to the variety of living species within a given area, including plants, animals, and microorganisms.'
      }
    ]
  },
  {
    id: '2',
    name: 'Basic Chemistry Concepts',
    numberOfQuestions: 3,
    difficulty: 'Easy',
    attempts: 1,
    bestGrade: 90,
    subject: 'Chemistry',
    topics: ['Atomic Structure', 'Chemical Bonds', 'Periodic Table'],
    questions: [
      {
        id: '1',
        text: 'What is the smallest unit of an element that retains its properties?',
        options: ['Atom', 'Molecule', 'Compound', 'Electron'],
        rightAnswerIndex: 0,
        explanation: 'An atom is the smallest unit of matter that retains all of the chemical properties of an element.'
      },
      {
        id: '2',
        text: 'Which type of bond involves the sharing of electrons?',
        options: ['Ionic', 'Covalent', 'Metallic', 'Hydrogen'],
        rightAnswerIndex: 1,
        explanation: 'A covalent bond involves the sharing of electron pairs between atoms.'
      },
      {
        id: '3',
        text: 'What does the atomic number represent?',
        options: ['Number of neutrons', 'Number of protons', 'Number of electrons', 'Total number of particles'],
        rightAnswerIndex: 1,
        explanation: 'The atomic number represents the number of protons in the nucleus of an atom, which also determines the element.'
      }
    ]
  },
  {
    id: '3',
    name: 'Introduction to Physics',
    numberOfQuestions: 3,
    difficulty: 'Medium',
    attempts: 2,
    bestGrade: 80,
    subject: 'Physics',
    topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
    questions: [
      {
        id: '1',
        text: 'What is the SI unit of force?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        rightAnswerIndex: 1,
        explanation: 'The Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kilogram of mass at 1 meter per second squared.'
      },
      {
        id: '2',
        text: 'Which law of thermodynamics states that energy cannot be created or destroyed?',
        options: ['Zeroth law', 'First law', 'Second law', 'Third law'],
        rightAnswerIndex: 1,
        explanation: 'The First Law of Thermodynamics, also known as the Law of Conservation of Energy, states that energy cannot be created or destroyed, only converted from one form to another.'
      },
      {
        id: '3',
        text: 'What particle is responsible for electromagnetic force?',
        options: ['Proton', 'Neutron', 'Electron', 'Photon'],
        rightAnswerIndex: 3,
        explanation: 'The photon is the particle responsible for electromagnetic force. It is the quantum of light and all other forms of electromagnetic radiation.'
      }
    ]
  },
  {
    id: '4',
    name: 'World Geography',
    numberOfQuestions: 3,
    difficulty: 'Medium',
    attempts: 1,
    bestGrade: 75,
    subject: 'Geography',
    topics: ['Physical Geography', 'Human Geography', 'Cartography'],
    questions: [
      {
        id: '1',
        text: 'Which of these is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        rightAnswerIndex: 1,
        explanation: 'The Nile River is the longest river in the world, stretching approximately 6,650 kilometers (4,132 miles) in length.'
      },
      {
        id: '2',
        text: 'What is the study of population movements and distributions called?',
        options: ['Demography', 'Cartography', 'Oceanography', 'Meteorology'],
        rightAnswerIndex: 0,
        explanation: 'Demography is the statistical study of populations, especially human populations, including their size, structure, and dynamics.'
      },
      {
        id: '3',
        text: 'Which of these is NOT a type of map projection?',
        options: ['Mercator', 'Robinson', 'Goode', 'Cartesian'],
        rightAnswerIndex: 3,
        explanation: 'Cartesian refers to a coordinate system, not a map projection. Mercator, Robinson, and Goode are all types of map projections used in cartography.'
      }
    ]
  },
  {
    id: '5',
    name: 'Introduction to Computer Science',
    numberOfQuestions: 3,
    difficulty: 'Hard',
    attempts: 3,
    bestGrade: 70,
    subject: 'Computer Science',
    topics: ['Programming', 'Data Structures', 'Algorithms'],
    questions: [
      {
        id: '1',
        text: 'Which of these is NOT a programming paradigm?',
        options: ['Object-Oriented', 'Functional', 'Procedural', 'Alphabetical'],
        rightAnswerIndex: 3,
        explanation: 'Alphabetical is not a programming paradigm. Object-Oriented, Functional, and Procedural are all valid programming paradigms.'
      },
      {
        id: '2',
        text: 'What data structure uses LIFO (Last In, First Out)?',
        options: ['Queue', 'Stack', 'Linked List', 'Tree'],
        rightAnswerIndex: 1,
        explanation: 'A stack uses the Last In, First Out (LIFO) principle, where the last element added is the first one to be removed.'
      },
      {
        id: '3',
        text: 'Which sorting algorithm has the best average time complexity?',
        options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'],
        rightAnswerIndex: 2,
        explanation: 'Quick Sort has the best average time complexity of O(n log n) among these options, making it generally faster for large datasets.'
      }
    ]
  },
  {
    id: '6',
    name: 'Basic Mathematics',
    numberOfQuestions: 3,
    difficulty: 'Easy',
    attempts: 1,
    bestGrade: 100,
    subject: 'Mathematics',
    topics: ['Arithmetic', 'Algebra', 'Geometry'],
    questions: [
      {
        id: '1',
        text: 'What is the result of 8 × 7?',
        options: ['54', '56', '58', '60'],
        rightAnswerIndex: 1,
        explanation: '8 × 7 = 56. This is a basic multiplication fact in arithmetic.'
      },
      {
        id: '2',
        text: 'Solve for x: 2x + 5 = 13',
        options: ['3', '4', '5', '6'],
        rightAnswerIndex: 1,
        explanation: 'To solve, subtract 5 from both sides: 2x = 8. Then divide both sides by 2: x = 4.'
      },
      {
        id: '3',
        text: 'What is the area of a rectangle with length 6 and width 4?',
        options: ['10', '18', '24', '30'],
        rightAnswerIndex: 2,
        explanation: 'The area of a rectangle is calculated by multiplying length by width. So, 6 × 4 = 24 square units.'
      }
    ]
  },
  {
    id: '7',
    name: 'World History Overview',
    numberOfQuestions: 3,
    difficulty: 'Medium',
    attempts: 2,
    bestGrade: 85,
    subject: 'History',
    topics: ['Ancient Civilizations', 'Middle Ages', 'Modern Era'],
    questions: [
      {
        id: '1',
        text: 'Which ancient civilization built the pyramids at Giza?',
        options: ['Mesopotamians', 'Greeks', 'Romans', 'Egyptians'],
        rightAnswerIndex: 3,
        explanation: 'The ancient Egyptians built the pyramids at Giza as tombs for their pharaohs and their families.'
      },
      {
        id: '2',
        text: 'In which year did Christopher Columbus first reach the Americas?',
        options: ['1492', '1500', '1510', '1520'],
        rightAnswerIndex: 0,
        explanation: 'Christopher Columbus first reached the Americas in 1492, marking the beginning of sustained European exploration and colonization of the Americas.'
      },
      {
        id: '3',
        text: 'Which event marked the start of World War I?',
        options: ['Russian Revolution', 'Assassination of Archduke Franz Ferdinand', 'Treaty of Versailles', 'German invasion of Poland'],
        rightAnswerIndex: 1,
        explanation: 'The assassination of Archduke Franz Ferdinand of Austria in 1914 is considered the immediate trigger of World War I.'
      }
    ]
  },
  {
    id: '8',
    name: 'Fundamentals of Economics',
    numberOfQuestions: 3,
    difficulty: 'Medium',
    attempts: 2,
    bestGrade: 80,
    subject: 'Economics',
    topics: ['Microeconomics', 'Macroeconomics', 'International Trade'],
    questions: [
      {
        id: '1',
        text: 'What does GDP stand for in economics?',
        options: ['Global Domestic Product', 'Gross Domestic Product', 'General Domestic Product', 'Grand Domestic Product'],
        rightAnswerIndex: 1,
        explanation: 'GDP stands for Gross Domestic Product, which is the total value of goods produced and services provided in a country during one year.'
      },
      {
        id: '2',
        text: 'Which of these is NOT a type of market structure?',
        options: ['Monopoly', 'Oligopoly', 'Perfect Competition', 'Socialism'],
        rightAnswerIndex: 3,
        explanation: 'Socialism is an economic system, not a market structure. Monopoly, Oligopoly, and Perfect Competition are types of market structures.'
      },
      {
        id: '3',
        text: 'What is the term for a situation where the quantity supplied is greater than the quantity demanded?',
        options: ['Shortage', 'Surplus', 'Equilibrium', 'Scarcity'],
        rightAnswerIndex: 1,
        explanation: 'A surplus occurs when the quantity supplied exceeds the quantity demanded at the current price.'
      }
    ]
  },
  {
    id: '9',
    name: 'Introduction to Psychology',
    numberOfQuestions: 3,
    difficulty: 'Easy',
    attempts: 1,
    bestGrade: 90,
    subject: 'Psychology',
    topics: ['Cognitive Psychology', 'Social Psychology', 'Developmental Psychology'],
    questions: [
      {
        id: '1',
        text: 'Who is considered the father of psychoanalysis?',
        options: ['Carl Jung', 'B.F. Skinner', 'Sigmund Freud', 'Ivan Pavlov'],
        rightAnswerIndex: 2,
        explanation: 'Sigmund Freud is considered the father of psychoanalysis, a clinical method for treating psychopathology through dialogue between a patient and a psychoanalyst.'
      },
      {
        id: '2',
        text: 'What is the term for a person\'s awareness of their own thoughts and feelings?',
        options: ['Subconscious', 'Unconscious', 'Consciousness', 'Self-awareness'],
        rightAnswerIndex: 3,
        explanation: 'Self-awareness refers to a person\'s capacity for introspection and the ability to recognize oneself as an individual separate from the environment and other individuals.'
      },
      {
        id: '3',
        text: 'Which of these is NOT one of Piaget\'s stages of cognitive development?',
        options: ['Sensorimotor', 'Preoperational', 'Concrete operational', 'Adolescent egocentrism'],
        rightAnswerIndex: 3,
        explanation: 'Adolescent egocentrism is not one of Piaget\'s stages. His four stages are Sensorimotor, Preoperational, Concrete operational, and Formal operational.'
      }
    ]
  },
  {
    id: '10',
    name: 'Basics of Environmental Science',
    numberOfQuestions: 3,
    difficulty: 'Easy',
    attempts: 1,
    bestGrade: 95,
    subject: 'Environmental Science',
    topics: ['Ecosystems', 'Climate Change', 'Conservation'],
    questions: [
      {
        id: '1',
        text: 'What is the term for all the organisms living in a particular area?',
        options: ['Habitat', 'Ecosystem', 'Biome', 'Community'],
        rightAnswerIndex: 3,
        explanation: 'A community in ecology refers to all the organisms living in a particular area. This includes all populations of different species living and interacting in the same place.'
      },
      {
        id: '2',
        text: 'Which gas is most responsible for the greenhouse effect?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        rightAnswerIndex: 2,
        explanation: 'Carbon dioxide is the primary greenhouse gas responsible for the greenhouse effect, although other gases like methane and water vapor also contribute.'
      },
      {
        id: '3',
        text: 'What is the process by which plants convert light energy into chemical energy?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Decomposition'],
        rightAnswerIndex: 1,
        explanation: 'Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar.'
      }
    ]
  }
];

export async function getExams(): Promise<Exam[]> {
  return exams;
}

export async function getExamById(id: string): Promise<Exam | undefined> {
  return exams.find(exam => exam.id === id);
}