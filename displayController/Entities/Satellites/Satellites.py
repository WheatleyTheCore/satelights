import pandas as pd
from ursina import *
import numpy as np
import ephem
import json
import datetime
import math
from .Satellite import *

class Satellites(Entity):
    def __init__(self, **kwargs):
        with open('../response.json') as file:
            self.data = json.load(file)
        sattelite_data = self.data['member'] 
        for tle in sattelite_data:
            if '2025' in tle["date"]:
                Satellite(tleData=tle) 
        
        
        # super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
        
        
