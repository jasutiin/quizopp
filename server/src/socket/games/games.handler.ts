import { gameStates } from './games.service';

const registerGameHandlers = (io, socket) => {
  const submitAnswer = (payload) => {
    const { questionIndex, userId, gameId, answer } = payload;
    console.log(
      `Player ${socket.id} (user ${userId}) submitted answer for question ${questionIndex} in game ${gameId}: ${answer}`
    );
    const gameState = gameStates.get(gameId);

    if (!gameState) return;

    if (!gameState.submissions[questionIndex]) {
      gameState.submissions[questionIndex] = [];
    }

    gameState.submissions[questionIndex].push(answer);
  };

  const leaveGame = (payload) => {
    console.log(`Player ${socket.id} left game`);
    socket.emit('game', 'left game');
  };

  socket.on('game:submitAnswer', submitAnswer);
  socket.on('game:leaveGame', leaveGame);
};

export default registerGameHandlers;
