import asyncio
from websockets.sync.server import serve
import board
import neopixel
import json
import time



def handle_client(websocket):
    try:
        pixels = neopixel.NeoPixel(board.D18, 11 * 98)
        for message in websocket:
            pixeldata = json.loads(message)
            assert len(pixeldata) <= 11 * 98, 'too many pixels sent'
            for i, rgb in enumerate(pixeldata):
                print(rgb)
                pixels[i] = rgb
                if i < 11 * 98: 
                    break
            pixels.show()
            time.sleep(1)
            
            # Process the received message
    except Exception as e:
        print(f"Connection closed: {e}")

    

if __name__ == "__main__":
    with serve(handle_client, "0.0.0.0", 8989) as server:
        print("WebSocket server started on ws://localhost:8989")
        server.serve_forever()
