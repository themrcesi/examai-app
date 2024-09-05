'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Github, Mail } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement login logic here
    console.log('Login with:', email, password)
    // After successful login, redirect to the dashboard
    router.push('/home')
  }

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login')
    // After successful login, redirect to the dashboard
    router.push('/home')
  }

  const handleGithubLogin = () => {
    // Implement GitHub login logic here
    console.log('GitHub login')
    // After successful login, redirect to the dashboard
    router.push('/home')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to ExamAI</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" onClick={handleGoogleLogin}>
            <Mail className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
          <Button variant="outline" onClick={handleGithubLogin}>
            <Github className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">Don&apos;t have an account?</span>
            <a
              className="text-primary underline-offset-4 transition-colors hover:underline"
              href="#"
            >
              Sign up
            </a>
          </div>
          <a
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
            href="#"
          >
            Forgot password?
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}