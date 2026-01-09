const registerMatchmakingHandlers = (io, socket) => {
  const submitAnswer = (payload) => {
    socket.emit('message', 'submitted answer');
  };

  socket.on('game:submitAnswer', submitAnswer);
};

export default registerMatchmakingHandlers;
