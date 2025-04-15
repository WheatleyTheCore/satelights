import pandas as pd
from ursina import *
import numpy as np



class Stars(Entity):
    def __init__(self, **kwargs):
        stars_df = pd.read_csv('../hygdata_filtered.csv')
        verticies = np.array([Vec3(i['x'], i['y'], i['z']) for _, i in stars_df.iterrows()]) 
        super().__init__(model=Mesh(vertices=verticies, mode='point', static=False, render_points_in_3d=True, thickness=.1), **kwargs)
        
        
