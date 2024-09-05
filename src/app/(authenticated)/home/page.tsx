'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([])
  const [singleChoiceQuestions, setSingleChoiceQuestions] = useState(5)
  const [trueFalseQuestions, setTrueFalseQuestions] = useState(5)
  const [examName, setExamName] = useState('')
  const [generating, setGenerating] = useState(false)
  const [difficulty, setDifficulty] = useState<string>('medium')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleGenerate = () => {
    setGenerating(true)
    // Implement exam generation logic here
    setTimeout(() => {
      setGenerating(false)
      console.log('Generating exam:', examName, 'with', singleChoiceQuestions, 'single-choice questions and', trueFalseQuestions, 'true/false questions from', files.length, 'files')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-center text-primary">ExamAI</h1>
      <p className="text-lg text-center text-muted-foreground mb-8 max-w-md">
        Harness the power of AI to create customized exams from your content in minutes.
      </p>
      <Card className="w-full max-w-5xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Generate Your Exam</CardTitle>
          <CardDescription>Upload your content and customize your exam settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            <div className="flex-1">
              <div 
                {...getRootProps()} 
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-100 transition-colors h-full flex flex-col justify-center"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p className="text-primary">Drop the files here ...</p>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Drag & drop some files here, or click to select files</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="exam-name" className="text-base">Exam Name</Label>
                <Input
                  id="exam-name"
                  placeholder="Enter exam name"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="difficulty" className="text-base">Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="single-choice-questions" className="text-base">Single-Choice Questions</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    id="single-choice-questions"
                    min={0}
                    max={10}
                    step={1}
                    value={[singleChoiceQuestions]}
                    onValueChange={(value) => setSingleChoiceQuestions(value[0])}
                    className="flex-grow"
                  />
                  <span className="text-sm text-muted-foreground w-8 text-right">{singleChoiceQuestions}</span>
                </div>
              </div>
              <div>
                <Label htmlFor="true-false-questions" className="text-base">True/False Questions</Label>
                <div className="flex items-center space-x-2">
                  <Slider
                    id="true-false-questions"
                    min={0}
                    max={10}
                    step={1}
                    value={[trueFalseQuestions]}
                    onValueChange={(value) => setTrueFalseQuestions(value[0])}
                    className="flex-grow"
                  />
                  <span className="text-sm text-muted-foreground w-8 text-right">{trueFalseQuestions}</span>
                </div>
              </div>
            </div>
          </div>
          {files.length > 0 && (
            <div className="bg-secondary p-4 rounded-md">
              <h3 className="font-semibold mb-2 text-secondary-foreground">Uploaded Files:</h3>
              <ul className="space-y-1">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center text-sm text-secondary-foreground">
                    <FileText className="mr-2 h-4 w-4" />
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full text-lg py-6" 
            onClick={handleGenerate} 
            disabled={files.length === 0 || generating || !examName || (singleChoiceQuestions + trueFalseQuestions === 0)}
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Exam...
              </>
            ) : (
              'Generate Exam'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}