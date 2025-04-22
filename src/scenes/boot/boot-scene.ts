import { Scene } from 'phaser'

import { Scenes } from '@app/shared/scenes'

export class BootScene extends Scene {
  constructor() {
    super(Scenes.Boot)
  }

  create() {
    this.scene.start(Scenes.Preloader)
  }
}
