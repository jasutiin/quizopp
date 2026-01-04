export default function Game() {
  // Mock data - replace with actual game state
  const gameData = {
    players: [
      {
        name: 'You',
        avatar: 'https://via.placeholder.com/50x50?text=You',
        score: 7,
      },
      {
        name: 'Opponent',
        avatar: 'https://via.placeholder.com/50x50?text=Opp',
        score: 5,
      },
    ],
    timeLeft: 30, // seconds
    currentQuestion: 3,
    totalQuestions: 10,
  }

  const maxScore = 10 // Assuming max score for bar height

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
            <div className="text-3xl font-bold text-yellow-400">
              {gameData.timeLeft}
            </div>
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

        {/* Question Area - Placeholder */}
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg text-center">
          <h2 className="text-xl font-bold mb-4">
            Question {gameData.currentQuestion}
          </h2>
          <p className="text-lg mb-6">What is the capital of France?</p>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Paris
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
              London
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
              Berlin
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
              Madrid
            </button>
          </div>
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
