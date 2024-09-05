'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Home, FileText, Settings, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className, ...props }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={cn(
        "bg-gray-100 flex flex-col transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20",
        className
      )} 
      {...props}
    >
      <div className="flex items-center justify-end p-4">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800">
          {isExpanded ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>
      </div>
      <nav className="flex-grow">
        <Link href="/home" className="flex items-center p-4 hover:bg-gray-200 transition-colors">
          <Home className="w-6 h-6 text-gray-600" />
          {isExpanded && <span className="ml-4 text-gray-600">Home</span>}
        </Link>
        <Link href="/exams" className="flex items-center p-4 hover:bg-gray-200 transition-colors">
          <FileText className="w-6 h-6 text-gray-600" />
          {isExpanded && <span className="ml-4 text-gray-600">Exams</span>}
        </Link>
        {/* Add more menu items here */}
      </nav>
      <div className="mt-auto">
        <Link href="/settings" className="flex items-center p-4 hover:bg-gray-200 transition-colors">
          <Settings className="w-6 h-6 text-gray-600" />
          {isExpanded && <span className="ml-4 text-gray-600">Settings</span>}
        </Link>
      </div>
    </div>
  );
}