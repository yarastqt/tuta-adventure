import { Game, Scale, WEBGL } from 'phaser'

import { BootScene } from '@app/scenes/boot'
import { HouseScene } from '@app/scenes/house'
import { InterfaceScene } from '@app/scenes/interface'
import { PreloaderScene } from '@app/scenes/preloader'

function createGame() {
  new Game({
    type: WEBGL,

    scale: {
      mode: Scale.FIT,
      parent: 'root',
      autoCenter: Scale.CENTER_BOTH,
      width: window.innerWidth,
      height: window.innerHeight,
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

    scene: [BootScene, PreloaderScene, HouseScene, InterfaceScene],
  })
}

window.addEventListener('load', () => {
  createGame()
})
