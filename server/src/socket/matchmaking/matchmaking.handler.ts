import { v4 as uuidv4 } from 'uuid';
import { startGame } from '../games/games.service';

const registerMatchmakingHandlers = (io, socket) => {
  const joinMatchmaking = (payload) => {
    const { quizId } = payload;
    console.log(`Player ${socket.id} joined matchmaking for quiz ${quizId}`);

    // join a websocket room for the quiz waitlist room
    socket.join(`waitlist-${quizId}`);
    socket.emit('matchmaking:joined', { quizId });

    const room = io.sockets.adapter.rooms.get(`waitlist-${quizId}`);

    // if there are gte 2 players in the waitlist
    if (room && room.size >= 2) {
      const gameId = `game-${uuidv4()}`; // create a new game room
      console.log(
        `Game ${gameId} ready for quiz ${quizId} with ${room.size} players`
      );
      io.to(`waitlist-${quizId}`).emit('game:ready', { gameId, quizId }); // send the game room id to waitlist
    } else {
      socket.emit('matchmaking:waiting', { quizId });
    }
  };

  const leaveMatchmaking = (payload) => {
    const { quizId } = payload;
    console.log(`Player ${socket.id} left matchmaking for quiz ${quizId}`);
    socket.leave(`waitlist-${quizId}`);
    socket.emit('matchmaking:left', { quizId });
  };

  const joinGame = (payload) => {
    const { gameId, quizId } = payload;
    console.log(`Player ${socket.id} joined game ${gameId} for quiz ${quizId}`);
    socket.leave(`waitlist-${quizId}`);
    socket.join(gameId);
    socket.emit('game:joined', { gameId });

    // check if both players joined, then start
    const gameRoom = io.sockets.adapter.rooms.get(gameId);
    if (gameRoom && gameRoom.size >= 2) {
      console.log(`Starting game ${gameId} with ${gameRoom.size} players`);
      io.to(gameId).emit('game:start', { gameId });
      startGame(io, null, { gameId, quizId });
    }
  };

  socket.on('matchmaking:join', joinMatchmaking);
  socket.on('matchmaking:leave', leaveMatchmaking);
  socket.on('game:join', joinGame);
};

export default registerMatchmakingHandlers;
