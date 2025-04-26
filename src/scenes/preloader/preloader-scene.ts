import { Scene } from 'phaser'

import { Scenes } from '@app/shared/scenes'

export class PreloaderScene extends Scene {
  constructor() {
    super(Scenes.Preloader)
  }

  preload() {
    this.load.setBaseURL('assets')

    this.load.image('thumb', '/interface/thumb.png')
    this.load.image('stick', '/interface/stick.png')
    this.load.image('run-button', '/interface/run-button.png')
  }

  create() {
    this.scene.start(Scenes.House)
  }
}
