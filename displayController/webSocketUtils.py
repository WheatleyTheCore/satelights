import websockets
import globals
import asyncio

async def handler(websocket):
    print("new connection!")
    try:    
        while True:
            message = await websocket.recv()
            if (globals.communicationQueue.qsize() > 5):
                globals.communicationQueue.get() # remove last element so newly writed one gets put last, to prevent comm delays from causing it to lag behind
            globals.communicationQueue.put(message)
    except websockets.exceptions.ConnectionClosed:
        print("Connection closed.")
        
async def serve():
    async with websockets.serve(handler, "0.0.0.0", 9999):
        print("WebSocket server started on ws://localhost:9999")
        await asyncio.Future()  # run forever

def startListneningToSocket():
    asyncio.run(serve())
    

        
        