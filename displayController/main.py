import pandas as pd
from ursina import *
import numpy as np
from Entities.SimpleStars import *
from Entities.Earth import *
from Entities.Satellites.Satellites import *
from Entities.Planets.Planets import *
from webSocketUtils import *
from displayHandler import *
import threading
from PIL import Image
from panda3d.core import PNMImage, FrameBufferProperties, WindowProperties, GraphicsPipe, Texture
from direct.showbase.BufferViewer import BufferViewer
import screeninfo
from skyfield.api import load
import argparse



parser = argparse.ArgumentParser(description="Display Controller!")
parser.add_argument("-s", "--simulation", action="store_true", help="is this a simulations? or should it try to connect to the LED matrix?")

simulation = False
args = parser.parse_args()

if (args.simulation):
    simulation = True

disp_thread = threading.Thread(target=startDisplayServer, args=(simulation,), daemon=True)
disp_thread.start()
ws_thread = threading.Thread(target=startListneningToSocket, daemon=True)
ws_thread.start()

window.borderless=False 

app = Ursina(size=(800, 800))

# screen = screeninfo.get_monitors()[0]
# window.size = (screen.width, screen.height)

stars = Stars()
earth = Earth()
sats = Satellites()
planets = Planets()



frame = PNMImage()

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
    # print(image_np.shape)


def update():
    postprocess_frame()


    
    

app.run()

