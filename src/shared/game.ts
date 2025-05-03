import { attach, createEffect, createEvent, createStore, sample } from 'effector'
import { Game, Scale, WEBGL } from 'phaser'
import invariant from 'ts-invariant'

import { HouseScene } from '@app/scenes/house'
import { InterfaceScene } from '@app/scenes/interface'
import { JoystickScene } from '@app/scenes/joystick'
import { PreloaderScene } from '@app/scenes/preloader'
import { Scenes } from '@app/shared/scenes'

const createGame = createEvent()
const startGame = createEvent()

const $game = createStore<Game | null>(null)
const $isRunning = createStore(false)

const createGameFx = createEffect(() => {
  const game = new Game({
    type: WEBGL,

    scale: {
      mode: Scale.NONE,
      autoCenter: Scale.CENTER_BOTH,
      height: window.innerHeight,
      width: window.innerWidth,
      parent: 'game-root',
    },

    canvasStyle: 'display:flex',

    backgroundColor: '#ccc',

    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: true,
      },
    },

    input: {
      activePointers: 2,
    },

    scene: [PreloaderScene, HouseScene, JoystickScene, InterfaceScene],
  })

  return game
})

const startGameFx = attach({
  source: $game,
  effect: (game) => {
    invariant(game)

    game.scene.start(Scenes.House)

    return game.isRunning
  },
})

sample({
  clock: createGame,
  target: createGameFx,
})

sample({
  clock: createGameFx.doneData,
  target: $game,
})

sample({
  clock: startGame,
  filter: $isRunning.map((isRunning) => !isRunning),
  target: startGameFx,
})

sample({
  clock: startGameFx.doneData,
  target: $isRunning,
})

export const GameModel = {
  $game,
  createGame,
  startGame,
  $isRunning,
}
