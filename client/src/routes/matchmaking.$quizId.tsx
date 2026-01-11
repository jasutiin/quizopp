import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import {
  connectSocket,
  getSocket,
  joinGame,
  joinMatchmaking,
} from '@/lib/socket'

export default function Matchmaking() {
  const { quizId } = useParams({ from: '/matchmaking/$quizId' })
  const navigate = useNavigate()
  const [status, setStatus] = useState('Connecting...')

  useEffect(() => {
    const socket = connectSocket()

    socket.on('matchmaking:joined', () => setStatus('Looking for opponent...'))
    socket.on('matchmaking:waiting', () =>
      setStatus('Waiting for another player...'),
    )
    socket.on(
      'game:ready',
      ({ gameId, quizId }: { gameId: string; quizId: string }) => {
        setStatus('Game found! Joining...')
        joinGame(gameId, quizId)
      },
    )
    socket.on('game:joined', () =>
      setStatus('Joined game, waiting for opponent...'),
    )
    socket.on('game:start', ({ gameId }: { gameId: string }) => {
      navigate({ to: '/game/$gameId', params: { gameId } })
    })

    joinMatchmaking(quizId)

    return () => {
      socket.off('matchmaking:joined')
      socket.off('matchmaking:waiting')
      socket.off('game:ready')
      socket.off('game:joined')
      socket.off('game:start')
    }
  }, [quizId, navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Looking for a game
        </h1>
        <div className="relative">
          <img
            src="https://via.placeholder.com/200x200?text=Quiz+Logo"
            alt="Quiz Topic Logo"
            className="w-48 h-48 mx-auto rounded-full shadow-lg zoom-animation"
          />
        </div>
        <p className="text-lg text-gray-600 mt-8">{status}</p>
      </div>
    </div>
  )
}
