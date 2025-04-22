import { Scene } from 'phaser'

import { Scenes } from '@app/shared/scenes'

import { InterfaceButton } from './interface-button'

export class InterfaceScene extends Scene {
  constructor() {
    super(Scenes.Interface)
  }

  create() {
    const container = this.add.container(this.cameras.main.width, this.cameras.main.height)

    const run = new InterfaceButton({
      name: 'run',
      scene: this,
      texture: 'run-button',
      x: -64,
      y: -64,
      width: 64,
      height: 64,
    })

    container.add([run])
    container.setScrollFactor(0, 0)
  }
}
