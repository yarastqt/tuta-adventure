import { Scene } from 'phaser'

import { Scenes } from '@app/shared/scenes'

export class HouseScene extends Scene {
  constructor() {
    super(Scenes.House)
  }

  create() {
    this.scene.launch(Scenes.Interface)

    console.log('>>> init house scene')
  }
}
