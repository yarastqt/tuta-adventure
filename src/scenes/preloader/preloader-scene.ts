import { Scene } from 'phaser'

import { Scenes } from '@app/shared/scenes'

export class PreloaderScene extends Scene {
  constructor() {
    super(Scenes.Preloader)
  }

  create() {
    this.scene.start(Scenes.House)
  }
}
