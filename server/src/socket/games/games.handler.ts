const registerGameHandlers = (io, socket) => {
  const submitAnswer = (payload) => {
    socket.emit('game', 'submitted answer');
  };

  const leaveGame = (payload) => {
    socket.emit('game', 'left game');
  };

  socket.on('game:submitAnswer', submitAnswer);
  socket.on('game:leaveGame', leaveGame);
};

export default registerGameHandlers;
