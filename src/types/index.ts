export interface Exam {
  id: string;
  name: string;
  numberOfQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attempts: number;
  bestGrade: number;
  subject: string;
  topics: string[];
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
}