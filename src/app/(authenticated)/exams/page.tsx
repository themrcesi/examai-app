'use client'

import React, { useState, useEffect } from 'react';
import { getExams } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, BarChart, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton"

const ITEMS_PER_PAGE = 8;

export default function ExamsPage() {
  const [allExams, setAllExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchExams = async () => {
    setIsLoading(true);
    try {
        // Simulate a delay of 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        const exams = await getExams();
        setAllExams(exams);
        setFilteredExams(exams);
    } catch (error) {
        console.error("Failed to fetch exams:", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    const filtered = allExams.filter(exam => 
      (subjectFilter === '' || subjectFilter === 'all' || exam.subject === subjectFilter) &&
      (topicFilter === '' || topicFilter === 'all' || exam.topics.includes(topicFilter)) &&
      (difficultyFilter === '' || difficultyFilter === 'all' || exam.difficulty === difficultyFilter)
    );
    setFilteredExams(filtered);
    setCurrentPage(1);
  }, [subjectFilter, topicFilter, difficultyFilter, allExams]);

  const totalPages = Math.ceil(filteredExams.length / ITEMS_PER_PAGE);
  const exams = filteredExams.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const subjects = [...new Set(allExams.map(exam => exam.subject))];
  const topics = [...new Set(allExams.flatMap(exam => exam.topics))];
  const difficulties = [...new Set(allExams.map(exam => exam.difficulty))];

  return (
    <div className="flex-1 p-10 min-h-screen bg-gray-50 flex flex-col px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Your Exams</h1>
        <Button
          onClick={fetchExams}
          disabled={isLoading}
          className="flex items-center"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Exams
        </Button>
      </div>
      
      <div className="flex space-x-4 mb-6 text-primary">
        <Select onValueChange={(value) => setSubjectFilter(value || '')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setTopicFilter(value || '')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics.map(topic => (
              <SelectItem key={topic} value={topic}>{topic}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setDifficultyFilter(value || '')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          // Skeleton loaders
          Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual exam cards
          exams.map((exam, index) => (
            <Link href={`/exams/${exam.id}`} key={index} className="h-full">
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{exam.name}</span>
                    <Badge variant={getDifficultyVariant(exam.difficulty)}>{exam.difficulty}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Questions
                      </span>
                      <span className="font-medium">{exam.numberOfQuestions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <BarChart className="w-4 h-4 mr-2" />
                        Attempts
                      </span>
                      <span className="font-medium">{exam.attempts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Award className="w-4 h-4 mr-2" />
                        Best Grade
                      </span>
                      <span className="font-medium">{exam.bestGrade}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    <div>Subject: {exam.subject}</div>
                    <div>Topics: {exam.topics.join(', ')}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      <div className="flex justify-center items-center space-x-2 mt-auto">
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
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