'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getExamById, deleteExam } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BookOpen, Award, BarChart, HelpCircle, Tag, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle } from "lucide-react"

export default function ExamDetailPage() {
  const { examId } = useParams();
  const router = useRouter();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchExam = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
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

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (exam) {
      let totalScore = 0;
      exam.questions.forEach((question) => {
        if (parseInt(answers[question.id]) === question.rightAnswerIndex) {
          totalScore += 1;
        }
      });
      setScore(totalScore);
      setSubmitted(true);
    }
  };

  const handleDeleteExam = async () => {
    if (confirm('Are you sure you want to delete this exam?')) {
      await deleteExam(examId);
      router.push('/exams');
    }
  };

  if (!exam) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading exam details...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-10 min-h-screen bg-gray-50 flex flex-col px-4 py-12">
      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader className="bg-primary text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{exam.name}</CardTitle>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDeleteExam}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
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

      {/* Sticky progress bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md p-4 mb-6">
        <h2 className="text-xl font-bold mb-2 text-primary">Your Progress</h2>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-500 mt-2">
          {Math.round(progress)}% complete ({Object.values(answers).filter(answer => answer !== '').length} of {exam.questions.length} questions answered)
        </p>
        {submitted && (
          <p className="text-lg font-semibold mt-2 text-primary">
            Your Score: {score}/{exam.questions.length} ({(score / exam.questions.length * 100).toFixed(2)}%)
          </p>
        )}
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
              disabled={submitted}
            >
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-option${optionIndex}`} />
                  <Label htmlFor={`q${question.id}-option${optionIndex}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {submitted && (
              <div className="mt-4">
                {parseInt(answers[question.id]) === question.rightAnswerIndex ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Correct!
                  </div>
                ) : (
                  <div className="flex flex-col text-red-600">
                    <div className="flex items-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      Incorrect. Correct answer: {question.options[question.rightAnswerIndex]}
                    </div>
                    {question.explanation && (
                      <p className="mt-2 text-sm">
                        Explanation: {question.explanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Button 
        onClick={handleSubmit} 
        className="mt-8 bg-primary text-white"
        disabled={submitted || Object.values(answers).some(answer => answer === '')}
      >
        {submitted ? 'Exam Submitted' : 'Submit Exam'}
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