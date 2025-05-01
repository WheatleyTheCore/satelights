import pandas as pd
from ursina import *
import numpy as np
import ephem
import json
import datetime
from skyfield.api import load, Star
from skyfield.data import hipparcos
import utils
import json
import globals
# from Star import Star as StarEntity

class Stars(Entity):
    def __init__(self, **kwargs):
        eph = load('de421.bsp')
        earth = eph['earth']
        with load.open(hipparcos.URL) as f:
            df = hipparcos.load_dataframe(f)
        df = df[df['ra_degrees'].notnull()]
        df = df[df['magnitude'] <= 5]

        # Convert right ascension and declination to radians
        # df['ra_radians'] = df['ra'].astype(float) * 3.141592653589793 / 180.0
        # df['dec_radians'] = df['dec'].astype(float) * 3.141592653589793 / 180.0
        ts = load.timescale()
        t = ts.now()
        stars = Star.from_dataframe(df)
        astrometric = earth.at(t).observe(stars)
        ra, dec, distance = astrometric.radec()
        
                
        starData = np.column_stack((ra.radians, dec.radians, distance.au * globals.au_to_program_space))
        print(distance.au)
        verticies = np.array([]) 
        for star in starData:
            np.append(verticies, utils.radecToXYZ(star[0], star[1], star[2]))
            
        print(verticies)
        super().__init__(model=Mesh(vertices=verticies, mode='point', static=False, render_points_in_3d=True, thickness=1), **kwargs)
   
        
        # super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
        
        