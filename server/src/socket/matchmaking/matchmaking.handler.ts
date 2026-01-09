const registerMatchmakingHandlers = (io, socket) => {
  const joinMatchmaking = (payload) => {
    socket.emit('message', 'joined matchmaking');
  };

  const leaveMatchmaking = (payload) => {
    socket.emit('message', 'left matchmaking');
  };

  socket.on('matchmaking:join', joinMatchmaking);
  socket.on('matchmaking:leave', leaveMatchmaking);
};

export default registerMatchmakingHandlers;
