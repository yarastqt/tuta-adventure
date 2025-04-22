import { Game, Scale, WEBGL } from 'phaser'

import { BootScene } from '@app/scenes/boot'
import { HouseScene } from '@app/scenes/house'
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

    pixelArt: true,
    backgroundColor: '#000',

    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: true,
      },
    },

    scene: [BootScene, PreloaderScene, HouseScene],
  })
}

window.addEventListener('load', () => {
  createGame()
})
