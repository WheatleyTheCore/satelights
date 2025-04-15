from selenium import webdriver
from PIL import Image
from io import BytesIO

fox = webdriver.Firefox()
fox.get('http://stackoverflow.com/')

# now that we have the preliminary stuff out of the way time to get that image :D
png = fox.get_screenshot_as_png() # saves screenshot of entire page
fox.quit()

type(png)

im = Image.open(BytesIO(png)) # uses PIL library to open image in memory

im.save('screenshot.png') # saves new cropped image
