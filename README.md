# Tetrix reloaded - an 8bit classic remade in html 5

## Overview

Tetrix reloaded is the classic tetris game updated to take advantage of html 5 and react.

Users are given tetris pieces of various shapes and must find a way to stack them in a row.
When a row is formed that row is deleted and the user may continue playing.
If the pieces stack up to the top of the screen without forming a full row, the game is over.
As the user builds rows and gains points the game speeds up incrementally.
The game may operate at varying speeds if certain conditions are met.

## MVPs

* display - create and display tetris pieces, current piece as well as the upcoming piece.
* gameplay - be able to rotate pieces, move them left and right, and send them to the bottom immediately by pressing a key.
* mechanics - if the tetris pieces form a horizontal line with no holes, the line is deleted. If pieces stack on top of each other to reach the top of the screen, the game is over

## Technologies

* HTML5 Canvas for rendering
* Javascript for game logic
* webpack to bundle everything

There will be two scripts for this project
* `game.js` will handle the display and mechanics of the game.
* `piece.js` will deal with generating each piece and the logic they follow.

## Wireframe

![](https://raw.githubusercontent.com/10KD/FSP/master/tetris_reloaded.jpg)

## Timeline

**Day 1**

get webpack set up, write an entry file. figure out which libraries to use. create package.json
determine whether to rotate pieces dynamically or hard code each position.
create canvas and display pieces on it.


**Day 2**

Write a update function that conitinually updates the canvas. Use `requestAnimationFrame()`.
Determine the speed at which the pieces will drop and ramp up that speed by measuring the time between frames and
increasing the y axis of the piece when time exceeds the desired interval between each drop.
Enable keyboard controls using `EventListener` with keyboard keycodes.

**Day 3**

Create a function to detect collisions by first making a matrix of arrays that represents the canvas, updating it with the
canvas values, then comparing it against the piece position and returning a boolean indicating whether or not the desired move is valid.
Create another function to handle rotating the pieces. I plan on doing this by transposing the values of the piece array.
Account for edge cases with the rotation, like rotating into the side wall of the game.
Modify the draw function to draw the pieces from previous turns by referencing the game matrix.

**Day 4**

Create a function to produce a random piece each turn and display it while the previous piece is still in play.
Create a function to calculate the score. Points should multiply depending on how many rows disappear in one turn.
Create a function that deletes the correct row(s) when a full row is populated with tetris pieces.
Handle gameover logic. Reset the game if any part of the top row of the matrix has a piece (value) stored in it.
Add css. Color pieces, create slick lines for canvas box, score board and preview box.

## Bonus

enable mousepad controls

enable matrix mode - refactor in three.js to draw in 3d then rotate the camera for different view of the game if certain conditions are met

compete against AI
