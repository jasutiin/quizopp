import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function App() {
  // Mock quiz data
  const quizzes = [
    {
      id: 1,
      name: 'General Knowledge',
      description: 'Test your knowledge on various topics',
      image: 'https://via.placeholder.com/300x200?text=General+Knowledge',
    },
    {
      id: 2,
      name: 'Science',
      description: 'Explore the wonders of science',
      image: 'https://via.placeholder.com/300x200?text=Science',
    },
    {
      id: 3,
      name: 'History',
      description: 'Journey through time',
      image: 'https://via.placeholder.com/300x200?text=History',
    },
    {
      id: 4,
      name: 'Geography',
      description: 'Discover the world',
      image: 'https://via.placeholder.com/300x200?text=Geography',
    },
  ]

  const handleViewQuiz = (quizId: number) => {
    console.log('Viewing quiz:', quizId)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Choose a Quiz
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={quiz.image}
                alt={quiz.name}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-xl">{quiz.name}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleViewQuiz(quiz.id)}
                  className="w-full"
                >
                  Play
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
