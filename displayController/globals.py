import queue

communicationQueue = queue.Queue()  
currentFrame = queue.Queue()

km_to_program_space = 1/12756000 # 1 unit is roughly 12756000 m
au_to_program_space = 1.496e8 * km_to_program_space  #div by 4 to make things closer
parsec_to_program_space = 206265 * au_to_program_space