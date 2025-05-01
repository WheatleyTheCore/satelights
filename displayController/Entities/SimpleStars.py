import pandas as pd
from ursina import *
import numpy as np
import globals
import math

# super simple stars. probably.... should do this differently

class Stars(Entity):
    def __init__(self, **kwargs):
        stars_df = pd.read_csv('../hygdata_filtered.csv')
        verticies = np.array([Vec3(i['x'] * globals.au_to_program_space, i['z'] * globals.au_to_program_space, i['y'] * globals.au_to_program_space) for _, i in stars_df.iterrows()]) 
        super().__init__(model=Mesh(vertices=verticies, mode='point', static=False, render_points_in_3d=True, thickness=.2), **kwargs)
        
        
