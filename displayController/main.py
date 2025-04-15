import pandas as pd
from ursina import *
import numpy as np
from Entities.Stars import *
from Entities.Earth import *
from Entities.Satellites.Satellites import *


app = Ursina()


stars = Stars()
earth = Earth()
sats = Satellites()


EditorCamera()  # add camera controls for orbiting and moving the camera

app.run()

