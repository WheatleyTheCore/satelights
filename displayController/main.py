import pandas as pd
from ursina import *
import numpy as np
from Entities.SimpleStars import *
from Entities.Earth import *
from Entities.Satellites.Satellites import *
from Entities.Planets.Planets import *
from webSocketUtils import *
import threading
from PIL import Image, ImageOps
from panda3d.core import PNMImage, FrameBufferProperties, WindowProperties, GraphicsPipe, Texture
from direct.showbase.BufferViewer import BufferViewer
from skyfield.api import load
import argparse
import asyncio



parser = argparse.ArgumentParser(description="Display Controller!")
parser.add_argument("-s", "--simulation", action="store_true", help="is this a simulations? or should it try to connect to the LED matrix?")

simulation = False
args = parser.parse_args()

if (args.simulation):
    simulation = True

# disp_thread = threading.Thread(target=startDisplayServer, args=(simulation,), daemon=True)
# disp_thread.start()
ws_thread = threading.Thread(target=startListneningToSocket, daemon=True)
ws_thread.start()

window.borderless=False 
window.always_on_top = True
px_per_ft = 20
app = Ursina(size=(11 * px_per_ft, 16 * px_per_ft))

# screen = screeninfo.get_monitors()[0]
# window.size = (screen.width, screen.height)

stars = Stars()
earth = Earth()
sats = Satellites()
planets = Planets()



frame = PNMImage()
matrixAspectRatio = 86 / 12

def postprocess_frame():
    texture = base.win.getScreenshot()
    img = texture.getRamImage()
    image_format = texture.get_format()
    width = texture.get_x_size()
    height = texture.get_y_size()
    
    
    if image_format == Texture.F_rgba:
        components = 4
        dtype = np.uint8
    elif image_format == Texture.F_rgb:
        components = 3
        dtype = np.uint8
    elif image_format == Texture.F_r8:
        components = 1
        dtype = np.uint8
    else:
        print(f"Unsupported texture format: {image_format}")
        return None
    image_np = np.frombuffer(img, dtype=dtype)
    image_np = image_np.reshape((height, width, components))

    # Convert from BGR/BGRA to RGB/RGBA if necessary
    if components >= 3:
        image_np = image_np[:, :, ::-1]
    
    image_np = np.flip(image_np, axis=0)
    rgba_image = image_np[:, :, [1, 2, 3, 0]]
    flipped_rgba_image = np.flip(rgba_image, axis=0)
    
    img = Image.fromarray(image_np[:, :, [1, 2, 3, 0]],)
    # img = ImageOps.flip(img)
    # img.save('./frame.png')
    satColor = (255,0,128,255)
    starColor = (255, 255, 255, 255)
    planetColor = (128,0,255,255)
    
    rows, cols, _ = rgba_image.shape
    cell_height_px = rows // 90 # since 86 lights per row
    cell_width_px = cols // 11 # since 11 columns
    
    rgb_sequence = []
    for col_idx in range(11):
        for row_idx in range(90):
            row_start = row_idx * cell_height_px
            col_start = col_idx * cell_width_px
            img_cell = None
            if (col_idx % 2 == 1):
                img_cell = flipped_rgba_image[row_start:row_start + cell_height_px, col_start:col_start+cell_width_px, :]
            else:
                img_cell = rgba_image[row_start:row_start + cell_height_px, col_start:col_start+cell_width_px, :]
            contains_sat = np.where( np.all(img_cell == satColor, axis=-1))[0].size != 0
            contains_planet = np.where( np.all(img_cell == planetColor, axis=-1))[0].size != 0
            contains_star = np.where( np.all(img_cell == starColor, axis=-1))[0].size != 0
            
            if contains_sat:
                rgb_sequence.append((255, 0, 128))
            elif contains_planet:
                rgb_sequence.append((128, 0, 255))
            elif contains_star:
                rgb_sequence.append((200, 200, 200))
            else:
                rgb_sequence.append((0, 0, 0))
                
    if (not simulation):
        import board
        import neopixel
        pixels = neopixel.NeoPixel(board.D18, 11 * 98)
        pixel_idx = 0
        rgb_seq_idx = 0
        for col in range(11):
            for row in range(90):
                pixels[pixel_idx] = rgb_sequence[rgb_seq_idx]
                pixel_idx += 1
                rgb_seq_idx +=1 
            for i in range (8):
                pixels[pixel_idx] = (0, 0, 0)
                pixel_idx +=1 
        pixels.show()



def update():
    postprocess_frame()    
    

app.run()

