let tm: number
let xpos: number
let ypos: number
let xdir: number
let ydir: number
let xon: boolean
let yon: boolean
let delay: number
let score: number
let play: boolean = false

let logoHandler: () => void

basic.showIcon(IconNames.Heart)

function gameOver() {
    if (!play) return
    play = false
    basic.pause(500)
    basic.showIcon(IconNames.No)
    basic.pause(250)
    basic.clearScreen()
    if (score)
        basic.showNumber(score + 1)
    else
        basic.showIcon(IconNames.Sad)
    basic.pause(1000)
    basic.showIcon(IconNames.Heart)
}

basic.forever(function () {
    if (!play) return
    if (tm > control.millis()) return
    if (xon) xpos += xdir
    if (yon) ypos += ydir
    if (xpos < 0 || xpos > 4 || ypos < 0 || ypos > 4)
        gameOver()
    if (led.point(xpos, ypos)) {
        gameOver()
        return
    }
    led.plot(xpos, ypos)
    score += 1
    if (score == 24) {
        play = false
        basic.clearScreen()
        basic.pause(500)
        basic.showIcon(IconNames.Happy)
    }
    tm = control.millis() + delay
    delay -= 10
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (logoHandler) logoHandler()
})

input.onButtonPressed(Button.A, function () {
    xdir = -xdir
    xon = true
    yon = false
})

input.onButtonPressed(Button.B, function () {
    ydir = -ydir
    yon = true
    xon = false
})


//% color="#00CC00" icon="\uf1f9"
//% block="Game"
//% block.loc.nl="Spel"
namespace Game {

    //% block="start the game"
    //% block.loc.nl="start het spel"
    export function startGame() {
        basic.clearScreen()
        basic.pause(1000)
        xpos = 0
        ypos = 0
        if (Math.randomBoolean()) {
            xon = true
            yon = false
            xdir = 1
            ydir = -1
        }
        else {
            xon = false
            yon = true
            xdir = -1
            ydir = 1
        }
        delay = 500
        score = 0
        led.plot(xpos, ypos)
        tm = control.millis() + 500
        play = true
    }

    //% color="#FFC000"
    //% block="when logo is pressed"
    //% block.loc.nl="wanneer op het logo wordt gedrukt"
    export function onStart(code: () => void): void {
        logoHandler = code
    }
}
