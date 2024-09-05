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
        correctAnswerIndex: 0,
        explanation: 'Mitochondria are often referred to as the powerhouse of the cell because they generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.'
      },
      {
        id: '2',
        text: 'Which of the following is NOT a nucleotide base found in DNA?',
        options: ['Adenine', 'Cytosine', 'Uracil', 'Guanine'],
        correctAnswerIndex: 2,
        explanation: 'Uracil is not found in DNA. It is a nucleotide base found in RNA, replacing thymine which is found in DNA.'
      },
      {
        id: '3',
        text: 'What is the term for the variety of life in a particular habitat or ecosystem?',
        options: ['Biodiversity', 'Ecology', 'Evolution', 'Adaptation'],
        correctAnswerIndex: 0,
        explanation: 'Biodiversity refers to the variety of living species within a given area, including plants, animals, and microorganisms.'
      }
    ]
  },
  {
    id: '2',
    name: 'Advanced Mathematics',
    numberOfQuestions: 4,
    difficulty: 'Hard',
    attempts: 1,
    bestGrade: 78,
    subject: 'Mathematics',
    topics: ['Calculus', 'Linear Algebra', 'Number Theory'],
    questions: [
      {
        id: '1',
        text: 'What is the derivative of e^x?',
        options: ['e^x', 'x*e^(x-1)', 'ln(x)', '1/x'],
        correctAnswerIndex: 0,
        explanation: 'The derivative of e^x is itself, e^x. This is a unique property of the exponential function.'
      },
      {
        id: '2',
        text: 'Which of the following is NOT a property of a vector space?',
        options: ['Closure under addition', 'Closure under scalar multiplication', 'Commutativity of multiplication', 'Existence of additive identity'],
        correctAnswerIndex: 2,
        explanation: 'Commutativity of multiplication is not a required property of vector spaces. Vector spaces are not defined with a multiplication operation between vectors.'
      },
      {
        id: '3',
        text: 'What is the smallest prime number greater than 100?',
        options: ['101', '103', '107', '109'],
        correctAnswerIndex: 0,
        explanation: '101 is the smallest prime number greater than 100. It cannot be divided evenly by any number other than 1 and itself.'
      },
      {
        id: '4',
        text: 'What is the limit of (sin x) / x as x approaches 0?',
        options: ['0', '1', 'Undefined', 'Infinity'],
        correctAnswerIndex: 1,
        explanation: 'The limit of (sin x) / x as x approaches 0 is 1. This can be proven using LHôpitals rule or by considering the geometric interpretation.'
      }
    ]
  },
  {
    id: '3',
    name: 'World History Overview',
    numberOfQuestions: 3,
    difficulty: 'Easy',
    attempts: 3,
    bestGrade: 92,
    subject: 'History',
    topics: ['Ancient Civilizations', 'Middle Ages', 'Modern Era'],
    questions: [
      {
        id: '1',
        text: 'Which ancient civilization built the pyramids?',
        options: ['Egyptians', 'Greeks', 'Romans', 'Mayans'],
        correctAnswerIndex: 0,
        explanation: 'The ancient Egyptians built the pyramids as tombs for their pharaohs and their families. The most famous Egyptian pyramids are those found at Giza.'
      },
      {
        id: '2',
        text: 'In which year did Christopher Columbus first reach the Americas?',
        options: ['1492', '1500', '1510', '1520'],
        correctAnswerIndex: 0,
        explanation: 'Christopher Columbus first reached the Americas in 1492. This voyage marked the beginning of European exploration and colonization of the American continents.'
      },
      {
        id: '3',
        text: 'Who was the first President of the United States?',
        options: ['George Washington', 'Thomas Jefferson', 'John Adams', 'Benjamin Franklin'],
        correctAnswerIndex: 0,
        explanation: 'George Washington was the first President of the United States, serving from 1789 to 1797. He was also the commander of the Continental Army during the American Revolutionary War.'
      }
    ]
  },
  {
    id: '4',
    name: 'Introduction to Physics',
    numberOfQuestions: 4,
    difficulty: 'Medium',
    attempts: 2,
    bestGrade: 88,
    subject: 'Physics',
    topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism'],
    questions: [
      {
        id: '1',
        text: 'What is the SI unit of force?',
        options: ['Newton', 'Joule', 'Watt', 'Pascal'],
        correctAnswerIndex: 0,
        explanation: 'The SI unit of force is the Newton (N). It is defined as the force needed to accelerate 1 kilogram of mass at the rate of 1 meter per second squared.'
      },
      {
        id: '2',
        text: 'Which law of thermodynamics states that energy cannot be created or destroyed?',
        options: ['First law', 'Second law', 'Third law', 'Zeroth law'],
        correctAnswerIndex: 0,
        explanation: 'The First Law of Thermodynamics, also known as the Law of Conservation of Energy, states that energy cannot be created or destroyed, only converted from one form to another.'
      },
      {
        id: '3',
        text: 'What is the charge of an electron?',
        options: ['-1.6 x 10^-19 C', '+1.6 x 10^-19 C', '-1.6 x 10^19 C', '+1.6 x 10^19 C'],
        correctAnswerIndex: 0,
        explanation: 'The charge of an electron is -1.6 x 10^-19 Coulombs. This is a fundamental constant in physics and represents the smallest unit of electric charge in nature.'
      },
      {
        id: '4',
        text: 'Which of these is NOT a fundamental force of nature?',
        options: ['Friction', 'Gravity', 'Strong nuclear force', 'Weak nuclear force'],
        correctAnswerIndex: 0,
        explanation: 'Friction is not a fundamental force of nature. It is a result of electromagnetic interactions between atoms. The four fundamental forces are gravity, electromagnetism, strong nuclear force, and weak nuclear force.'
      }
    ]
  },
  {
    id: '5',
    name: 'English Literature Classics',
    numberOfQuestions: 3,
    difficulty: 'Medium',
    attempts: 1,
    bestGrade: 75,
    subject: 'Literature',
    topics: ['Shakespeare', 'Victorian Era', '20th Century'],
    questions: [
      {
        id: '1',
        text: 'Who wrote "Pride and Prejudice"?',
        options: ['Jane Austen', 'Charlotte Bronte', 'Emily Bronte', 'Virginia Woolf'],
        correctAnswerIndex: 0,
        explanation: 'Jane Austen wrote "Pride and Prejudice". It was first published in 1813 and is one of the most popular novels in English literature.'
      },
      {
        id: '2',
        text: 'In which Shakespeare play does the character Hamlet appear?',
        options: ['Hamlet', 'Macbeth', 'Romeo and Juliet', 'King Lear'],
        correctAnswerIndex: 0,
        explanation: 'The character Hamlet appears in Shakespeare\'s play "Hamlet". It\'s one of Shakespeare\'s most famous tragedies, written between 1599 and 1601.'
      },
      {
        id: '3',
        text: 'Who wrote "1984"?',
        options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'H.G. Wells'],
        correctAnswerIndex: 0,
        explanation: 'George Orwell wrote "1984". Published in 1949, it\'s a dystopian novel set in a totalitarian society and is famous for its exploration of surveillance, control, and the manipulation of truth.'
      }
    ]
  }
  // ... (other exams)
];

export async function getExams(): Promise<Exam[]> {
  return exams;
}

export async function getExamById(id: string): Promise<Exam | undefined> {
  return exams.find(exam => exam.id === id);
}