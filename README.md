# Tetris reloaded - an 8bit classic remade in html 5

## Overview

Tetris reloaded is the classic tetris game updated to take advantage of html 5 and react.

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

**Day 2**

get a piece to display on canvas and be able to move it around

**Day 3**

finish piece logic and wrap up game logic

**Day 4**

finish game logic, spend time on css making things fun

## Bonus

enable mousepad controls

alternate game modes

compete against AI
