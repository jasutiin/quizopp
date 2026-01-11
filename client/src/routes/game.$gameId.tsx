import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { getSocket, submitAnswer } from '@/lib/socket'

export default function Game() {
  const { gameId } = useParams({ from: '/game/$gameId' })
  const [timeLeft, setTimeLeft] = useState(13)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [showAnswers, setShowAnswers] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  // Mock data for players - replace with actual game state later
  const gameData = {
    players: [
      {
        name: 'You',
        avatar: 'https://via.placeholder.com/50x50?text=You',
        score: 0,
      },
      {
        name: 'Opponent',
        avatar: 'https://via.placeholder.com/50x50?text=Opp',
        score: 0,
      },
    ],
    totalQuestions: 8,
  }

  const maxScore = 8

  useEffect(() => {
    const socket = getSocket()

    socket.on(
      'game:nextQuestion',
      ({
        question,
        questionIndex,
      }: {
        question: string
        questionIndex: number
      }) => {
        setCurrentQuestion(question)
        setQuestionIndex(questionIndex)
        setShowAnswers(false)
      },
    )

    socket.on('game:showAnswers', () => setShowAnswers(true))

    socket.on('timer:update', ({ time }: { time: number }) => setTimeLeft(time))

    socket.on('game:finished', () => setGameFinished(true))

    return () => {
      socket.off('game:nextQuestion')
      socket.off('game:showAnswers')
      socket.off('timer:update')
      socket.off('game:finished')
    }
  }, [])

  const handleAnswer = (answer: string) => {
    const userId = 'user123' // TODO: Replace with actual user ID
    submitAnswer(gameId, questionIndex, userId, answer)
  }

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Game Finished!</h1>
          <p className="text-xl">Thanks for playing!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Left Player Score Bar */}
      <div className="flex-1 flex flex-col items-center justify-end p-4">
        <div
          className="w-8 bg-blue-500 rounded-t-lg"
          style={{ height: `${(gameData.players[0].score / maxScore) * 60}vh` }}
        ></div>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Top: Avatars and Names with Time in Middle */}
        <div className="flex items-center w-full mb-8">
          <div className="flex-1 flex justify-center">
            <div className="flex items-center">
              <img
                src={gameData.players[0].avatar}
                alt={gameData.players[0].name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-semibold">
                  {gameData.players[0].name}
                </p>
                <p className="text-sm text-gray-400">
                  {gameData.players[0].score} pts
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mx-8">
            <div className="text-sm text-gray-400 mb-1">Time left</div>
            <div className="text-3xl font-bold text-yellow-400">{timeLeft}</div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center">
              <div className="text-right mr-4">
                <p className="text-lg font-semibold">
                  {gameData.players[1].name}
                </p>
                <p className="text-sm text-gray-400">
                  {gameData.players[1].score} pts
                </p>
              </div>
              <img
                src={gameData.players[1].avatar}
                alt={gameData.players[1].name}
                className="w-16 h-16 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg text-center">
          <h2 className="text-xl font-bold mb-4">
            Question {questionIndex + 1} of {gameData.totalQuestions}
          </h2>
          <p className="text-lg mb-6">
            {currentQuestion || 'Waiting for question...'}
          </p>
          {showAnswers && (
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map((ans) => (
                <button
                  key={ans}
                  onClick={() => handleAnswer(ans)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  {ans}
                </button>
              ))}
            </div>
          )}
          {!showAnswers && (
            <p className="text-gray-400">Answers will appear shortly...</p>
          )}
        </div>
      </div>

      {/* Right Player Score Bar */}
      <div className="flex-1 flex flex-col items-center justify-end p-4">
        <div
          className="w-8 bg-blue-500 rounded-t-lg"
          style={{ height: `${(gameData.players[1].score / maxScore) * 60}vh` }}
        ></div>
      </div>
    </div>
  )
}
