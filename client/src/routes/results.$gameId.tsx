import { Button } from '@/components/ui/button'

export default function Results() {
  // Mock data - replace with actual game results
  const gameData = {
    topic: 'General Knowledge',
    winner: 'You',
    players: [
      {
        name: 'You',
        avatar: 'https://via.placeholder.com/100x100?text=You',
      },
      {
        name: 'Opponent',
        avatar: 'https://via.placeholder.com/100x100?text=Opponent',
      },
    ],
  }

  const handleRematch = () => {
    console.log('Rematch clicked')
  }

  const handleAnotherOpponent = () => {
    console.log('Another Opponent clicked')
  }

  const handleLeaveGame = () => {
    console.log('Leave Game clicked')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-green-50 to-blue-100 p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">RESULTS</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">
          {gameData.topic}
        </h2>
        <h3 className="text-3xl font-bold text-green-600 mb-12">YOU WIN!</h3>

        <div className="flex items-center justify-center mb-12">
          <div className="flex flex-col items-center mx-4">
            <img
              src={gameData.players[0].avatar}
              alt={gameData.players[0].name}
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-lg font-medium">{gameData.players[0].name}</p>
          </div>
          <span className="text-2xl font-bold text-gray-500 mx-4">vs.</span>
          <div className="flex flex-col items-center mx-4">
            <img
              src={gameData.players[1].avatar}
              alt={gameData.players[1].name}
              className="w-24 h-24 rounded-full mb-2"
            />
            <p className="text-lg font-medium">{gameData.players[1].name}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button onClick={handleRematch} className="w-full text-lg py-3">
            Rematch
          </Button>
          <Button
            onClick={handleAnotherOpponent}
            variant="outline"
            className="w-full text-lg py-3"
          >
            Another Opponent
          </Button>
          <Button
            onClick={handleLeaveGame}
            variant="secondary"
            className="w-full text-lg py-3"
          >
            Leave Game
          </Button>
        </div>
      </div>
    </div>
  )
}
