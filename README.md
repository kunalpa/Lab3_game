# Lab3

A super simple game where a user controls Squidward via the arrow keys and tries to evade Spongebob and Patrick. Every time Spongebob and Patrick collide with Squidward, he loses a life displayed in the top right corner of the screen. Spongebobs and Patricks will randomly spawn on the screen at a fixed interval ready to give Squidward more trouble.

### Project Structure
* This project utilizes an MVC structure.
* The code follows a hierarchical design in that specific objects descend from the larger MVC.
* One part of this project that I was particularly proud of was the logic I implemented to remove the background of a given image using Python. This script takes the four corners of an image and runs an iterative dfs on them removing all connected pixels that appear white. These new images were used in the simulation.
* I also established fixed-time step variable rendering, and allowed me to simulate the game on weaker machines.

### Sources:
* Background: https://www.pinterest.com/pin/152770612353513561/
* Heart: https://www.pinterest.com/pin/714665034605141599/
* Patrick: https://www.pinterest.com/pin/3237030968199150/
* Spongebob: https://www.pinterest.com/pin/140806232262981/
* Squidward: https://www.pinterest.com/pin/404198135323333043/


### Demo
![](./resources/simulation/game_vid.gif)