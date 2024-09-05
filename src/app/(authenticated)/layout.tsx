'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = checkAuthStatus() // Implement this function
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  )
}

function checkAuthStatus() {
  // Implement your authentication check here
  // Return true if authenticated, false otherwise
  return true // Placeholder
}