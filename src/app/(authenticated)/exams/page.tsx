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
import { Trash2, Pencil } from "lucide-react"
import { deleteExam } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ITEMS_PER_PAGE = 10;

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

  const handleDeleteExam = async (e: React.MouseEvent, examId: string) => {
    e.preventDefault(); // Prevent navigation to exam detail page
    if (confirm('Are you sure you want to delete this exam?')) {
      await deleteExam(examId);
      setAllExams(prevExams => prevExams.filter(exam => exam.id !== examId));
      setFilteredExams(prevExams => prevExams.filter(exam => exam.id !== examId));
    }
  };

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

      <div className="mb-8 overflow-x-auto text-primary">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Topics</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Attempts</TableHead>
              <TableHead>Best Grade</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Skeleton loaders for table rows
              Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: 8 }).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Actual exam rows
              exams.map((exam) => (
                <TableRow key={exam.id} className="group">
                  <TableCell>
                    <Link href={`/exams/${exam.id}`} className="text-primary hover:underline">
                      {exam.name}
                    </Link>
                  </TableCell>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell>{exam.topics.join(', ')}</TableCell>
                  <TableCell>
                    <Badge variant={getDifficultyVariant(exam.difficulty)}>{exam.difficulty}</Badge>
                  </TableCell>
                  <TableCell>{exam.numberOfQuestions}</TableCell>
                  <TableCell>{exam.attempts}</TableCell>
                  <TableCell>{exam.bestGrade}%</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link href={`/exams/${exam.id}`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          title="Do Exam"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => handleDeleteExam(e, exam.id)}
                        title="Delete Exam"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-auto text-primary">
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