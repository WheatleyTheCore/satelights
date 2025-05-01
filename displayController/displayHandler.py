import globals
import asyncio
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import numpy as np
        
async def displaySim():
    fig = plt.figure()
    ax = fig.add_subplot()  # Add a subplot

    def update(frame):
        # for each frame, update the data stored on each artist.
        ax.matshow(np.random.rand(15, 15))
        plt.pause(0.01)

    ani = animation.FuncAnimation(fig=fig, func=update, frames=10, interval=30)
    plt.show()

def startDisplayServer(sim):
    print('-----------------disp server!-----------')
    print(sim)
    if (sim == True):
        asyncio.run(displaySim())
    

        
        