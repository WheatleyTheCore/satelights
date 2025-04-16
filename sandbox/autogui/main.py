import cv2
import numpy as np
import pyautogui
import time

try:
    while True:
        start = time.time()
        
        # Capture a screenshot using pyautogui
        screenshot = pyautogui.screenshot()

        # Convert the screenshot to a NumPy array
        frame = np.array(screenshot)

        # Convert the BGR frame to RGB (OpenCV uses BGR by default)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Perform image processing operations on the frame (example: grayscale conversion)
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)

        # Display the processed frame (optional)
        cv2.imshow('Processed Frame', gray_frame)
        
        print(f'fps: {1 / (time.time() - start)}')

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

except KeyboardInterrupt:
    print("Program terminated by user.")

finally:
    cv2.destroyAllWindows()
