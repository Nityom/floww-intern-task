"use client"

import { useState } from "react"
import DashboardHeader from "@/components/DashboardHeader"
import ProfileCard from "@/components/ProfileCard"
import StatisticsCard from "@/components/StatisticsCard"
import TasksList from "@/components/TasksList"

// Mock data - simulating API response
interface User {
  id: number
  name: string
  email: string
  avatar: string
}

interface Task {
  id: number
  title: string
  completed: boolean
  priority: string
  dueDate: string
}

const mockUserData: User = {
  id: 1,
  name: "Nityom Tikhe",
  email: "nityomtikherr@gmail.com",
  avatar: "/placeholder.svg?height=100&width=100",
}

const mockTasks: Task[] = [
  { id: 1, title: "Complete project proposal", completed: true, priority: "high", dueDate: "15-06-2025" },
  { id: 2, title: "Review team feedback", completed: false, priority: "medium", dueDate: "16-06-2025" },
  { id: 3, title: "Update documentation", completed: false, priority: "low", dueDate: "17-06-2025" },
  { id: 4, title: "Prepare presentation slides", completed: true, priority: "high", dueDate: "14-06-2025" },
  { id: 5, title: "Schedule client meeting", completed: false, priority: "medium", dueDate: "16-06-2025" },
  { id: 6, title: "Code review for new feature", completed: true, priority: "high", dueDate: "13-06-2025" },
]

export default function Dashboard() {
  const [user, setUser] = useState(mockUserData)
  const [tasks, setTasks] = useState(mockTasks)

  const handleTaskToggle = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader 
          title="Dashboard" 
          description="Welcome back! Here's what's happening with your tasks." 
        />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ProfileCard user={user} onUpdateUser={handleUpdateUser} />
          <StatisticsCard tasks={tasks} />
        </div>

        <TasksList tasks={tasks} onTaskToggle={handleTaskToggle} />
      </div>
    </div>
  )
}
