'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, BarChart, HelpCircle, Tag, Trash2, CheckCircle, XCircle } from "lucide-react"

// Mock API functions (replace with actual API calls in a real application)
const getExamById = async (id: string) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    id,
    name: 'Introduction to Biology',
    subject: 'Biology',
    topics: ['Cell Biology', 'Genetics', 'Ecology'],
    numberOfQuestions: 3,
    attempts: 2,
    bestGrade: 85,
    difficulty: 'Medium',
    questions: [
      {
        id: 1,
        text: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Endoplasmic reticulum', 'Golgi apparatus'],
        correctAnswer: 'Mitochondria',
      },
      {
        id: 2,
        text: 'Which of the following is NOT a type of blood cell?',
        options: ['Red blood cells', 'White blood cells', 'Platelets', 'Nerve cells'],
        correctAnswer: 'Nerve cells',
      },
      {
        id: 3,
        text: 'What is the process by which plants make their own food?',
        options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Digestion'],
        correctAnswer: 'Photosynthesis',
      },
    ],
  }
}

const deleteExam = async (id: string) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log(`Exam ${id} deleted`)
}

export default function ExamDetailPage() {
  const { examId } = useParams()
  const router = useRouter()
  const [exam, setExam] = useState<any>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [progress, setProgress] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const fetchExam = async () => {
      const fetchedExam = await getExamById(examId as string)
      setExam(fetchedExam)
      const initialAnswers = fetchedExam.questions.reduce((acc: Record<number, string>, question: any) => {
        acc[question.id] = ''
        return acc
      }, {})
      setAnswers(initialAnswers)
    }
    fetchExam()
  }, [examId])

  useEffect(() => {
    if (exam) {
      const answeredQuestions = Object.values(answers).filter(answer => answer !== '').length
      const progressPercentage = (answeredQuestions / exam.questions.length) * 100
      setProgress(progressPercentage)
    }
  }, [answers, exam])

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = () => {
    if (exam) {
      let totalScore = 0
      exam.questions.forEach((question: any) => {
        if (answers[question.id] === question.correctAnswer) {
          totalScore += 1
        }
      })
      setScore(totalScore)
      setSubmitted(true)
    }
  }

  const handleDeleteExam = async () => {
    if (confirm('Are you sure you want to delete this exam?')) {
      await deleteExam(examId as string)
      router.push('/exams')
    }
  }

  if (!exam) return <div>Loading...</div>

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
          <p className="text-lg font-semibold mt-2">
            Your Score: {score}/{exam.questions.length} ({(score / exam.questions.length * 100).toFixed(2)}%)
          </p>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-primary">Exam Questions</h2>

      {exam.questions.map((question: any, index: number) => (
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
              {question.options.map((option: string, optionIndex: number) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${question.id}-option${optionIndex}`} />
                  <Label htmlFor={`q${question.id}-option${optionIndex}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {submitted && (
              <div className="mt-4">
                {answers[question.id] === question.correctAnswer ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Correct!
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="w-5 h-5 mr-2" />
                    Incorrect. Correct answer: {question.correctAnswer}
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
  )
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