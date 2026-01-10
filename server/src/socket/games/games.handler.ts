const registerMatchmakingHandlers = (io, socket) => {
  const submitAnswer = (payload) => {
    socket.emit('game', 'submitted answer');
  };

  const startGame = (payload) => {
    socket.emit('game', 'started game');
  };

  const leaveGame = (payload) => {
    socket.emit('game', 'left game');
  };

  const updateTimer = (payload) => {
    socket.emit('game', 'updated timer');
  };

  socket.on('game:submitAnswer', submitAnswer);
  socket.on('game:startGame', startGame);
  socket.on('game:leaveGame', leaveGame);
  socket.on('game:timerUpdate', updateTimer);
};

export default registerMatchmakingHandlers;
