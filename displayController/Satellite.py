import pandas as pd
from ursina import *
import numpy as np
import ephem
import json
import datetime
import math

class Satellite(Entity):
    def __init__(self, **kwargs):
        with open('../response.json') as file:
            self.data = json.load(file)
        iss_data = self.data['member'][0]    
        self.iss = ephem.readtle(iss_data['name'], iss_data['line1'], iss_data['line2'])
        
        self.wpi = ephem.Observer()
        self.wpi.lon, self.wpi.lat = -42.2741, 71.8080
        
        self.wpi.date = datetime.datetime.now(datetime.UTC)
        self.iss.compute(self.wpi)
                
        super().__init__(
            model='cube',        # You can replace this with a custom model path if you have one
            color=color.pink,
            scale=.05, # Adjust scale to make it long and narrow like an arrow
            collider='box',
            position=Vec3(2 * math.sin(float(self.iss.ra)), 2 * math.sin(float(self.iss.dec)), 2 * math.cos(float(self.iss.ra)))
        )
        
    def update(self):
        self.wpi.date = datetime.datetime.now(datetime.UTC)
        self.iss.compute(self.wpi)
        self.position=Vec3(2 * math.cos(float(self.iss.ra)) * math.cos(float(self.iss.dec)), 2 * math.sin(float(self.iss.dec)), 2 * math.sin(float(self.iss.ra)) * math.cos(float(self.iss.dec)))

        
        # super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
        
        
