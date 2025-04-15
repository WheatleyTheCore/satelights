import pandas as pd
from ursina import *
import numpy as np
import Stars
import Earth
import Satellite


app = Ursina()


stars = Stars.Stars()
earth = Earth.Earth()
sats = Satellite.Satellite()


EditorCamera()  # add camera controls for orbiting and moving the camera

app.run()

