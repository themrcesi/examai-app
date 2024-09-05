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
        options: ['Mitochondria', 'Nucleus', 'Endoplasmic Reticulum', 'Golgi Apparatus']
      },
      {
        id: '2',
        text: 'Which of the following is NOT a nucleotide base found in DNA?',
        options: ['Adenine', 'Cytosine', 'Uracil', 'Guanine']
      },
      {
        id: '3',
        text: 'What is the term for the variety of life in a particular habitat or ecosystem?',
        options: ['Biodiversity', 'Ecology', 'Evolution', 'Adaptation']
      }
    ]
  },
  // ... (other exams)
];

export async function getExams(): Promise<Exam[]> {
  return exams;
}

export async function getExamById(id: string): Promise<Exam | undefined> {
  return exams.find(exam => exam.id === id);
}