import pyautogui
import pygetwindow
from PIL import Image

def screenshot_window(window_title):
    try:
        window = pygetwindow.getWindowsWithTitle(window_title)[0]
        # Activate the window to ensure it's in the foreground
        window.activate()
        # Wait for the window to activate (adjust if needed)
        pyautogui.sleep(0.1)  
        
        left, top = window.left, window.top
        width, height = window.width, window.height
        
        screenshot = pyautogui.screenshot()
        cropped_screenshot = screenshot.crop((left, top, left + width, top + height))
        cropped_screenshot.save(filename)
        print(f"Screenshot saved as {filename}")
    except IndexError:
        print(f"Window with title '{window_title}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
screenshot_window("Calculator", "calculator.png")