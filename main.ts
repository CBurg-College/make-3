//#####################################
// SNAKE
//#####################################

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
