import asyncio
import websockets

async def handle_client(websocket):
    try:
        async for message in websocket:
            print(f"Received: {message}")
            # Process the received message
            await websocket.send(f"Echo: {message}") # Example: Echo the message back
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection closed: {e}")

async def main():
    async with websockets.serve(handle_client, "0.0.0.0", 9999):
        print("WebSocket server started on ws://localhost:9999")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())