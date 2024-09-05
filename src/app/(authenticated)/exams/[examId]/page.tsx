'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getExamById } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BookOpen, Award, BarChart, HelpCircle, Tag } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ExamDetailPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchExam = async () => {
      const fetchedExam = await getExamById(examId);
      setExam(fetchedExam);
      const initialAnswers = fetchedExam.questions.reduce((acc, question) => {
        acc[question.id] = '';
        return acc;
      }, {});
      setAnswers(initialAnswers);
    };
    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (exam) {
      const answeredQuestions = Object.values(answers).filter(answer => answer !== '').length;
      const progressPercentage = (answeredQuestions / exam.questions.length) * 100;
      setProgress(progressPercentage);
    }
  }, [answers, exam]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting answers:', answers);
  };

  if (!exam) return <div>Loading...</div>;

  return (
    <div className="flex-1 p-10 min-h-screen bg-gray-50 flex flex-col px-4 py-12">
      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="text-2xl font-bold">{exam.name}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-semibold">{exam.subject}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Tag className="w-6 h-6 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Topics</p>
                <p className="font-semibold">{exam.topics.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center">
              <HelpCircle className="w-6 h-6 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Questions</p>
                <p className="font-semibold">{exam.numberOfQuestions}</p>
              </div>
            </div>
            <div className="flex items-center">
              <BarChart className="w-6 h-6 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Your Attempts</p>
                <p className="font-semibold">{exam.attempts}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="w-6 h-6 mr-3 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Your Best Grade</p>
                <p className="font-semibold">{exam.bestGrade}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <Badge variant={getDifficultyVariant(exam.difficulty)} className="text-sm px-3 py-1">
                {exam.difficulty}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-primary">Your Progress</h2>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-500 mt-2">
          {Math.round(progress)}% complete ({Object.values(answers).filter(answer => answer !== '').length} of {exam.questions.length} questions answered)
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-primary">Exam Questions</h2>

      {exam.questions.map((question, index) => (
        <Card key={question.id} className="mb-6">
          <CardHeader>
            <CardTitle>Question {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{question.text}</p>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={answers[question.id]}
            >
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${question.id}-option${optionIndex}`} />
                  <Label htmlFor={`q${question.id}-option${optionIndex}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSubmit} className="mt-8 bg-primary text-white">
        Submit Exam
      </Button>
    </div>
  );
}

function getDifficultyVariant(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'secondary'
    case 'medium':
      return 'default'
    case 'hard':
      return 'destructive'
    default:
      return 'outline'
  }
}