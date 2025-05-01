import pandas as pd
from ursina import *
import numpy as np
import globals
import json
from math import sin, cos, radians, degrees, acos, asin

class Earth(Entity):
    radToDeg = 180 / math.pi
    
    def __init__(self, **kwargs):
        super().__init__(model='sphere', texture='./earthmap1k.jpg', scale=1, collider='box')
                    
        # north = Entity(
        #     model='cube',        # You can replace this with a custom model path if you have one
        #     color=color.azure,
        #     scale=(0.05, 2, 0.05), # Adjust scale to make it long and narrow like an arrow
        #     collider='box'
        # )
        
        # lonlatzero = Entity(
        #     model='cube',        # You can replace this with a custom model path if you have one
        #     color=color.red,
        #     scale=(2, 0.05, 0.05), # Adjust scale to make it long and narrow like an arrow
        #     collider='box'
        # )
        
        earthRadius = 0.5
        
        wpi_lat_lon = (42.270758917, -71.8044067824)
        lat_rad = radians(wpi_lat_lon[0])
        lon_rad = radians(wpi_lat_lon[1])
        
        x = earthRadius * cos(lat_rad) * cos(lon_rad)
        y = earthRadius * sin(lat_rad)
        z = earthRadius * cos(lat_rad) * sin(lon_rad)
        
        self.upDirection = Vec3(9 * x, 9 * y, 9 * z)
        
        self.viewer = Entity(model='cube', color=color.orange, scale=(0.03, 0.03, 0.5), position=(x, y, z))
        
        self.viewer.look_at(self.upDirection)
        
        # EditorCamera()  # add camera controls for orbiting and moving the camera
        camera.position = (x, y, z)
        camera.look_at(self.upDirection)
        
        Entity(
            model='cube',
            color=color.white,
            scale=1,
            position=self.upDirection + Vec3(0, 1, 0)
        )
        
        Entity(
            model='cube',
            color=color.pink,
            scale=1,
            position=self.upDirection + Vec3(0, 0, 0)
        )
        
        Entity(
            model='cube',
            color=color.violet,
            scale=1,
            position=self.upDirection + Vec3(0, -1, 0)
        )
        
        
    def update(self):
        if (globals.communicationQueue.qsize() > 0):
            sensorData = json.loads(globals.communicationQueue.get())
            accelData = sensorData['acc']
            print(accelData)
            self.viewer.look_at(Vec3( 2 * self.upDirection +  2 *Vec3(float(accelData[0]), float(accelData[2]), float(accelData[1]))))
            
    def getMagnetometerAngle(self, magData):
        x, y, z = magData
        angle = math.atan2(y, x)
        if (angle >= 0):
            angle = angle * (180 / math.pi)
        else: 
            angle = (angle + 2 * math.pi) * (180/math.pi)
            
        angle = math.floor(angle)
        return angle - 90 if angle - 90 >= 0 else angle + 271
        
        


