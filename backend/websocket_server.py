import socketio
import asyncio

"""
had claude generate this code. don't understand, will come back to it later
"""

sio = socketio.AsyncServer(cors_allowed_origins="*")
app = socketio.ASGIApp(sio, static_files={})

@sio.event
async def connect(sid, environ):
    print(f'Client {sid} connected')
    await sio.emit('message', 'Welcome to the server!', room=sid)

@sio.event
async def disconnect(sid):
    print(f'Client {sid} disconnected')

@sio.event
async def buzz(sid, data):
    print(f'Received buzz from {sid}')
    await sio.emit('buzz_response', 'Buzz received loud and clear!', room=sid)

@sio.event
async def chat_message(sid, data):
    message = data if isinstance(data, str) else str(data)
    print(f'Chat message from {sid}: {message}')
    await sio.emit('chat_response', f'Server received: {message}', room=sid)

@sio.event
async def get_status(sid, data):
    print(f'Status request from {sid}')
    await sio.emit('status_response', 'Server is running perfectly!', room=sid)

if __name__ == '__main__':
    print('Starting Socket.IO server on http://localhost:8765')
    import uvicorn
    uvicorn.run(app, host='localhost', port=8765)