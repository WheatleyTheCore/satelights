import pandas as pd
from ursina import *
import numpy as np
import ephem
import json
import globals
import utils

class Star(Entity):
    def __init__(self, planet, earth, ts, **kwargs):
        self.planet = planet
        self.earth = earth
        self.ts = ts
        t = ts.now()
        ra, dec, dist = earth.at(t).observe(planet).apparent().radec()
        distance = dist.au * globals.au_to_program_space
                
        super().__init__(
            model='box',
            color=color.violet,
            scale=2, 
            collider='box',
            position=utils.radecToXYZ(ra, dec, distance)
        )
        
    def update(self):
        t = self.ts.now()
        ra, dec, dist = self.earth.at(t).observe(self.planet).apparent().radec()
        distance = dist.au * globals.au_to_program_space
        self.position = utils.radecToXYZ(ra, dec, distance)
        # self.position=Vec3(2 * math.sin(float(self.iss.ra)) * math.sin(float(self.iss.dec)), 2 * math.cos(float(self.iss.ra)), 2 * math.sin(float(self.iss.ra)) * math.cos(float(self.iss.dec)))

        # super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
        
        
