'use client';

import { io } from 'socket.io-client';

export default function GamePage(props: { params: { id: string } }) {
  const params = props.params;

  // client is on port 3000 while this is on port 8765, might trigger cors warning
  const socket = io('ws://localhost:8765', {
    autoConnect: true,
  });

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-800 flex items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        onClick={() => {
          socket.emit('buzz');
        }}
      >
        Click!
      </button>
    </div>
  );
}
