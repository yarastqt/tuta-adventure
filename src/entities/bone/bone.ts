import { type GameObjects, Physics, Scene } from 'phaser'

import type { InteractionObject } from '@app/shared/system/interaction'

export class Bone extends Physics.Arcade.Sprite implements InteractionObject {
  declare body: Physics.Arcade.Body

  area: GameObjects.Zone

  constructor(scene: Scene, x: number = 0, y: number = 0) {
    super(scene, x, y, 'bone')

    scene.add.existing(this)
    scene.physics.add.existing(this, true)

    this.area = scene.add.zone(this.x, this.y, this.body.width * 1.5, this.body.height * 1.5)

    scene.physics.world.enable(this.area)
  }

  interact() {
    console.log('>>> interact with bone')
  }
}
