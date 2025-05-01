import pandas as pd
from ursina import *
import numpy as np
import ephem
import json
import datetime
from skyfield.api import load
import math
import json
from .Planet import *

class Planets(Entity):
    def __init__(self, **kwargs):
        
        eph = load('de421.bsp')
        ts = load.timescale()

        for planet in ['mercury barycenter', 'venus barycenter', 'mars barycenter', 'saturn barycenter', 'uranus barycenter', 'neptune barycenter', 'pluto barycenter']:
            Planet(eph[planet], eph['Earth'], ts)        
        
        # super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
        
        
