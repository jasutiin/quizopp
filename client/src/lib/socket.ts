import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3001'

// Singleton socket instance
let socket: Socket | null = null

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
    })
  }
  return socket
}

export const connectSocket = (): Socket => {
  const sock = getSocket()
  if (!sock.connected) {
    sock.connect()
  }
  return sock
}

export const disconnectSocket = (): void => {
  if (socket?.connected) {
    socket.disconnect()
  }
}

// Matchmaking events - Client emits
export const joinMatchmaking = (quizId: string): void => {
  getSocket().emit('matchmaking:join', { quizId })
}

export const leaveMatchmaking = (quizId: string): void => {
  getSocket().emit('matchmaking:leave', { quizId })
}

export const joinGame = (gameId: string, quizId: string): void => {
  getSocket().emit('game:join', { gameId, quizId })
}

// Game events - Client emits
export const submitAnswer = (
  gameId: string,
  questionIndex: number,
  userId: string,
  answer: string,
): void => {
  getSocket().emit('game:submitAnswer', {
    gameId,
    questionIndex,
    userId,
    answer,
  })
}

export const leaveGame = (gameId: string): void => {
  getSocket().emit('game:leaveGame', { gameId })
}

export default getSocket
