import { v4 as uuidv4 } from 'uuid';

const registerMatchmakingHandlers = (io, socket) => {
  const joinMatchmaking = (payload) => {
    const { quizId } = payload;

    // join a websocket room for the quiz waitlist room
    socket.join(`waitlist-${quizId}`);
    socket.emit('matchmaking:joined', { quizId });

    const room = io.sockets.adapter.rooms.get(`waitlist-${quizId}`);

    // if there are gte 2 players in the waitlist
    if (room && room.size >= 2) {
      const gameId = `game-${uuidv4()}`; // create a new game room
      io.to(`waitlist-${quizId}`).emit('game:ready', { gameId, quizId }); // send the game room id to waitlist
    } else {
      socket.emit('matchmaking:waiting', { quizId });
    }
  };

  const leaveMatchmaking = (payload) => {
    const { quizId } = payload;
    socket.leave(`waitlist-${quizId}`);
    socket.emit('matchmaking:left', { quizId });
  };

  const joinGame = (payload) => {
    const { gameId, quizId } = payload;
    socket.leave(`waitlist-${quizId}`);
    socket.join(gameId);
    socket.emit('game:joined', { gameId });

    // check if both players joined, then start
    const gameRoom = io.sockets.adapter.rooms.get(gameId);
    if (gameRoom && gameRoom.size >= 2) {
      io.to(gameId).emit('game:start', { gameId });
    }
  };

  socket.on('matchmaking:join', joinMatchmaking);
  socket.on('matchmaking:leave', leaveMatchmaking);
  socket.on('game:join', joinGame);
};

export default registerMatchmakingHandlers;
