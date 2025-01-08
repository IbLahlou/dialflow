import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const tasks = [
  {
    title: "Order Confirmations",
    description: "Verify and confirm customer orders",
    completed: 152,
    total: 200,
  },
  {
    title: "Product Inquiries",
    description: "Answer questions about products and services",
    completed: 89,
    total: 120,
  },
  {
    title: "Technical Support",
    description: "Assist customers with technical issues",
    completed: 67,
    total: 100,
  },
  {
    title: "Returns and Refunds",
    description: "Process return requests and refunds",
    completed: 45,
    total: 60,
  },
  {
    title: "Account Management",
    description: "Help customers manage their accounts",
    completed: 78,
    total: 90,
  },
  {
    title: "Feedback Collection",
    description: "Gather customer feedback and suggestions",
    completed: 34,
    total: 50,
  },
]

export function CustomerServiceTasks() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{task.completed} / {task.total}</span>
            </div>
            <Progress value={(task.completed / task.total) * 100} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

