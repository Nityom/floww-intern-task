import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: number
  title: string
  completed: boolean
  priority: string
  dueDate: string
}

interface TasksListProps {
  tasks: Task[]
  onTaskToggle: (taskId: number) => void
}

export default function TasksList({ tasks, onTaskToggle }: TasksListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tasks</CardTitle>
        <CardDescription>Manage your daily tasks and track progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => onTaskToggle(task.id)}
                className="h-5 w-5"
              />
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`task-${task.id}`}
                  className={`block text-sm font-medium cursor-pointer ${
                    task.completed ? "line-through text-gray-500" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </label>
                <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
              </div>
              <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
            </div>
          ))}
        </div>
        {tasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks available. Great job!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
