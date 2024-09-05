import React from 'react';
import ExamCard from './ExamCard';
import { Exam } from '@/types';

interface ExamListProps {
  exams: Exam[];
}

const ExamList: React.FC<ExamListProps> = ({ exams }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  );
};

export default ExamList;