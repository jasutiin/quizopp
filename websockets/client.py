import socketio
import asyncio

async def main():
  sio = socketio.AsyncClient()

  @sio.event
  async def connect():
    print("I'm connected!")


  @sio.event
  async def connect_error(data):
    print("The connection failed!")


  @sio.event
  async def disconnect(reason):
    print("I'm disconnected! reason:", reason)


  @sio.on('my message')
  async def on_message(data):
    print(f'{data}')


  await sio.connect('http://localhost:3000')
  print('my sid is', sio.sid)
  print('my transport is', sio.transport)

  while True:
    message = input("type something: ")
    await sio.emit('my message', message)
    await asyncio.sleep(2)


if __name__ == "__main__":
  asyncio.run(main())