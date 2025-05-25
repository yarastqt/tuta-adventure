import { type GameObjects, Physics, Scene } from 'phaser'

import type { InteractionObject } from '@app/shared/system/interaction'

export class Bone extends Physics.Arcade.Sprite implements InteractionObject {
  declare body: Physics.Arcade.Body

  area: GameObjects.Zone
  anchor: GameObjects.GameObject | null

  constructor(scene: Scene, x: number = 0, y: number = 0) {
    super(scene, x, y, 'bone')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.area = scene.add.zone(this.x, this.y, this.body.width * 1.5, this.body.height * 1.5)

    scene.physics.world.enable(this.area)
  }

  pickup(anchor: GameObjects.GameObject) {
    this.anchor = anchor
  }

  drop() {
    this.anchor = null
  }

  preUpdate() {
    if (!this.anchor) {
      return
    }

    this.x = this.anchor.body?.position.x ?? 0
    this.y = this.anchor.body?.position.y ?? 0
    this.area.x = this.x
    this.area.y = this.y
  }
}
