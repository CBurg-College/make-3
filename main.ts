/*
File:      github.com/ETmbit/make-3.ts
Copyright: ETmbit, 2026

License:
This file is part of the ETmbit extensions for MakeCode for micro:bit.
It is free software and you may distribute it under the terms of the
GNU General Public License (version 3 or later) as published by the
Free Software Foundation. The full license text you find at
https://www.gnu.org/licenses.

Disclaimer:
ETmbit extensions are distributed without any warranty.

Dependencies:
ETmbit/general, ETmbit/gamebuilder, ETmbit/buttonpad
*/

let time = 0
let spots = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
let dir = SpriteDir.Down
let snake = Game.createSprite("snake", 1, 1, plotSnake, plotSnake)

function plotSnake(x: number, y: number) {
    led.plot(x, y)
}

gameStartHandler = () => {
    time = 0
    dir = SpriteDir.Down
    for (let x = 0; x < 5; x++)
        for (let y = 0; y < 5; y++)
            spots[x][y] = 0
    Game.moveTo("snake", 0, 0)
    Game.setDirection("snake", SpriteDir.Down)
    basic.clearScreen()
}

gamePlayHandler = () => {
    if (time > control.millis()) return
    Game.moveSteps("snake", 1)
    let x = snake.x()
    let y = snake.y()
    if (spots[x][y] == 1)
        Game.stopGame()
    else {
        ETscore += 1
        spots[x][y] = 1
        time = control.millis() + 300
    }
}

ButtonPad.onButton(Pad.Up, function () {
    if (!Game.isPlaying()) return
    Game.setDirection("snake", SpriteDir.Up)
})

ButtonPad.onButton(Pad.Down, function () {
    if (!Game.isPlaying()) return
    Game.setDirection("snake", SpriteDir.Down)
})

ButtonPad.onButton(Pad.Left, function () {
    if (!Game.isPlaying()) return
    Game.setDirection("snake", SpriteDir.Left)
})

ButtonPad.onButton(Pad.Right, function () {
    if (!Game.isPlaying()) return
    Game.setDirection("snake", SpriteDir.Right)
})

ButtonPad.onButton(Pad.TopLeft, function () {
    ETscore = 0
    Game.stopGame()
})

ButtonPad.onButton(Pad.TopRight, function () {
    ETscore = 0
    Game.stopGame()
})


//% color="#00CC00" icon="\uf1f9"
//% block="Snake"
namespace Snake {
    //% block="start the game"
    //% block.loc.nl="start het spel"
    export function start() {
        Game.startGame()
    }
}
