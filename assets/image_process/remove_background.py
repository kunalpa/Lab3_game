from PIL import Image
import numpy as np


'''
Takes an image and runs a dfs on the four corners to remove white-ish backgrounds.
'''
def remove_outline(pixel_matrix, x, y):
    point_stack = [[0, 0], [y-1, x-1], [0, x-1], [y-1, 0]]
    while point_stack:
        row, col = point_stack.pop()
        if row < 0 or row >= y or col < 0 or col >= x:
            continue
        pixels = pixel_matrix[row,col]
        if pixels[0] > 200 and pixels[1] > 200 and pixels[2] > 200 and pixels[3] != 0:
            # we have found a whitespace
            point_stack.append([row+1, col])
            point_stack.append([row-1, col])
            point_stack.append([row, col+1])
            point_stack.append([row, col-1])
            pixel_matrix[row, col] = (255, 255, 255, 0)
    
    return pixel_matrix

def convertImage(file_name):
    img = Image.open(f"./{file_name}.jpg")
    img = img.convert("RGBA")
    x, y = img.size
    image_np = np.array(img)

    n, m, _ = image_np.shape
    pixel_matrix = np.empty((n, m), dtype=object)
    for i in range(n):
        for j in range(m):
            r, g, b, a = image_np[i, j]
            pixel_matrix[i, j] = (r, g, b, a)

    # run dfs to remove connected whitepixels outside of character
    remove_outline(pixel_matrix, x, y)

    # convert back to np array that can be converted to a new image
    squashed_image = np.zeros((n, m, 4), dtype=np.uint8)
    for i in range(n):
        for j in range(m):
            squashed_image[i, j] = pixel_matrix[i, j]
    new_image = Image.fromarray(squashed_image, 'RGBA')
    new_image.save(f'../image_process/{file_name}.png')
    print("Successful")
 
convertImage('patrick')
convertImage('sponge')
convertImage('squid')
convertImage('heart')