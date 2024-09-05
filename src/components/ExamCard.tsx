import React from 'react';
import { Exam } from '@/types';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{exam.name}</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Questions</p>
            <p className="font-medium">{exam.numberOfQuestions}</p>
          </div>
          <div>
            <p className="text-gray-600">Difficulty</p>
            <p className="font-medium">{exam.difficulty}</p>
          </div>
          <div>
            <p className="text-gray-600">Attempts</p>
            <p className="font-medium">{exam.attempts}</p>
          </div>
          <div>
            <p className="text-gray-600">Best Grade</p>
            <p className="font-medium">{exam.bestGrade}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;