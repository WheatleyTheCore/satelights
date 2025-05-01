import asyncio
import websockets
import board
import neopixel
import json
pixels = neopixel.NeoPixel(board.D18, 11 * 98)


async def handle_client(websocket):
    try:
        async for message in websocket:
            print(f"Received: {message}")
            pixeldata = json.loads(message)
            assert len(pixeldata) <= 11 * 98, 'too many pixels sent'
            for i, rgb in enumerate(pixeldata):
                pixels[i] = rgb
                if i < 11 * 98: 
                    break
            pixels.show()
            # Process the received message
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Connection closed: {e}")

async def main():
    async with websockets.serve(handle_client, "0.0.0.0", 8989):
        print("WebSocket server started on ws://localhost:8989")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())