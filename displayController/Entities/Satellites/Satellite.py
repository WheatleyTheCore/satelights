import pandas as pd
from ursina import *
import numpy as np
import ephem
import json
import datetime
import globals
import math
import utils

class Satellite(Entity):
    def __init__(self, tleData, **kwargs):
        self.iss = ephem.readtle(tleData['name'], tleData['line1'], tleData['line2'])
        
        self.wpi = ephem.Observer()
        self.wpi.lon, self.wpi.lat = 0, 0
        
        self.wpi.date = datetime.datetime.now(datetime.UTC)
        self.iss.compute(self.wpi)
        
        print(tleData['name'])
        
        
                
        super().__init__(
            model='cube',        # You can replace this with a custom model path if you have one
            color=color.pink,
            scale=.05, # Adjust scale to make it long and narrow like an arrow
            collider='box',
            position=utils.radecToXYZ(float(self.iss.a_ra - math.pi), float(self.iss.a_dec - math.pi), self.iss.range * globals.km_to_program_space )
        )
        
    def update(self):
        self.wpi.date = datetime.datetime.now(datetime.UTC)
        self.iss.compute(self.wpi)
        self.position = utils.radecToXYZ(float(self.iss.a_ra - math.pi), float(self.iss.a_dec - math.pi), self.iss.range * globals.km_to_program_space )
        # self.position=Vec3(2 * math.sin(float(self.iss.ra)) * math.sin(float(self.iss.dec)), 2 * math.cos(float(self.iss.ra)), 2 * math.sin(float(self.iss.ra)) * math.cos(float(self.iss.dec)))

    # def radecToXYZ(self, ra, dec, range):
    #     distance = 2 * range * globals.km_to_program_space
    #     x = -distance * cos(float(ra - math.pi)) * cos(float(dec - math.pi))
    #     y = distance * sin(float(ra - math.pi))
    #     z = distance * cos(float(ra - math.pi)) * sin(float(dec - math.pi))
    #     return Vec3(x, y, z)
        
    #     # super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
        
        
