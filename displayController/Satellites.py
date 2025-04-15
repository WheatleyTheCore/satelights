import pandas as pd
from ursina import *
import numpy as np
import ephem
import json
import datetime
import math

class Satellties(Entity):
    def __init__(self, **kwargs):
        with open('../response.json') as file:
            self.data = json.load(file)
        iss_data = self.data['member'][0]    
        iss = ephem.readtle(iss_data['name'], iss_data['line1'], iss_data['line2'])
        
        wpi = ephem.Observer()
        wpi.lon, wpi.lat = -42.2741, 71.8080
        
        wpi.date = datetime.datetime.now(datetime.UTC)
        iss.compute(wpi)
                
        iss_entity = Entity(
            model='cube',        # You can replace this with a custom model path if you have one
            color=color.pink,
            scale=.5, # Adjust scale to make it long and narrow like an arrow
            collider='box',
            position=Vec3(2 * math.sin(float(iss.ra)), 2 * math.sin(float(iss.dec)), 2 * math.cos(float(iss.ra)))
        )
        
        
        # super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
        
        
