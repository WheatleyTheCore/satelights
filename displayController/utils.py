from ursina import *
from math import cos, sin, pi
def radecToXYZ(ra, dec, distance):
        x = -distance * cos((ra)) * cos((dec))
        z = -distance * sin((ra))
        y = distance * cos((ra)) * sin((dec))
        return Vec3(x, y, z)