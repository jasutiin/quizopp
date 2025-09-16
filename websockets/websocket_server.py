import socketio
import uvicorn
import getpass
import os
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage


load_dotenv()
sio = socketio.AsyncServer(async_mode='asgi')
if not os.environ.get("OPENAI_API_KEY"):
  os.environ["OPENAI_API_KEY"] = getpass.getpass("Enter API key for OpenAI: ")

from langchain.chat_models import init_chat_model
print(os.environ.get("OPENAI_API_KEY"))

model = init_chat_model("gpt-4o-mini", model_provider="openai")

@sio.event
async def connect(sid, environ, auth): # sid is the id of the client
    print('connect ', sid)


@sio.event
async def disconnect(sid, reason):
    print('disconnect ', sid, reason)


@sio.on('my message')
async def handle_message(sid, data):
    message = model.invoke([HumanMessage(content=f"{data}")]).content
    await sio.emit('my message', f"{message}")


app = socketio.ASGIApp(sio)

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=3000)