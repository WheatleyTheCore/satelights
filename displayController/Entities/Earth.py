import pandas as pd
from ursina import *
import numpy as np
import globals

class Earth(Entity):
    def __init__(self, **kwargs):
        super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
            
        
        
        north = Entity(
            model='cube',        # You can replace this with a custom model path if you have one
            color=color.azure,
            scale=(0.05, 2, 0.05), # Adjust scale to make it long and narrow like an arrow
            collider='box'
        )
        
        x = Entity(
            model='cube',        # You can replace this with a custom model path if you have one
            color=color.red,
            scale=(2, 0.05, 0.05), # Adjust scale to make it long and narrow like an arrow
            collider='box'
        )
        
    def update(self):
        if (globals.communicationQueue.qsize() > 0):
            print(globals.communicationQueue.get())

