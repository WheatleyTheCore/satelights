# import globals
# import asyncio
# import matplotlib.pyplot as plt
# import matplotlib.animation as animation
# import numpy as np
# import threading
# from PIL import Image
        
# async def displaySim():
#     while True:
#         if (globals.currentFrame.qsize() > 0):
#             frame = globals.currentFrame.get()
#             img = Image.fromarray(frame)
#             img.save('./frame.png')
#         asyncio.wait(300)
    
# async def writeToLights():
#     lock = threading.Lock()
#     while True:
#         lock.acquire()
#         if (globals.currentFrame.qsize() > 0):
#             frame = globals.currentFrame.get()
#             print(frame)
#         lock.release
#         asyncio.sleep(20)
    

# def startDisplayServer(sim):
#     print('-----------------disp server!-----------')
#     print(sim)
#     if (sim == True):
#         asyncio.run(displaySim())
#     else:
#         asyncio.run(writeToLights())

        
        